const express = require('express');
const router = express.Router();
const TransactionService = require('../services/transactions');

router.get("/", async (req, res) => {
    let transactions = await TransactionService.getTransactions();
    res.json(transactions);
});

router.get("/:id", async (req, res) => {
    let { id } = req.params;
    let transaction = await TransactionService.getTransactionById(id);

    if(transaction) {
        res.json(transaction);
    }
    else {
        res.status(404).send("transaction not found");
    }
});

router.post("/", async (req, res) => {
    let { type, amount } = req.body;
    try {
        if(type && amount) {
            if(type === "debit") {
                let newDebit = await TransactionService.saveDebit(amount);
                res.status(201).json(newDebit);
            }
            else if(type === "credit") {
                let newCredit = await TransactionService.saveCredit(amount);
                res.status(201).json(newCredit);
            }
            else {
                res.status(403).json({ error: "Invalid parameters"});
            }
        }
        else {
            // ERROR
            res.status(403).json({ error: "Missing parameters" });
        }
    }
    catch(err) {
        res.status(403).json({ error: err.message });
    }
});


module.exports = router;