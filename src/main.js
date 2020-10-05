const {CryptoBlockchain, Transaction}= require('./CryptoBlockchain');
const {Attacker}= require('./Attacker');
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

global.smashingCoin = new CryptoBlockchain();

const recv_address= fetchAddress();

const tx1 = new Transaction(myWalletAddress,recv_address,10);
tx1.signTransaction(myKey);
global.smashingCoin.addTransaction(tx1);

console.log("Starting the miner...");
global.smashingCoin.minePendingTransactions(myWalletAddress);
console.log("Your balance is: "+smashingCoin.getBalanceOfAddress(myWalletAddress));

console.log("Starting the miner again...");
global.smashingCoin.minePendingTransactions(myWalletAddress);
console.log("Your balance is: "+smashingCoin.getBalanceOfAddress(myWalletAddress));

//Performing a double spending attack
const attack_address= Attacker.addressGen();

const tx2 = new Transaction(myWalletAddress,attack_address,50);
tx2.signTransaction(myKey);
global.smashingCoin.addTransaction(tx2);

console.log("Starting the miner...");
global.smashingCoin.minePendingTransactions(myWalletAddress);
console.log("Your balance is: "+smashingCoin.getBalanceOfAddress(myWalletAddress));

console.log("Starting the miner again...");
global.smashingCoin.minePendingTransactions(myWalletAddress);
console.log("Your balance is: "+smashingCoin.getBalanceOfAddress(myWalletAddress));