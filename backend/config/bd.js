const mysql = require('mysql2');

const bd = mysql.createConnection({
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE
});

bd.connect((erro) => {
    if (erro) {
        console.error('Erro ao conectar no banco:', erro);
        return;
    }

    console.log('Conectado ao banco!');
});

module.exports = bd;