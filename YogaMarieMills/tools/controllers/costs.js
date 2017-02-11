import express from 'express';
import sql from 'mssql';

let costRoutes = function () {

    const costRouter = express.Router();
    const dbconfig = "mssql://Application:!Testing123@BPHSERVER/YogaMarieMills";

    costRouter.route('/costs')
        .get(function (req, res) {
            const sqlCosts = new sql.Connection(dbconfig, function (err) {
                let request = new sql.Request(sqlCosts);
                request.query('SELECT * FROM Costs').then(function (recordset) {
                    res.json(recordset);
                }).catch(function (err) {
                    console.log("costs: " + err);
                });
            });
        });

    return costRouter
};

module.exports = costRoutes;

export default costRoutes;
