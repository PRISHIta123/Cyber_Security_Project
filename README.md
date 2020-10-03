# Cyber_Security_Project
Name: Prishita Ray  
Registration No: 17BCE2405

This repository contains code for my project on the topic- Preventing double-spending attacks in cryptocurrency blockchains using network observers and peer-alert systems. 

## Objective  
In this project, to overcome the issues in the existing system, network observers are used that can track anomalous transactions performed without authorization. 
Additionally, to notify the sender and receiver about the unauthorized transaction, a peer alert system is designed such that the message is passed from the fraudulent node to the sender and receiver nodes. 

## Proposed System  

**Network observers**: 
* The network observers are placed between each pair of nodes. 
* A sender node, that contains the transaction amount, transaction ID and sender details will transfer this information to the neighbouring node. 
* The neighbouring node will then transfer this to the corresponding forward node, after performing the transaction step. This continues till the receiver node, receives the amount. 
* The observers within each pair of nodes, will keep a record of the user ids, the number of transactions and amounts issued by them. 
* With this record, an observer will check the frequency of node communications in its node pair based on the number of transactions issued by the user. 
* If the frequency is higher than what is required, the anomaly will be logged, and the transaction will be aborted with an acknowledgement sent back to the sender node. 

**Peer Alert Systems**
* When a network observer observes an anomaly at one of the transaction steps between a node-pair, the surrounding nodes are alerted about the fraudulent transaction. 
* This will help the neighbouring nodes terminate their connections with the fraudulent node pair, such that their transactions can be performed along other safe routes. 


## Implementation
To start the initial blockchain, run the following command after entering the directory from the command line or terminal:  

```node CryptoBlockchain.js```

You will see the created nodes as follows:  
![alt text](https://github.com/PRISHIta123/Cyber_Security_Project/blob/master/bc.JPG)

**Additional Security**

To increase security, a random nonce generator is used, that will be used in the hash creation. Moreover, to increase the time taken to mine individual blocks, a difficulty index is used to append additional zeros to the generated hash, which increases the mining time complexity. Also to validate the cryptocurrency blockchain, for every pair consisting of the current block and its preceding block, a two-fold validation methodology is utilized.   

1. The hash of the current block is recomputed with the same nonce, and the original and recomputed hash values are compared.  
2. The preceding hash of the current block and the hash of the preceding block are compared.  

If a mismatch is found in either of these two steps, the validation function returns an error.  

The resulting cryptocurrency blockchain after integrating these additional functionalities is as follows:  
![alt text](https://github.com/PRISHIta123/Cyber_Security_Project/blob/master/bc1.JPG)

Here, the red highlights denote the appended zeros based on the difficulty index and the green highlights are the random nonces generated to compute the hash for every new block is added.

When we observe and log the output of the check chain validity function, before tampering with any one of the blocks, it returns the value true, implying that the blockchain is valid.

```console.log("Is the blockchain valid?"+ smashingCoin.checkChainValidity());```

![alt text](https://github.com/PRISHIta123/Cyber_Security_Project/blob/master/true.JPG)

If instead we try to change the transfer quantity of block 1 from 50 to 200 in the chain, the function returns a value of false, implying an authentication error. 

```smashingCoin.blockchain[1].data = {amount: 200};```

![alt text](https://github.com/PRISHIta123/Cyber_Security_Project/blob/master/false.JPG)

**Performing Transactions**
To perform transactions between the intended sender and recipient blocks or nodes, their addresses are mined, such that the transaction amount can be deducted from the sender node and added to the receiver node. An array contains the records of pending transactions for every block starting with a null amount transaction for the genesis block, and subsequently stores every new transaction. 

An example for demonstration is as follows, the first block sends 100 cryptocurrency units to the second block. The second block in turn returns 50 cryptocurrency units back to the first block. Hence the transaction array will contain the details of the transactions with amounts null, 100 and 50 respectively. After every successfull transaction for a particular genesis block, a mining reward of 100 points is added to its balance.  

```let smashingCoin = new CryptoBlockchain();
smashingCoin.createTransaction( new Transaction("addr1","addr2",100));
smashingCoin.createTransaction( new Transaction("addr2","addr1",50));

console.log("Starting the miner...");
smashingCoin.minePendingTransactions("myAddress");
console.log("Your balance is: "+smashingCoin.getBalanceOfAddress('myAddress'));

console.log("Starting the miner again...");
smashingCoin.minePendingTransactions("myAddress");
console.log("Your balance is: "+smashingCoin.getBalanceOfAddress('myAddress'));
```

![alt text](https://github.com/PRISHIta123/Cyber_Security_Project/blob/master/transaction.JPG)



