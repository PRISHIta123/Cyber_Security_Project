const {CryptoBlockchain, Transaction}= require('./CryptoBlockchain');
const EC= require('elliptic').ec;
const ec= new EC('secp256k1');

const myKey= ec.keyFromPrivate('7fe38a7cd191b531376ed5db174624ff3a474b736d824d174677e32aeb703c29');
const myWalletAddress = myKey.getPublic('hex');


let smashingCoin = new CryptoBlockchain();

const tx1 = new Transaction(myWalletAddress,'public_key',10);
tx1.signTransaction(myKey);
smashingCoin.addTransaction(tx1);

console.log("Starting the miner...");
smashingCoin.minePendingTransactions(myWalletAddress);
console.log("Your balance is: "+smashingCoin.getBalanceOfAddress(myWalletAddress));

console.log("Starting the miner again...");
smashingCoin.minePendingTransactions(myWalletAddress);
console.log("Your balance is: "+smashingCoin.getBalanceOfAddress(myWalletAddress));