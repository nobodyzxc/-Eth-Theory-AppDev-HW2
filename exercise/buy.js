const fs = require('fs')
const Web3 = require('web3')

let web3 = new Web3('http://localhost:8545')

const abi = JSON.parse(fs.readFileSync('../contract/Bank.abi').toString())
const address = fs.readFileSync('../address.txt').toString()

let bank = new web3.eth.Contract(abi, address)

web3.eth.getAccounts().then(function (accounts) {

  // accounts[1] store ether first,
  // then use the deposit buy coin
  // from accounts[0] (constract owner)

  bank.methods
    .deposit()
    .send({
      from: accounts[1],
      gas: 3400000,
      value: web3.utils.toWei('1', "ether")
    })
    .on("receipt", function(receipt) {
      console.log("存款成功");
      // accounts[1] buy 1 * 10**18 coins
      bank.methods
        .buy(1)
        .send({
          from : accounts[1],
          gas: 3400000,
        })
        .on("receipt", function(receipt) {
          console.log(JSON.stringify(receipt, null, 4));
          console.log("買幣(mint)成功");
        })
        .on("error", function(error) {
          console.log(JSON.stringify(error, null, 4));
          console.log("買幣(mint)失敗");
        });
    })
    .on("error", function(error) {
      console.log(JSON.stringify(error, null, 4));
      console.log("存款失敗");
    });
})
