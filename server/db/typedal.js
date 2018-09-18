let BaseDal = require('./db')
let db = new BaseDal()
let ResultInfo = require('../common/resultInfo')
let resultInfo;

class TypeDal {

    //查询列表
    queryTypeList(req, res) {
        let pageIndex = req.query.pageIndex
        let pageSize = req.query.pageSize
        let v1 = (pageIndex - 1) * pageSize;
        let sql = `SELECT COUNT(1) as Total  FROM super_type;
                   SELECT * FROM super_type limit ${v1},${pageSize}`
        db.execSql(sql, (err, data) => {
            if (err) {
                resultInfo = new ResultInfo(false, data, "查询失败")
            } else {
                if (data.length) {
                    resultInfo = new ResultInfo(true, data, "查询成功")

                } else {
                    resultInfo = new ResultInfo(false, data, "没有查询到数据");
                }
            }
            res.json(resultInfo);
        })
    }

    //通过ID查询
    queryTypeById(req, res) {
        let id = req.query.id;
        let sql = `SELECT * FROM super_type WHERE id=${id}`
        db.execSql(sql, (err, data) => {
            if (err) {
                resultInfo = new ResultInfo(false, data, "查询失败")
            } else {
                if (data.length) {
                    resultInfo = new ResultInfo(true, data, "查询成功")

                } else {
                    resultInfo = new ResultInfo(false, data, "没有查询到数据");
                }
            }
            res.json(resultInfo);
        })
    }
    //新增
    insertType(req,res){
        let name=req.body.name;
        let sql=`INSERT INTO super_type(typeName) values('${name}')`
        db.execSql(sql, (err, data) => {
            if (err) {
                resultInfo = new ResultInfo(false, data, "添加失败")
            } else {
                resultInfo = new ResultInfo(false, data, "添加成功");
            }
            res.json(resultInfo);
        })
    }


    //更新
    updateType(req, res) {
        let name = req.body.name;
        let id = req.body.id;
        let sql = `UPDATE A
                 SET typeName='${name}'
                 FROM super_type A
                 WHERE A.id=${id}`
        db.execSql(sql, (err, data) => {
            if (err) {
                resultInfo = new ResultInfo(false, data, "更新失败")
            } else {
                resultInfo = new ResultInfo(false, data, "更新成功");
            }
            res.json(resultInfo);
        })
    }

    //删除
    deleteType(req, res) {
        let id = req.body.id;
        let sql = `DELETE FROM  super_type A
                   WHERE A.id=${id}`
        db.execSql(sql, (err, data) => {
            if (err) {
                resultInfo = new ResultInfo(false, data, "删除失败")
            } else {
                resultInfo = new ResultInfo(false, data, "删除成功");
            }
            res.json(resultInfo);
        })
    }
}
module.exports=TypeDal