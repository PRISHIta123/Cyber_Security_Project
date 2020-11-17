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

## Blockchain Architecture  
![alt text](https://github.com/PRISHIta123/Cyber_Security_Project/blob/master/screenshots/arch.JPG)

## Model Overview  
![alt text](https://github.com/PRISHIta123/Cyber_Security_Project/blob/master/screenshots/model.JPG)

## Implementation
To start the initial blockchain, run the following command after entering the directory from the command line or terminal:  

```node CryptoBlockchain.js```

You will see the created nodes as follows:  
<p align="left">
  <img width="600" height="500" src="https://github.com/PRISHIta123/Cyber_Security_Project/blob/master/screenshots/bc.JPG">
</p>

**Additional Security**

To increase security, a random nonce generator is used, that will be used in the hash creation. Moreover, to increase the time taken to mine individual blocks, a difficulty index is used to append additional zeros to the generated hash, which increases the mining time complexity. Also to validate the cryptocurrency blockchain, for every pair consisting of the current block and its preceding block, a two-fold validation methodology is utilized.   

1. The hash of the current block is recomputed with the same nonce, and the original and recomputed hash values are compared.  
2. The preceding hash of the current block and the hash of the preceding block are compared.  

If a mismatch is found in either of these two steps, the validation function returns an error.  

The resulting cryptocurrency blockchain after integrating these additional functionalities is as follows:  
<p align="left">
  <img width="600" height="500" src="https://github.com/PRISHIta123/Cyber_Security_Project/blob/master/screenshots/bc1.JPG">
</p>

Here, the red highlights denote the appended zeros based on the difficulty index and the green highlights are the random nonces generated to compute the hash for every new block is added.

When we observe and log the output of the check chain validity function, before tampering with any one of the blocks, it returns the value true, implying that the blockchain is valid.

```console.log("Is the blockchain valid?"+ smashingCoin.checkChainValidity());```

<p align="left">
  <img width="600" src="https://github.com/PRISHIta123/Cyber_Security_Project/blob/master/screenshots/true.JPG">
</p>

If instead we try to change the transfer quantity of block 1 from 50 to 200 in the chain, the function returns a value of false, implying an authentication error. 

```smashingCoin.blockchain[1].data = {amount: 200};```

<p align="left">
  <img width="600" src="https://github.com/PRISHIta123/Cyber_Security_Project/blob/master/screenshots/false.JPG">
</p>

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

<p align="left">
  <img width="600" src="https://github.com/PRISHIta123/Cyber_Security_Project/blob/master/screenshots/transaction.JPG">
</p>

**Signature**  

To ensure that every transaction is unique, it is signed with a signature which is generated using the private and public key and calculated hash for a block, using the elliptic library (based on elliptic curve cryptography). This is also used as a security measure to authenticate every transaction. The following image describes a transaction of 10 cryptocurrency units from the genesis block, and a reception of 100 cryptocurrency units by the genesis block.  

```let smashingCoin = new CryptoBlockchain();

const tx1 = new Transaction(myWalletAddress,'public_key',10);
tx1.signTransaction(myKey);
smashingCoin.addTransaction(tx1);

console.log("Starting the miner...");
smashingCoin.minePendingTransactions(myWalletAddress);
console.log("Your balance is: "+smashingCoin.getBalanceOfAddress(myWalletAddress));

console.log("Starting the miner again...");
smashingCoin.minePendingTransactions(myWalletAddress);
console.log("Your balance is: "+smashingCoin.getBalanceOfAddress(myWalletAddress));
```

![alt text](https://github.com/PRISHIta123/Cyber_Security_Project/blob/master/screenshots/sign.JPG)

**Double Spending Attack**  

When a sender tries to perform the same transaction (with the same amount) twice, but with two different receivers, even though his initial balance is not sufficient to satisfy both the transactions, a double spending attack occurs. This can be illustrated in the below example. Considering a sender to have 10 cryptocurrency units, who plans to give these 10 units to 2 different receivers, concurrently, across separate blocks. For both these transactions to occur, a total of 20 units should be available with the sender, whereas he has just 10, implying that he plans to reuse the same money of the first transaction, in the second transaction, such that the 10 units is deducted at the same time (so only 10 units is deducted from his balance finally).

```global.smashingCoin = new CryptoBlockchain();

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
```  

![alt text](https://github.com/PRISHIta123/Cyber_Security_Project/blob/master/screenshots/DSA.JPG)

As seen above, the same sender hash address (highlighted in yellow) is involved in two transactions of 10 cryptocurrency units each (underlined in blue), but with different receiver hash addresses. Thus, if these 2 transactions are performed simultaneously (i.e. at the same timestamp), only 10 units will be deducted from his balance at the same time, whereas his actual deduction amount should be 20. The sender can thus exploit this issue to his advantage, and perform many such transactions, but by paying only half the actual amount.  

**Network Observers**  

A network observer will check the number of pending transactions from a particular sender address in a blockchain. If the payment amount of two pending transactions from that address is the same, and the total amount is greater than the initial balance of the sender, a transaction aborted error will be displayed, and the user will be prompted to either cancel the last transaction with the same amount, or to try performing the transaction later.  

```
if(total>balance && num>1)
{
console.log("\nYour transaction has been aborted due to a suspected double-spending attack.");
console.log("\nPlease cancel your last transaction or try again later.");
}
```  

![alt text](https://github.com/PRISHIta123/Cyber_Security_Project/blob/master/screenshots/NO.JPG)

**Peer Alert Systems**  

In order to disconnect from the block where the fraudulent transaction or double spending attack has taken place, the neighbouring blocks are alerted. Any subsequent transactions that are scheduled for this block are redirected to other routes, and these neighbouring blocks terminate their connections with it. The sender (who wanted to conduct the double spending attack), has to either withdraw any one of the transactions within a given timeout period, or will be blocked temporarily before being able to perform any new transactions again.  

Creating four new transactions in the blockchain:  

<p align="left">
  <img width="1000" src="https://github.com/PRISHIta123/Cyber_Security_Project/blob/master/screenshots/pas1.JPG">
</p>

Displaying the current blockchain with the genesis block:  

![alt text](https://github.com/PRISHIta123/Cyber_Security_Project/blob/master/screenshots/pas2.JPG)

Mining blocks to perform the transactions:  

<p align="left">
  <img width="1000" src="https://github.com/PRISHIta123/Cyber_Security_Project/blob/master/screenshots/pas3.JPG">
</p>

A double spending attack occurs in the blockchain. The network observer throws an error, asking the user to delete the last transaction, or be temporarily suspended. After this, the peer alert system will terminate connections of the other blocks to the fraudulent blocks (alerting neighbouring blocks) as shown below:  

<p align="left">
  <img width="1000" src="https://github.com/PRISHIta123/Cyber_Security_Project/blob/master/screenshots/pas4.JPG">
</p>

Therefore, due to the double spending attack, the number of transactions reduces from four to two (the ones involved in the attack are aborted). The peer alert system will nullify the preceding hash of blocks that had fraudulent blocks preceding them, due to the fact that the preceding hash is used as one of the parameters to calculate the current hash of any block.  

![alt text](https://github.com/PRISHIta123/Cyber_Security_Project/blob/master/screenshots/pas5.JPG)

To overcome this issue of having a null preceding hash, this block is replaced with a new genesis block, with a preceding hash of '0'. This will also lead to a new current hash being generated, that can be used to perform the same transaction as before (Change of transaction route).  

![alt text](https://github.com/PRISHIta123/Cyber_Security_Project/blob/master/screenshots/pas6.JPG)

Finally, after only genuine transactions are contained in the blockchain, they are processed, and the balances of each of the addresses are updated accordingly.  


<p align="left">
  <img width="1000" src="https://github.com/PRISHIta123/Cyber_Security_Project/blob/master/screenshots/pas7.JPG">
</p>







