let BaseDal = require('./db')
let db = new BaseDal()
let ResultInfo = require('../common/resultInfo')
let resultInfo;

class BlogDal {

    //查询博客列表
    queryBlogList(req, res) {
        let pageIndex = req.query.pageIndex;
        let pageSize = req.query.pageSize;
        let v1 = (pageIndex - 1) * pageSize;
        let title=req.query.title;
        let sql = `SELECT COUNT(1) as Total FROM super_article WHERE ('${title}'='' OR title like '%${title}%'); 
                   SELECT * FROM super_article WHERE ('${title}'='' OR title like'%${title}%') limit ${v1},${pageSize}`;
        db.execSql(sql, (err, data) => {
            if (err) {
                res.send(new ResultInfo(false, data, "查询失败"))
            } else {
                if (data.length) {
                    resultInfo = new ResultInfo(true, data, "查询成功")
                    res.json(resultInfo);
                } else {
                    resultInfo = new ResultInfo(false, data, "没有查询到数据");
                    res.json(resultInfo)
                }
            }
        })
    }

    //查询博客通过Id
    queryBlogById(req, res) {
        let id = req.params.id;
        let sql = `SELECT * FROM super_type;SELECT * FROM super_article where ID=${id}`
        db.execSql(sql, (err, data) => {
            if (err) {
                res.send(new ResultInfo(false, data, "查询失败"))
            } else {
                if (data.length) {
                    resultInfo = new ResultInfo(true, data, "查询成功")
                    res.json(resultInfo);
                } else {
                    resultInfo = new ResultInfo(false, data, "没有查询到数据");
                    res.json(resultInfo)
                }
            }
        })
    }

    //插入
    insertBlog(req, res) {
        //可以直接取
        let title = req.body.title
        let content = req.body.detailContent
        let imageUrl = req.body.path
        let desc = req.body.desc
        let imageWidth = req.body.imageWidth
        let imageHeight = req.body.imageHeight
        let typeId=req.body.typeValue
        let userNname = '小超人';
        imageUrl = imageUrl.replace('\\', '/');
        let sql = `INSERT into super_article(title,content,desc1,image_url,image_width,image_height,user_name,update_time,create_time,type_id)
        VALUES('${title}','${content}','${desc}','${imageUrl}',${imageWidth},${imageHeight},'小超人',current_timestamp(),current_timestamp(),${typeId})`
        console.log(sql);
        db.execSql(sql, (err, data) => {
            if (err) {
                resultInfo = new ResultInfo(false, data, "操作失败")
            } else {
                if (data.length) {
                    resultInfo = new ResultInfo(true, data, "插入成功")

                } else {
                    resultInfo = new ResultInfo(false, data, "插入失败");
                }
            }
            res.json(resultInfo);
        })
    }

    //更新
    updateBlog(req, res) {
        //可以直接取
        let id = req.body.id;
        let title = req.body.title;
        let content = req.body.detailContent;
        let imageUrl = req.body.path;
        let desc = req.body.desc;
        let imageWidth = req.body.imageWidth;
        let imageHeight = req.body.imageHeight;
        imageUrl = imageUrl.replace('\\', '/');
        let sql = `UPDATE super_article SET title='${title}', content='${content}',image_url='${imageUrl}',
        depict='${desc}'
        ,image_width=${imageWidth},image_height=${imageHeight},update_time=current_timestamp()
WHERE id=${id}`
        db.execSql(sql, (err, data) => {
            if (err) {
                res.send(new ResultInfo(false, data, "操作失败"))
            } else {
                if (data.length) {
                    resultInfo = new ResultInfo(true, data, "更新成功")
                    res.json(resultInfo);
                } else {
                    resultInfo = new ResultInfo(false, data, "更新失败");
                    res.json(resultInfo)
                }
            }
        })
    }

    //删除
    deleteBlog(req, res) {
        let id = req.body.id;
        let sql = `DELETE FROM super_article WHERE id=${id}`
        console.log(sql);
        db.execSql(sql, (err, data) => {
            if (err) {
                resultInfo = new ResultInfo(false, data, "操作失败")
            } else {
                resultInfo = new ResultInfo(true, data, "更新成功")
            }
            res.json(resultInfo);
        })
    }
}

module.exports = BlogDal