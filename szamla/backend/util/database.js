import Database from "better-sqlite3";

const db = new Database('./data/database.sqlite');

// USERS
db.prepare(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    tax_number TEXT NOT NULL
)`).run();

// INVOICES
db.prepare(`CREATE TABLE IF NOT EXISTS invoices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    issuer_id INTEGER NOT NULL,
    issuer_name TEXT NOT NULL,
    issuer_address TEXT NOT NULL,
    issuer_tax_number TEXT NOT NULL,
    customer_id INTEGER NOT NULL,
    customer_name TEXT NOT NULL,
    customer_address TEXT NOT NULL,
    customer_tax_number TEXT NOT NULL,
    invoice_number TEXT NOT NULL,
    invoice_date DATE NOT NULL,
    fulfillment_date DATE NOT NULL,
    payment_deadline DATE NOT NULL,
    total_amount REAL NOT NULL,
    vat_amount REAL NOT NULL,
    is_cancelled INTEGER DEFAULT 0,
    cancelled_at DATE,
    FOREIGN KEY (issuer_id) REFERENCES users(id),
    FOREIGN KEY (customer_id) REFERENCES users(id)
)`).run();

// USERS
export const getAllUsers = () => db.prepare(`SELECT * FROM users`).all();
export const getUserById = (id) => db.prepare(`SELECT * FROM users WHERE id = ?`).get(id);
export const createUser = (name, address, tax_number) =>
    db.prepare(`INSERT INTO users (name, address, tax_number) VALUES (?, ?, ?)`).run(name, address, tax_number);
export const updateUser = (id, name, address, tax_number) =>
    db.prepare(`UPDATE users SET name = ?, address = ?, tax_number = ? WHERE id = ?`)
      .run(name, address, tax_number, id);
export const deleteUser = (id) => db.prepare(`DELETE FROM users WHERE id = ?`).run(id);

// INVOICES
export const getAllInvoices = () => db.prepare(`SELECT * FROM invoices`).all();
export const getInvoiceById = (id) => db.prepare(`SELECT * FROM invoices WHERE id = ?`).get(id);

// Számla létrehozás validációval és redundáns adatokkal
export const createInvoice = (
    issuer_id, customer_id, invoice_number, invoice_date,
    fulfillment_date, payment_deadline, total_amount, vat_amount
) => {
    // Lekérjük az eladó és vevő adatait
    const issuer = getUserById(issuer_id);
    const customer = getUserById(customer_id);
    if (!issuer || !customer) throw new Error("Issuer or customer not found");

    // Dátum validáció: payment_deadline <= invoice_date + 30 nap
    const invoiceDate = new Date(invoice_date);
    const paymentDeadline = new Date(payment_deadline);
    const maxDeadline = new Date(invoiceDate);
    maxDeadline.setDate(maxDeadline.getDate() + 30);
    if (paymentDeadline > maxDeadline) {
        throw new Error("A fizetési határidő nem lehet több, mint a kiállítás dátuma plusz 30 nap.");
    }

    return db.prepare(`
        INSERT INTO invoices (
            issuer_id, issuer_name, issuer_address, issuer_tax_number,
            customer_id, customer_name, customer_address, customer_tax_number,
            invoice_number, invoice_date, fulfillment_date, payment_deadline,
            total_amount, vat_amount
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
        issuer.id, issuer.name, issuer.address, issuer.tax_number,
        customer.id, customer.name, customer.address, customer.tax_number,
        invoice_number, invoice_date, fulfillment_date, payment_deadline,
        total_amount, vat_amount
    );
};

// Számlát módosítani nem lehet, ezért nincs updateInvoice

// Számlát törölni nem lehet, csak stornózni
export const cancelInvoice = (id) => {
    const now = new Date().toISOString().slice(0, 10);
    return db.prepare(`UPDATE invoices SET is_cancelled = 1, cancelled_at = ? WHERE id = ?`).run(now, id);
};

// Törlés helyett csak stornózás van
// export const deleteInvoice = (id) => db.prepare(`DELETE FROM invoices WHERE id = ?`).run(id);

// for (const user of users) createUser(user.name, user.age)