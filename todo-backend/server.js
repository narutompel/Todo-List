const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Untuk parsing JSON

// Koneksi ke MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // pakai username MySQL
    password: '', // pakai password MySQL
    database: 'todo-app'
});

// Mengambil daftar tugas
app.get('/todos', (req, res) => {
    connection.query('SELECT * FROM tasks', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Menambahkan tugas baru
app.post('/todos', (req, res) => {
    const task = req.body.task;
    connection.query('INSERT INTO tasks (task_name, completed) VALUES (?, ?)', [task, false], (err) => {
        if (err) throw err;
        res.status(201).send('Task added');
    });
});

// Menghapus tugas
app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.send('Task deleted');
    });
});

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
