import express from 'express';
import bodyParser from 'body-parser';
import * as db from './util/database.js';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => {    
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('Welcome to the Invoice Management System API');
}
);

app.get('/invoices', (req, res) => {
    try {
        const invoices = db.getAllInvoices();
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch invoices' });
    }
});

app.get('/invoices/:id', (req, res) => {
    const id = req.params.id;
    try {
        const invoice = db.getInvoiceById(id);
        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }
        res.json(invoice);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch invoice' });
    }
});
app.post('/invoices', (req, res) => {
    const {
        issuer_id, customer_id, invoice_number, invoice_date,
        fulfillment_date, payment_deadline, total_amount, vat_amount
    } = req.body;

    try {
        const newInvoice = db.createInvoice(
            issuer_id, customer_id, invoice_number, invoice_date,
            fulfillment_date, payment_deadline, total_amount, vat_amount
        );
        res.status(201).json(newInvoice);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
app.put('/invoices/:id', (req, res) => {
    const id = req.params.id;
    const {
        issuer_id, customer_id, invoice_number, invoice_date,
        fulfillment_date, payment_deadline, total_amount, vat_amount
    } = req.body;

    try {
        // Cancel the existing invoice
        const cancelResult = db.cancelInvoice(id);
        if (!cancelResult.changes) {
            return res.status(404).json({ error: 'Invoice not found' });
        }
        // Create a new invoice with the provided data
        const newInvoice = db.createInvoice(
            issuer_id, customer_id, invoice_number, invoice_date,
            fulfillment_date, payment_deadline, total_amount, vat_amount
        );
        res.status(201).json(newInvoice);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.patch('/invoices/:id', (req, res) => {
    const id = req.params.id;

    try {
        const result = db.cancelInvoice(id);
        if (!result.changes) {
            return res.status(404).json({ error: 'Invoice not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to cancel invoice' });
    }
});

app.get('/users', (req, res) => {
    try {
        const users = db.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});
app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    try {
        const user = db.getUserById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});
app.post('/users', (req, res) => {
    const { name, address, tax_number } = req.body;

    try {
        const newUser = db.createUser(name, address, tax_number);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const { name, address, tax_number } = req.body;

    try {
        const updatedUser = db.updateUser(id, name, address, tax_number);
        if (!updatedUser.changes) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
app.delete('/users/:id', (req, res) => {
    const id = req.params.id;

    try {
        const result = db.deleteUser(id);
        if (!result || !result.changes) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

