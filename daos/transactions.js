const storage = require('../storage');

class TransactionDAO {
    static getCurrentBalance() {
        return storage.getAccountBalance();
    }

    static updateBalance(amount) {
        return storage.updateAccountBalance(amount);
    }

    static getTransactions() {
        return storage.getTransactions();
    }

    static getTransactionById(id) {
        return storage.getTransactionById(id);
    }

    static saveCredit(amount) {
        return storage.saveCredit(amount);
    }

    static saveDebit(amount) {
        return storage.saveDebit(amount);
    }
}

module.exports = TransactionDAO;