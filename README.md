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

