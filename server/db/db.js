var pool = require('./db.pool')

class BaseDal {

    //构造函数
    constructor() {}
    execSql(sql, callback)
    {
        pool.getConnection((err, connection)=>{
            if (err) {
                callback(err)
            } else {
                connection.query(sql, function (err, data) {
                    connection.release();
                    callback(err, data);
                    
                })
            }
        })
    }
}

module.exports=BaseDal
