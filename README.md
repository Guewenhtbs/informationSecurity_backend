# informationSecurity_backend

## Create your vault

Install a vault (I use HashiCorp Vault)

Launch your vault and get the root token

Add the key named 'encryption-key' which will be used to encrypt and decrypt data

Add the key named 'key-password' which will be the salt added to the user password before hashing

## Initialisation

- Download mysql
- create a .env like that in the project:
```js
DB_HOST=localhost
DB_USER=root
DB_PASSWORD= //your password
DB_NAME=informationsecurity
DB_PORT=3306 
PORT=3000
VAULT_TOKEN=//your vault's token
```
- open a terminal in this folder and write:

 in the terminal
```bash
mysql -u root -p
```

in the sql CLC
```sql
CREATE DATABASE informationsecurity;
```

in the terminal
```bash
mysql -u root -p informationsecurity < informationsecurity.sql
```

## Run

First, install express in your project:
```bash
npm install express
```

Run the server by opening a terminal in this folder and writing:

```bash
npm start
```

## Front-end

Follow this [link](https://github.com/codalbin/informationSecurity)
