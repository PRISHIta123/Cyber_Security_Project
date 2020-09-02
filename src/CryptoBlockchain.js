const SHA256 = require('crypto-js/sha256');
class CryptoBlock{
    constructor(index, timestamp, data, precedingHash=" "){
     this.index = index;
     this.timestamp = timestamp;
     this.data = data;
     this.precedingHash = precedingHash;
     this.hash = this.computeHash();     
    }
    computeHash(){
        return SHA256(this.index + this.precedingHash + this.timestamp + JSON.stringify(this.data)).toString();
    }   
}

class CryptoBlockchain{
    constructor(){
        this.blockchain = [this.startGenesisBlock()];     
    }
    startGenesisBlock(){
        return new CryptoBlock(0, "01/05/2020", "Initial Block in the Chain", "0");
    }
    obtainLatestBlock(){
        return this.blockchain[this.blockchain.length - 1];
    }
    addNewBlock(newBlock){
        newBlock.precedingHash = this.obtainLatestBlock().hash;
        newBlock.hash = newBlock.computeHash();        
        this.blockchain.push(newBlock);
    }
}

let smashingCoin = new CryptoBlockchain();
smashingCoin.addNewBlock(new CryptoBlock(1, "01/06/2020", {sender: "XYZ", recipient: "ABC", quantity: 50}));
smashingCoin.addNewBlock(new CryptoBlock(2, "01/07/2020", {sender: "PQR", recipient: "LMN", quantity: 100}) );
console.log(JSON.stringify(smashingCoin, null, 4));