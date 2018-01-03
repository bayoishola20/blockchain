const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = ""){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }
    // New Method
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }
    //Genesis - Manually entered

    createGenesisBlock(){
        return new Block(0, "03/01/2018", "Genesis Block", "0");
    }
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    isValid(){
        for(let i = 1; i< this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }

            return true;
        }
    }
}

let bayoCoin = new Blockchain();
bayoCoin.addBlock(new Block(1, "04/01/2018", { amount: 4 }));
bayoCoin.addBlock(new Block(2, "08/01/2018", { amount: 15 }));

console.log("Valid?" + " "+ bayoCoin.isValid());

bayoCoin.chain[1].data = { amount: 100 };

bayoCoin.chain[1].hash = bayoCoin.chain[1].calculateHash();

console.log("Valid?" + " "+ bayoCoin.isValid());

// console.log(JSON.stringify(bayoCoin, null, 4));