const fs = require('fs')
const Web3 = require('web3')

let web3 = new Web3('http://localhost:8545')

const abi = JSON.parse(fs.readFileSync('../contract/Bank.abi').toString())
const address = fs.readFileSync('../address.txt').toString()

let bank = new web3.eth.Contract(abi, address)

web3.eth.getAccounts().then(function (accounts) {

    // accounts[0] transferOwner to accounts[1]
    bank.methods
      .transferOwner(accounts[1])
      .send({
        from: accounts[0],
        gas: 3400000,
      })
      .on("receipt", function(receipt) {
        console.log(JSON.stringify(receipt));
        console.log("擁有權轉移成功");
      })
      .on("error", function(error) {
        console.log(JSON.stringify(error));
        console.log("擁有權轉移失敗");
      });
})
