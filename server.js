const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const axios = require('axios');

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); 

// Connexion to Vault to get the key
const VAULT_ADDR = 'http://127.0.0.1:8200'; 
const VAULT_TOKEN = process.env.VAULT_TOKEN;

// Configuration connection MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    connectTimeout: 60000 // Augmente le délai à 60 secondes
});

// Connection to database
db.connect((err) => {
  if (err) {
        console.error("Can't connect to the database:", err);
        return;
  }
  console.log('Connected to mysql database');
});

// New user
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;

    const token = crypto.randomUUID() ;

    db.query(
        `INSERT INTO users (username, password, token) VALUES (?, ?, ?)`,
        [username, password, token],
        (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ message: 'This username is already used' });
                  }
                return res.status(500).json({ message: 'Error while creating a now user', err });
            }
            res.status(201).json({ message: 'User created', token });
        }
    );
});

// Login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    db.query(
        `SELECT * FROM users WHERE username = ?`,
        [username],
        async (err, result) => {
        if (err) return res.status(500).json({ message: 'Connexion Error', err });

        if (result.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = result[0];
        if (!(password === user.password)) {
            return res.status(401).json({ message: 'Password incorrect' });
        }

        res.json({ token: user.token });
        }
    );
});

// Save file
app.post('/api/files/add', (req, res) => {
  const header_token = req.headers['authorization'];
  if (!header_token || !header_token.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Invalid Token' });
  }
  const token = header_token.split(' ')[1];
  const { file_name, file_data_AES, file_data_RC4, file_data_DES } = req.body;
  db.query(
      `INSERT INTO files (user_token, file_name, file_data_AES, file_data_RC4, file_data_DES) VALUES (?, ?, ?, ?, ?)`,
      [token, file_name, file_data_AES, file_data_RC4, file_data_DES],
      (err, result) => {
          if (err) {
              if (err.code === 'ER_DUP_ENTRY') {
                  return res.status(400).json({ message: 'File already exists' });
              }
              return res.status(500).json({ message: 'Error saving the file', err });
          }
          res.status(201).json({ message: 'File saved' });
      }
  );
});

// Delete file
app.delete('/api/files/delete', (req, res) => {
    const header_token = req.headers['authorization'];
    if (!header_token || !header_token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
    const token = header_token.split(' ')[1];
    const { file_name } = req.body;

    db.query(
        `DELETE FROM files WHERE user_token = ? AND file_name = ?`,
        [token, file_name],
        (err, result) => {
            if (err) return res.status(500).json({ message: 'Error deleting the file', err });

            if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'File not found' });
            }

            res.json({ message: 'File deleted' });
        }
    );
});

// Get file 
app.get('/api/files/:file_name', (req, res) => {
      const header_token = req.headers['authorization'];
      if (!header_token || !header_token.startsWith('Bearer ')) {
          return res.status(401).json({ message: 'Invalid Token' });
      }
      const token = header_token.split(' ')[1];
      const { file_name } = req.params;
      db.query(
          `SELECT * FROM files WHERE user_token = ? AND file_name = ?`,
          [token, file_name],
          (err, result) => {
              if (err) return res.status(500).json({ message: 'Error getting the file', err });

              if (result.length === 0) {
                  return res.status(404).json({ message: 'File not found' });
              }

              const { file_data_AES, file_data_RC4, file_data_DES } = result[0];
              res.json({ file_data_AES, file_data_RC4, file_data_DES });
          }
      );
});

// Get all files names
app.get('/api/files', (req, res) => {
    const header_token = req.headers['authorization'];
    if (!header_token || !header_token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
    const token = header_token.split(' ')[1];

    db.query(
        `SELECT file_name FROM files WHERE user_token = ?`,
        [token],
        (err, result) => {
            if (err) return res.status(500).json({ message: 'Error getting files', err });

            const fileNames = result.map(file => file.file_name);
            res.json({ fileNames });
        }
    );
});


// Save text
app.post('/api/texts/add', (req, res) => {
    const header_token = req.headers['authorization'];
    if (!header_token || !header_token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
    const token = header_token.split(' ')[1];
    const { text_name, text_data_AES, text_data_RC4, text_data_DES } = req.body;

    db.query(
        `INSERT INTO texts (user_token, text_name, text_data_AES, text_data_RC4, text_data_DES) VALUES (?, ?, ?, ?, ?)`,
        [token, text_name, text_data_AES, text_data_RC4, text_data_DES],
        (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ message: 'Text already exist' });
                  }
                return res.status(500).json({ message: 'Error saving the text', err });
            }
            res.status(201).json({ message: 'Text saved' });
        }
    );
});

// Delete text
app.delete('/api/texts/delete', (req, res) => {
    const header_token = req.headers['authorization'];
    if (!header_token || !header_token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
    const token = header_token.split(' ')[1];
    const { text_name } = req.body;

    db.query(
        `DELETE FROM texts WHERE user_token = ? AND text_name = ?`,
        [token, text_name],
        (err, result) => {
            if (err) return res.status(500).json({ message: 'Error deleting the text', err });

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Text not found' });
            }
            res.json({ message: 'Text deleted' });
        }
    );
});

// Get text 
app.get('/api/texts/:text_name', (req, res) => {
    const header_token = req.headers['authorization'];
    if (!header_token || !header_token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
    const token = header_token.split(' ')[1];
    const { text_name } = req.params;

    db.query(
        `SELECT * FROM texts WHERE user_token = ? AND text_name = ?`,
        [token, text_name],
        (err, result) => {
            if (err) return res.status(500).json({ message: 'Error getting the text', err });

            if (result.length === 0) {
            return res.status(404).json({ message: 'Text not found' });
            }

            res.json({ text_data_AES: result[0].text_data_AES, text_data_RC4: result[0].text_data_RC4, text_data_DES: result[0].text_data_DES });
        }
    );
});

// Get all texts names
app.get('/api/texts', (req, res) => {
    const header_token = req.headers['authorization'];
    if (!header_token || !header_token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
    const token = header_token.split(' ')[1];

    db.query(
        `SELECT text_name FROM texts WHERE user_token = ?`,
        [token],
        (err, result) => {
            if (err) return res.status(500).json({ message: 'Error getting texts', err });

            const textNames = result.map(text => text.text_name);
            res.json({ textNames });
        }
    );
});

// Get the key
app.get('/get-encryption-key', async (req, res) => {
  try {
    const response = await axios.get(`${VAULT_ADDR}/v1/secret/data/encryption-key`, {
      headers: {
        'X-Vault-Token': VAULT_TOKEN,
      }
    });
    const key = response.data.data.data.key;
    res.json({ encryptionKey: key });
  } catch (error) {
    console.error('Error fetching encryption key:', error);
    res.status(500).send('Failed to fetch encryption key');
  }
});

// Get the key to add salt to the password
app.get('/get-key-password', async (req, res) => {
  try {
    const response = await axios.get(`${VAULT_ADDR}/v1/secret/data/key-password`, {
      headers: {
        'X-Vault-Token': VAULT_TOKEN,
      }
    });
    const key = response.data.data.data.key;
    res.json({ encryptionKey: key });
  } catch (error) {
    console.error('Error fetching key for password:', error);
    res.status(500).send('Failed to fetch key for password');
  }
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
