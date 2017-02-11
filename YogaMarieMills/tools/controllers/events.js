import express from 'express';
import sql from 'mssql';

let eventRoutes = function () {

    const eventRouter = express.Router();
    const dbconfig = "mssql://Application:!Testing123@BPHSERVER/YogaMarieMills";

    eventRouter.route('/events')
        .get(function (req, res) {
            const sqlEvents = new sql.Connection(dbconfig, function (err) {
                let request = new sql.Request(sqlEvents);
                request.query(
                    `SELECT E.id AS id
                ,E.type AS type
                ,H.header AS header
                ,H.short AS short
                ,H.description AS description 
                ,H.venue AS venue
                ,E.time AS session_time
                ,E.title AS title
                ,E.description AS description
                ,E.cost AS cost
                FROM Headers H
                JOIN EventTypes E
                ON H.type = E.type`
                ).then(function (recordset) {
                    res.json(recordset);
                }).catch(function (err) {
                    console.log("events: " + err);
                });
            });
        });

    return eventRouter
};

module.exports = eventRoutes;

export default eventRoutes;