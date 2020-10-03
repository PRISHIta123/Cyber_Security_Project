const SHA256 = require('crypto-js/sha256');
class CryptoBlock{
    constructor(index, timestamp, data, precedingHash=" "){
     this.index = index;
     this.timestamp = timestamp;
     this.data = data;
     this.precedingHash = precedingHash;
     this.hash = this.computeHash();     
     this.nonce = 0;
    }

    //Function to compute the current hash based on the preceding hash, timestamp, data and random nonce
    computeHash() {
    return SHA256(
      this.index +
        this.precedingHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nonce
    ).toString();
  }

  //To increase difficulty level while mining blocks by appending extra zeros to the hash
  proofOfWork(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.computeHash();
    }
  }
}

class CryptoBlockchain{
    constructor(){
        this.blockchain = [this.startGenesisBlock()];   
        this.difficulty = 4;
  
    }

    //Function to create initial block in the crytocurrency blockchain
    startGenesisBlock(){
        return new CryptoBlock(0, "01/05/2020", "Initial Block in the Chain", "0");
    }

    //Function to receive the latest block in the cryptocurrency blockchain
    obtainLatestBlock(){
        return this.blockchain[this.blockchain.length - 1];
    }

    //Function to add an additional block to the blockchain
    addNewBlock(newBlock){
        newBlock.precedingHash = this.obtainLatestBlock().hash;
       //newBlock.hash = newBlock.computeHash();
        newBlock.proofOfWork(this.difficulty);
        this.blockchain.push(newBlock);
    }

    //Function to authenticate every pair of nodes/blocks in the cryptocurrency blockchain
    checkChainValidity() {
    for (let i = 1; i < this.blockchain.length; i++) {
      const currentBlock = this.blockchain[i];
      const precedingBlock = this.blockchain[i - 1];

      if (currentBlock.hash !== currentBlock.computeHash()) {
        return false;
      }
      if (currentBlock.precedingHash !== precedingBlock.hash) return false;
    }
    return true;
  }
}

let smashingCoin = new CryptoBlockchain();

console.log("smashingCoin mining in progress....");
smashingCoin.addNewBlock(
  new CryptoBlock(1, "01/06/2020", {
    sender: "XYZ",
    recipient: "ABC",
    quantity: 50
  })
);

smashingCoin.addNewBlock(
  new CryptoBlock(2, "01/07/2020", {
    sender: "PQR",
    recipient: "LMN",
    quantity: 100
  })
);

console.log("Is the blockchain valid? "+ smashingCoin.checkChainValidity());
console.log(JSON.stringify(smashingCoin, null, 4));

smashingCoin.blockchain[1].data = {amount: 200};
console.log("Is the blockchain valid? "+ smashingCoin.checkChainValidity());
