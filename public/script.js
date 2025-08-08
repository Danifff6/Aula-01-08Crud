async function fetchUsers() {
    const res = await fetch('/users');
    const users = await res.json();
    const list = document.getElementById('userList');
    list.innerHTML = '';

    users.forEach(user => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${user.name}</strong> (${user.email})
        <button onclick="deleteUser(${user.id})">Excluir</button>
        <button onclick="editUser(${user.id}, '${user.name}', '${user.email}')">Editar</button>
      `;
      list.appendChild(li);
    });
}

async function createUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    await fetch('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    });

    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    fetchUsers();
}

async function deleteUser(id) {
    await fetch(`/users/${id}`, { method: 'DELETE' });
    fetchUsers();
}

async function editUser(id, currentName, currentEmail) {
    const name = prompt('Novo nome:', currentName);
    const email = prompt('Novo email:', currentEmail);

    if (!name || !email) return;

    await fetch(`/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    });

    fetchUsers();
}
fetchUsers();