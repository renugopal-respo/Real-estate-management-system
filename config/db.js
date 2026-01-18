const mysql=require('mysql2/promise');
const db=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Renugopal@2005',
    database:'realestatemanagementsystem'
});

module.exports=db;