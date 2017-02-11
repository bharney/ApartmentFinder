import express from 'express';
import sql from 'mssql';

let classTypeRoutes = function () {

    const classTypeRouter = express.Router();
    const dbconfig = "mssql://Application:!Testing123@BPHSERVER/YogaMarieMills";


    classTypeRouter.route('/classTypes')
        .get(function (req, res) {
            const sqlClassTypes = new sql.Connection(dbconfig, function (err) {
                let request = new sql.Request(sqlClassTypes);
                request.query('select * from ClassTypes').then(function (recordset) {
                    res.json(recordset);
                }).catch(function (err) {
                    console.log("classTypes: " + err);
                });
            });
        });

    return classTypeRouter
};

module.exports = classTypeRoutes;

export default classTypeRoutes;