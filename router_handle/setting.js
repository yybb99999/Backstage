/*
 * @Author: 'yang' '1173278084@qq.com'
 * @Date: 2024-03-17 20:59:43
 * @LastEditors: 'yang' '1173278084@qq.com'
 * @LastEditTime: 2024-04-12 21:11:59
 * @FilePath: \Backstage-General-background-management-system-background\router_handle\setting.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const db = require("../db/index");
// 上传轮播图 需要两个参数  set_value set_name
exports.uploadSwiper = (req, res) => {
    let oldName = req.files[0].filename;
    let newName = Buffer.from(req.files[0].originalname, "latin1").toString(
        "utf8"
    );
    fs.renameSync("./public/upload/" + oldName, "./public/upload/" + newName);
    const sql = "update setting set set_value = ? where set_name = ?";
    db.query(
        sql, [`http://127.0.0.1:3007/upload/${newName}`, req.body.name],
        (err, result) => {
            if (err) return res.cc(err);
            res.send({
                status: 0,
                message: "上传轮播图成功",
            });
        }
    );
};
// 获取所有轮播图
exports.getAllSwiper = (req, res) => {
    // like 匹配 字段是否符合 前缀为 ...
    const sql = "select set_value from setting where set_name like 'swiper%' ";
    db.query(sql, (err, result) => {
        if (err) return res.cc(err);
        if (result) {
            // 创建了一个数组
            let array = [];
            // 把set_value 放进数组
            result.forEach((e) => {
                array.push(e.set_value);
            });
            res.send(array);
        } else {
            res.send({
                status: 1,
                message: "请添加轮播图",
            });
        }
    });
};
// 获取公司名称
exports.getCompanyName = (req, res) => {
    const sql = 'select * from setting where set_name = "公司名称"';
    db.query(sql, (err, result) => {
        if (err) return res.cc(err);
        if (result[0].set_value) {
            res.send(result[0].set_value);
        } else {
            res.send({
                status: 1,
                message: "请设置公司名称",
            });
        }
    });
};

// 修改公司名字 参数 set_value
exports.changeCompanyName = (req, res) => {
    const sql = 'update setting set set_value = ? where set_name = "公司名称"';
    db.query(sql, req.body.set_value, (err, result) => {
        if (err) return res.cc(err);
        res.send({
            status: 0,
            message: "修改公司成功",
        });
    });
};
// 编辑公司介绍 参数  set_text set_name
exports.changeCompanyIntroduce = (req, res) => {
    const sql = "update setting set set_text = ? where set_name = ?";
    db.query(sql, [req.body.set_text, req.body.set_name], (err, result) => {
        if (err) return res.cc(err);
        res.send({
            status: 0,
            message: "修改公司介绍成功",
        });
    });
};
// 获取公司介绍 参数 set_name
exports.getCompanyIntroduce = (req, res) => {
    const sql = "select * from setting where set_name = ?";
    db.query(sql, req.body.set_name, (err, result) => {
        if (err) return res.cc(err);
        res.send(result[0].set_text);
    });
};
// 获取所有公司信息
exports.getAllCompanyIntroduce = (req, res) => {
    const sql = 'select * from setting where set_name like "公司%" ';
    db.query(sql, (err, result) => {
        if (err) return res.cc(err);
        result = result.slice(1);
        res.send(result);
    });
};
// -----其他设置