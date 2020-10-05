const SHA256 = require('crypto-js/sha256');

//Attacker class that creates objects that can perform double-spending attacks
class Attacker
{
	constructor(fromAddress, amount)
	{

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