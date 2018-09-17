let mysql= require('mysql');
let config={
            host: 'localhost',
            user: 'root',
            password: '42047989', 
            database: 'sys01',
            multipleStatements: true 
　　　　　　};
let pool=mysql.createPool(config);

module.exports=pool;