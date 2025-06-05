const apiUrl = 'http://localhost:3000';

async function fetchUsers() {
  const res = await fetch(`${apiUrl}/users`);
  const users = await res.json();
  const container = document.getElementById('user-list');
  container.innerHTML = '';
  users.forEach(user => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <p><strong>Név:</strong> <input value="${user.name}" onchange="updateUser(${user.id}, this.value, 'name')"></p>
      <p><strong>Cím:</strong> <input value="${user.address}" onchange="updateUser(${user.id}, this.value, 'address')"></p>
      <p><strong>Adószám:</strong> <input value="${user.tax_number}" onchange="updateUser(${user.id}, this.value, 'tax_number')"></p>
      <button onclick="deleteUser(${user.id})">Törlés</button>
    `;
    container.appendChild(div);
  });
}

async function createUser() {
  const name = document.getElementById('user-name').value;
  const address = document.getElementById('user-address').value;
  const tax = document.getElementById('user-tax').value;

  await fetch(`${apiUrl}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, address, tax_number: tax })
  });

  fetchUsers();
}

async function updateUser(id, value, field) {
  const res = await fetch(`${apiUrl}/users/${id}`);
  const user = await res.json();
  user[field] = value;

  await fetch(`${apiUrl}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });

  fetchUsers();
}

async function deleteUser(id) {
  await fetch(`${apiUrl}/users/${id}`, { method: 'DELETE' });
  fetchUsers();
}


async function fetchInvoices() {
    const res = await fetch(`${apiUrl}/invoices`);
    const invoices = await res.json();
    const container = document.getElementById('invoice-list');
    container.innerHTML = '';
    invoices.forEach(inv => {
        if (inv.is_cancelled === 1) return;
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
            <p><strong>Számla #${inv.invoice_number}</strong></p>
            <p>Kibocsátó ID: <input value="${inv.issuer_id}" onchange="updateInvoice(${inv.id}, this.value, 'issuer_id')"></p>
            <p>Vevő ID: <input value="${inv.customer_id}" onchange="updateInvoice(${inv.id}, this.value, 'customer_id')"></p>
            <p>Dátum: <input type="date" value="${inv.invoice_date}" onchange="updateInvoice(${inv.id}, this.value, 'invoice_date')"></p>
            <p>Teljesítés: <input type="date" value="${inv.fulfillment_date}" onchange="updateInvoice(${inv.id}, this.value, 'fulfillment_date')"></p>
            <p>Határidő: <input type="date" value="${inv.payment_deadline}" onchange="updateInvoice(${inv.id}, this.value, 'payment_deadline')"></p>
            <p>Összeg: <input type="number" value="${inv.total_amount}" onchange="updateInvoice(${inv.id}, this.value, 'total_amount')"> Ft</p>
            <p>ÁFA: <input type="number" value="${inv.vat_amount}" onchange="updateInvoice(${inv.id}, this.value, 'vat_amount')"> Ft</p>
            <button onclick="deleteInvoice(${inv.id})">Törlés</button>
        `;
        container.appendChild(div);
    });
}


async function updateInvoice(id, value, field) {
    const res = await fetch(`${apiUrl}/invoices/${id}`);
    const invoice = await res.json();

    if (['issuer_id', 'customer_id'].includes(field)) {
        invoice[field] = parseInt(value);
    } else if (['total_amount', 'vat_amount'].includes(field)) {
        invoice[field] = parseFloat(value);
    } else {
        invoice[field] = value;
    }

    await fetch(`${apiUrl}/invoices/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invoice)
    });

    fetchInvoices();
}

async function createInvoice() {
  const data = {
    issuer_id: parseInt(document.getElementById('inv-issuer-id').value),
    customer_id: parseInt(document.getElementById('inv-customer-id').value),
    invoice_number: document.getElementById('inv-number').value,
    invoice_date: document.getElementById('inv-date').value,
    fulfillment_date: document.getElementById('inv-fulfillment').value,
    payment_deadline: document.getElementById('inv-deadline').value,
    total_amount: parseFloat(document.getElementById('inv-total').value),
    vat_amount: parseFloat(document.getElementById('inv-vat').value)
  };

  await fetch(`${apiUrl}/invoices`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  fetchInvoices();
}

async function deleteInvoice(id) {
  await fetch(`${apiUrl}/invoices/${id}`, { method: 'PATCH' });
  fetchInvoices();
}

fetchUsers();
fetchInvoices();
