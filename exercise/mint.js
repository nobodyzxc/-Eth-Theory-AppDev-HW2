const fs = require('fs')
const Web3 = require('web3')

let web3 = new Web3('http://localhost:8545')

const abi = JSON.parse(fs.readFileSync('../contract/Bank.abi').toString())
const address = fs.readFileSync('../address.txt').toString()

let bank = new web3.eth.Contract(abi, address)

web3.eth.getAccounts().then(function (accounts) {

    // accounts[0] mint 3 * 10**18 coins
    bank.methods
      .mint(3)
      .send({from : accounts[0]})
      .on("receipt", function(receipt) {
        console.log(JSON.stringify(receipt, null, 4));
        console.log("鑄幣成功");
      })
      .on("error", function(error) {
        console.log(JSON.stringify(error, null, 4));
        console.log("鑄幣失敗");
      });
});
