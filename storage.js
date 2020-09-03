class Storage {
    constructor() {
        this.baseId = 0;
        this.transactions = [];
        this.accountBalance = 0;
    }

    getAccountBalance() {
        return new Promise((resolve, reject) => {
            resolve(this.accountBalance);
        });
    }

    getTransactions() {
        return new Promise((resolve, reject) => {
            console.log(this.transactions);
            resolve(this.transactions);
        });
    }

    getTransactionById(id) {
        return new Promise((resolve, reject) => {
            resolve(this.transactions.find(transaction => transaction.id == id));
        })
    }

    saveCredit(amount) {
        return new Promise((resolve, reject) => {
            console.log("Saving credit for", amount);
            this.baseId++;
            let newTransaction = {
                id: this.baseId,
                type: "credit",
                amount,
                effectiveDate: new Date()
            }

            this.transactions.unshift(newTransaction);
            resolve(newTransaction);
        })
    }

    saveDebit(amount) {
        return new Promise((resolve, reject) => {
            this.baseId++;
            let newTransaction = {
                id: this.baseId,
                type: "debit",
                amount,
                effectiveDate: new Date()
            };

            this.transactions.unshift(newTransaction);
            resolve(newTransaction);
        })
    }

    updateAccountBalance(amount) {
        return new Promise((resolve, reject) => {
            console.log("Amount:", amount);
            if(amount >= 0) {
                this.accountBalance = amount;
                console.log("Balance Acount updated to:" + this.accountBalance);
                resolve();
            }
            else {
                reject(new Error("Not enough money to debit."));
            }
        });
    }
}

module.exports = new Storage();