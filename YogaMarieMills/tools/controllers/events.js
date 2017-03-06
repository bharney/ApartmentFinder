import express from 'express';
import sql from 'mssql';

let eventRoutes = function () {

    const eventRouter = express.Router();
    const dbconfig = "mssql://Application:!Testing123@BPHSERVER/YogaMarieMills";

    eventRouter.route('/events')
        .post(function (req, res) {
            let eventType = (req.body);
            const sqlInsertEventType = new sql.Connection(dbconfig, function (err) {
                let request = new sql.Request(sqlInsertEventType);
                request.input('type', sql.VarChar, eventType.type);
                request.input('title', sql.VarChar, eventType.title);
                request.input('time', sql.VarChar, eventType.time);
                request.input('event', sql.VarChar, eventType.event);
                request.input('event_desc', sql.VarChar, eventType.event_desc);
                request.input('cost', sql.VarChar, eventType.cost);
                request.query(
                    `INSERT INTO EventTypes (type, title, time, short, description, cost)
                    VALUES (@type, @title, @time, @event, @event_desc, @cost);`
                ).then(res.status(201).send(event)).catch(function (err) {
                    console.log("insert EventTypes: " + err);
                });
            });
        })
        .put(function (req, res) {
            let eventType = (req.body);
            const sqlUpdateEventType = new sql.Connection(dbconfig, function (err) {
                let request = new sql.Request(sqlUpdateEventType);
                request.input('id', sql.Int, eventType.id);
                request.input('title', sql.VarChar, eventType.title);
                request.input('time', sql.VarChar, eventType.time);
                request.input('event', sql.VarChar, eventType.event);
                request.input('event_desc', sql.VarChar, eventType.event_desc);
                request.input('cost', sql.VarChar, eventType.cost);
                request.query(
                    `UPDATE EventTypes 
                     SET title = @title
                     , time = @time
                     , short = @event
                     , description = @event_desc
                     , cost = @cost
                     WHERE id = @id;`
                ).then(res.status(201).send(event)).catch(function (err) {
                    console.log("update EventTypes: " + err);
                });
            });
        })
        .delete(function (req, res) {
            const sqlDeleteEventType = new sql.Connection(dbconfig, function (err) {
                let request = new sql.Request(sqlDeleteEventType);
                request.input('id', sql.Int, req.body.id);
                request.query(
                    `DELETE FROM EventTypes
                     WHERE id = @id`
                ).then(res.status(201).send("EventType has been deleted.")).catch(function (err) {
                    console.log("delete EventType: " + err);
                });
            });
        })
        .get(function (req, res) {
            const sqlEventTypes = new sql.Connection(dbconfig, function (err) {
                let request = new sql.Request(sqlEventTypes);
                request.query(
                    `SELECT E.id AS id
                    ,E.type AS type
                    ,H.header AS header
                    ,H.short AS short
                    ,H.venue AS venue
                    ,E.session_time AS session_time
                    ,E.title AS title
                    ,E.description AS description
                    ,CASE WHEN ISNUMERIC(E.cost) = 1 
                                 THEN FORMAT(TRY_PARSE(E.cost AS decimal), 'C', 'de-de') 
                                 ELSE E.cost END AS cost
                    ,E.image AS image
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

    eventRouter.route('/events/:eventId')
        .get(function (req, res) {
            const sqlEventType = new sql.Connection(dbconfig, function (err) {
                let request = new sql.Request(sqlEventType);
                request.input('id', sql.Int, req.params.eventId);
                request.query(`SELECT id
                                ,type
                                ,session_time
                                ,title
                                ,event
                                ,event_desc
                                ,cost
                                FROM events
                                WHERE id = @id`
                ).then(function (recordset) {
                    if (recordset.length > 0) {
                        res.json(recordset);
                    }
                    else {
                        res.status(500).send("No EventType found with this ID.");
                    }
                }).catch(function (err) {
                    console.log("EventType: " + err);
                });
            });
        })
        .delete(function (req, res) {
            const sqlDeleteEventType = new sql.Connection(dbconfig, function (err) {
                let request = new sql.Request(sqlDeleteEventType);
                request.input('id', sql.Int, req.params.eventId);
                request.query(
                    `DELETE FROM EventTypes
                     WHERE id = @id`
                ).then(res.status(201).send("EventType has been deleted.")).catch(function (err) {
                    console.log("delete EventType: " + err);
                });
            });
        });

    return eventRouter;
};

module.exports = eventRoutes;

export default eventRoutes;