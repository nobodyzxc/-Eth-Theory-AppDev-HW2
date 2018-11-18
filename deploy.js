const fs = require('fs')
const Web3 = require('web3')

let web3 = new Web3('http://localhost:8545')

const abi = JSON.parse(fs.readFileSync('./contract/Bank.abi').toString())
const bytecode = '0x' + fs.readFileSync('./contract/Bank.bin').toString()

let bank = new web3.eth.Contract(abi)

web3.eth.getAccounts().then(function (accounts) {

    // deploy contract
    bank
      .deploy({
      data: bytecode
    })
    .send({
      from: accounts[0],
      gas: 3400000
    })
    .on("receipt", function(receipt) {
      fs.writeFileSync('./address.txt', receipt["contractAddress"]);
      console.log(JSON.stringify(receipt, null, 4));
      console.log("部屬成功");
    })
    .on("error", function(error) {
      console.log("部屬失敗");
    });

});
