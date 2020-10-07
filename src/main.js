const {CryptoBlockchain, Transaction}= require('./CryptoBlockchain');
const EC= require('elliptic').ec;
const ec= new EC('secp256k1');

const myKey= ec.keyFromPrivate('7fe38a7cd191b531376ed5db174624ff3a474b736d824d174677e32aeb703c29');
const myWalletAddress = myKey.getPublic('hex');

function fetchAddress()
{
const key= ec.genKeyPair();
//generate a hexadecimal public key
const publicKey= key.getPublic('hex');
//generate a hexadecimal private key
const privateKey= key.getPrivate('hex');
const recvKey= ec.keyFromPrivate(privateKey);
const recvWalletAddress = recvKey.getPublic('hex');

return recvWalletAddress;
}

console.log("\nYour initial balance is: "+ 10);

global.smashingCoin = new CryptoBlockchain();

const recv_address= fetchAddress();

const tx1 = new Transaction(myWalletAddress,recv_address,10);
tx1.signTransaction(myKey);
global.smashingCoin.addTransaction(tx1);

console.log(global.smashingCoin.pendingTransactions)

new_address= fetchAddress();

const dsa_tx = new Transaction(myWalletAddress,new_address,10);
dsa_tx.signTransaction(myKey);
global.smashingCoin.addTransaction(dsa_tx);

console.log(global.smashingCoin.pendingTransactions)

//console.log("\nStarting the miner...");
//global.smashingCoin.minePendingTransactions(myWalletAddress);
//console.log("Your current balance is: "+smashingCoin.getBalanceOfAddress(myWalletAddress));

