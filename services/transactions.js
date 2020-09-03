const TransactionDAO = require('../daos/transactions');

class TransactionService {
    static getTransactions() {
        console.log("Getting transactions...");
        return TransactionDAO.getTransactions();
    }

    static getTransactionById(id) {
        console.log("Getting transaction:", id);
        return TransactionDAO.getTransactionById(id);
    }

    static async saveDebit(amount) {
        console.log("Saving Debit...");
        await this.reduceBalance(amount);
        return TransactionDAO.saveDebit(amount);
    }

    static async saveCredit(amount) {
        try {
            console.log("Saving Credit...");
            await this.increaceBalance(amount); 
            return TransactionDAO.saveCredit(amount);
        }
        catch(err) {
            throw err;
        }

    }

    static async reduceBalance(amount) {
        let currentBalance = await TransactionDAO.getCurrentBalance();
        let updatedBalance = currentBalance - amount;
        return await TransactionDAO.updateBalance(updatedBalance);
    }

    static async increaceBalance(amount) {
        let currentBalance = await TransactionDAO.getCurrentBalance();
        let updatedBalance = currentBalance + amount;
        await TransactionDAO.updateBalance(updatedBalance);
    }
}

module.exports = TransactionService;