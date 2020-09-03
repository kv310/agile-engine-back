require('dotenv').config();
require('./storage');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');

const TransactionController = require('./controllers/transactions');
const storage = require('./storage');

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", async (req, res) => {
    // Default endpoint returns account balance
    let accountBalance = await storage.getAccountBalance();
    res.json(accountBalance);
});

app.use("/transactions", TransactionController);

app.listen(port);