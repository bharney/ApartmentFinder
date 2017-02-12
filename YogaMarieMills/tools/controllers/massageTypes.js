import express from 'express';
import sql from 'mssql';

let massageTypeRoutes = function () {

    const massageTypeRouter = express.Router();
    const dbconfig = "mssql://Application:!Testing123@BPHSERVER/YogaMarieMills";

    massageTypeRouter.route('/massageTypes')
        .post(function (req, res) {
            let massageType = (req.body);
            const sqlInsertMassageType = new sql.Connection(dbconfig, function (err) {
                let request = new sql.Request(sqlInsertMassageType);
                request.input('type', sql.VarChar, massageType.type);
                request.input('title', sql.VarChar, massageType.title);
                request.input('session_time', sql.VarChar, massageType.session_time);
                request.input('details', sql.VarChar, massageType.details);
                request.input('cost', sql.VarChar, massageType.cost);
                request.query(
                    `INSERT INTO MassageTypes (type, title, session_time, details, cost)
                    VALUES (@type, @title, @session_time, @details, @cost);`
                ).then(res.status(201).send(massageType)).catch(function (err) {
                    console.log("insert MassageTypes: " + err);
                });
            });
        })
        .put(function (req, res) {
            let massageType = (req.body);
            const sqlUpdateMassageType = new sql.Connection(dbconfig, function (err) {
                let request = new sql.Request(sqlUpdateMassageType);
                request.input('id', sql.Int, massageType.id);
                request.input('title', sql.VarChar, massageType.title);
                request.input('session_time', sql.VarChar, massageType.session_time);
                request.input('details', sql.VarChar, massageType.details);
                request.input('cost', sql.VarChar, massageType.cost);
                request.query(
                    `UPDATE MassageTypes 
                     SET title = @title
                     , session_time = @session_time
                     , details = @details
                     , cost = @cost
                     WHERE id = @id;`
                ).then(res.status(201).send(massageType)).catch(function (err) {
                    console.log("update MassageTypes: " + err);
                });
            });
        })
        .delete(function (req, res) {
            const sqlDeleteMassageType = new sql.Connection(dbconfig, function (err) {
                let request = new sql.Request(sqlDeleteMassageType);
                request.input('id', sql.Int, req.body.id);
                request.query(
                    `DELETE FROM MassageTypes
                     WHERE id = @id`
                ).then(res.status(201).send("MassageType has been deleted.")).catch(function (err) {
                    console.log("delete MassageType: " + err);
                });
            });
        })
        .get(function (req, res) {
            const sqlMassageTypes = new sql.Connection(dbconfig, function (err) {
                let request = new sql.Request(sqlMassageTypes);
                request.query(
                    `SELECT H.id
                    ,H.type
                    ,H.venue AS venue
                    ,H.header AS header
                    ,H.description AS description
                    ,NULL AS session_time
                    ,NULL AS title
                    ,NULL AS details
                    ,NULL AS cost
                    FROM Headers H
                    WHERE H.type IN (SELECT M.type FROM MassageTypes M)

                    UNION ALL

                    SELECT M.id AS id
                    ,M.type AS type
                    ,NULL as venue
                    ,NULL as header
                    ,NULL as description
                    ,M.session_time AS session_time
                    ,M.title AS title
                    ,M.description AS details
                    ,M.cost AS cost
                    FROM MassageTypes M`
                ).then(function (recordset) {
                    let massagePage = [];
                    let counter = 0;
                    for (let header_prop in recordset) {
                        if (recordset.hasOwnProperty(header_prop)) {
                            if (recordset[header_prop].header != null) {
                                let massage_header = {
                                    header: recordset[header_prop].header,
                                    venue: recordset[header_prop].venue,
                                    description: recordset[header_prop].description,
                                    type: recordset[header_prop].type,
                                    massage_details: []
                                };
                                massagePage.push(massage_header);
                                for (let massage_prop in recordset) {
                                    if (recordset.hasOwnProperty(massage_prop)) {
                                        if (recordset[massage_prop].session_time != null) {
                                            if (recordset[header_prop].type == recordset[massage_prop].type) {
                                                let massage_details = {
                                                    session_time: recordset[massage_prop].session_time,
                                                    title: recordset[massage_prop].title,
                                                    details: recordset[massage_prop].details,
                                                    cost: recordset[massage_prop].cost
                                                };
                                                massagePage[counter].massage_details.push(massage_details);
                                            }
                                        }
                                    }
                                }
                                counter++;
                            }
                        }
                    }

                    res.json(massagePage);
                }).catch(function (err) {
                    console.log("massageTypes: " + err);
                });
            });
        });

    massageTypeRouter.route('/massageTypes/:massageTypeId')
        .get(function (req, res) {
            const sqlMassageType = new sql.Connection(dbconfig, function (err) {
                let request = new sql.Request(sqlMassageType);
                request.input('id', sql.Int, req.params.massageTypeId);
                request.query(`SELECT id
                                ,type
                                ,venue
                                ,header
                                ,description
                                ,session_time
                                ,title
                                ,details
                                ,cost
                                FROM MassageTypes
                                WHERE id = @id`
                ).then(function (recordset) {
                    if (recordset.length > 0) {
                        res.json(recordset);
                    }
                    else {
                        res.status(500).send("No MassageType found with this ID.");
                    }
                }).catch(function (err) {
                    console.log("MassageType: " + err);
                });
            });
        })
        .delete(function (req, res) {
            const sqlDeleteMassageType = new sql.Connection(dbconfig, function (err) {
                let request = new sql.Request(sqlDeleteMassageType);
                request.input('id', sql.Int, req.params.massageTypeId);
                request.query(
                    `DELETE FROM MassageTypes
                     WHERE id = @id`
                ).then(res.status(201).send("MassageType has been deleted.")).catch(function (err) {
                    console.log("delete MassageType: " + err);
                });
            });
        });

    return massageTypeRouter;
};

module.exports = massageTypeRoutes;

export default massageTypeRoutes;
