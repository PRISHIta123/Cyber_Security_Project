const SHA256 = require('crypto-js/sha256');

class Transaction
{
    constructor(fromAddress, toAddress, amount)
    {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class CryptoBlock{
    constructor(timestamp, transactions, precedingHash=" "){
     this.timestamp = timestamp;
     this.transactions = transactions;
     this.precedingHash = precedingHash;
     this.hash = this.computeHash();     
     this.nonce = 0;
    }

    //Function to compute the current hash based on the preceding hash, timestamp, transactions and random nonce
    computeHash() {
    return SHA256(
        this.precedingHash +
        this.timestamp +
        JSON.stringify(this.transactions) +
        this.nonce
    ).toString();
  }

  //To increase difficulty level while mining blocks by appending extra zeros to the hash
  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.computeHash();
    }
    console.log("Block Mined: "+ this.hash)
  }
}

class CryptoBlockchain{
    constructor(){
        this.blockchain = [this.startGenesisBlock()];   
        this.difficulty = 4;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    //Function to create initial block in the crytocurrency blockchain
    startGenesisBlock(){
        return new CryptoBlock(0, "01/05/2020", "Initial Block in the Chain", "0");
    }

    //Function to receive the latest block in the cryptocurrency blockchain
    obtainLatestBlock(){
        return this.blockchain[this.blockchain.length - 1];
    }

    //Function to add an additional block to the blockchain and create an empty transaction for this block
    minePendingTransactions(miningRewardAddress)
    {
        let block= new CryptoBlock(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);

        console.log('Block successfully mined!');
        this.blockchain.push(block);

        this.pendingTransactions= [
        new Transaction(null, miningRewardAddress, this.miningReward)
        ];

    }

    //Add new transaction to log array
    createTransaction(transaction)
    {
        this.pendingTransactions.push(transaction);
    }

 //Function to perform the transaction between the intended sender and recipient blocks given their addresses
    getBalanceOfAddress(address)
    {
        let balance= 0;

        for(const block of this.blockchain)
        {
            for(const trans of block.transactions)
            {
                if(trans.fromAddress === address)
                {
                    balance-= trans.amount;
                }

                if(trans.toAddress === address)
                {
                    balance+= trans.amount;
                }
            }
        }

        return balance;
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
smashingCoin.createTransaction( new Transaction("addr1","addr2",100));
smashingCoin.createTransaction( new Transaction("addr2","addr1",50));

console.log("Starting the miner...");
smashingCoin.minePendingTransactions("myAddress");
console.log("Your balance is: "+smashingCoin.getBalanceOfAddress('myAddress'));

console.log("Starting the miner again...");
smashingCoin.minePendingTransactions("myAddress");
console.log("Your balance is: "+smashingCoin.getBalanceOfAddress('myAddress'));


