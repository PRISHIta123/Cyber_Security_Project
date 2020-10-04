const SHA256 = require('crypto-js/sha256');
const EC= require('elliptic').ec;
const ec= new EC('secp256k1');

class Transaction
{
    constructor(fromAddress, toAddress, amount)
    {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

    calculateHash()
    {
        return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
    }

    signTransaction(signingKey)
    {
        if(signingKey.getPublic('hex') !== this.fromAddress )
        {
            throw new Error('You cannot sign transaction for other wallets.');
        }

        const hashTx= this.calculateHash();
        const sig= signingKey.sign(hashTx,'base64');
        this.signature= sig.toDER('hex');
    }

    isValid()
    {
        if(this.fromAddress === null) 
            {
                console.log("1");
                return true;
            }

        if(this.signature.length === 0)
        {
            throw new Error('No signature in this transaction.');
        }

        const publicKey= ec.keyFromPublic(this.fromAddress, 'hex');
        console.log("The signature is: "+this.signature);
        return publicKey.verify(this.calculateHash(), this.signature);

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
    addTransaction(transaction)
    {

        if(!transaction.fromAddress || !transaction.toAddress)
        {
            console.log(transaction.fromAddress);
            console.log(transaction.toAddress);
            throw new Error('Transaction must include from and to address');
        }

        if(!transaction.isValid())
        {
            throw new Error('Cannot add invalid transaction to blockchain');
        }

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

      if(!currentBlock.hasValidTransactions())
      {
        return false;
      }

      if (currentBlock.hash !== currentBlock.computeHash()) {
        return false;
      }

      if (currentBlock.precedingHash !== precedingBlock.hash) return false;
    }
    return true;
  }
}

module.exports.CryptoBlockchain= CryptoBlockchain;
module.exports.Transaction= Transaction;


