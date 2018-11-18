const fs = require('fs')
const Web3 = require('web3')

let web3 = new Web3('http://localhost:8545')

const abi = JSON.parse(fs.readFileSync('../contract/Bank.abi').toString())
const address = fs.readFileSync('../address.txt').toString()

let bank = new web3.eth.Contract(abi, address)

web3.eth.getAccounts().then(async function (accounts) {

  let owner = await bank.methods
    .getOwner()
    .call({ from: accounts[0] });
  console.log(owner);
})
