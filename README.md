# informationSecurity_backend

## Initialisation

- Download mysql
- create a .env like that in the project:
```js
DB_HOST=localhost
DB_USER=root
DB_PASSWORD= //your password
DB_NAME=informationsecurity
PORT=3306
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
