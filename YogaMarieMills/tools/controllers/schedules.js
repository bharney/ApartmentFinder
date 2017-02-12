import express from 'express';
import sql from 'mssql';

let scheduleRoutes = function () {

    const scheduleRouter = express.Router();
    const dbconfig = "mssql://Application:!Testing123@BPHSERVER/YogaMarieMills";

    scheduleRouter.route('/schedules')

        .post(function (req, res) {
            let schedule = (req.body);
            const sqlInsertSchedule = new sql.Connection(dbconfig, function (err) {
                let request = new sql.Request(sqlInsertSchedule);
                request.input('type', sql.VarChar, schedule.type);
                request.input('session_date', sql.VarChar, schedule.session_date);
                request.query(
                    `INSERT INTO Schedules (type, session_date)
                     VALUES (@type, @session_date); 
                     SELECT SCOPE_IDENTITY() AS parent_id;`
                ).then(function (recordset) {
                    for (let prop in schedule.times) {
                        if (recordset.hasOwnProperty(prop)) {
                            const sqlInsertScheduleDetails = new sql.Connection(dbconfig, function (err) {
                                let request = new sql.Request(sqlInsertScheduleDetails);
                                request.input('parent_id', sql.VarChar, recordset[0].parent_id);
                                request.input('type', sql.VarChar, schedule.times[prop].type);
                                request.input('session_time', sql.VarChar, schedule.times[prop].session_time);
                                request.input('class', sql.VarChar, schedule.times[prop].class);
                                request.query(
                                    `INSERT INTO ScheduleDetails (type, session_time, class, parent_id)
                                VALUES (@detailType, @session_time, @class, @parent_id);`
                                ).then(
                                    console.log(schedule.times[prop])
                                    ).catch(function (err) {
                                        console.log("scheduleDetails: " + err);
                                    });
                            });
                        }
                    }
                }).catch(function (err) {
                    console.log("schedules: " + err);
                });
            });
        })
        .put(function (req, res) {
            let schedule = (req.body);
            const sqlUpdateSchedule = new sql.Connection(dbconfig, function (err) {
                let request = new sql.Request(sqlUpdateSchedule);
                request.input('id', sql.Int, schedule.id);
                request.input('type', sql.VarChar, schedule.type);
                request.input('session_date', sql.VarChar, schedule.session_date);
                request.query(
                    `UPDATE Schedules
                    SET session_date = @session_date
                    WHERE id = @id;`
                ).then(function (recordset) {
                    for (let prop in schedule.times) {
                        if (recordset.hasOwnProperty(prop)) {
                            const sqlInsertScheduleDetails = new sql.Connection(dbconfig, function (err) {
                                let request = new sql.Request(sqlInsertScheduleDetails);
                                request.input('session_time', sql.VarChar, schedule.times[prop].session_time);
                                request.input('class', sql.VarChar, schedule.times[prop].class);
                                request.query(
                                    `UPDATE ScheduleDetails
                                     SET session_time = @session_time
                                     ,class = @class`
                                ).then(console.log(schedule.times[prop])).catch(function (err) {
                                    console.log("scheduleDetails: " + err);
                                });
                            });
                        }
                    }
                }).catch(function (err) {
                    console.log("schedules: " + err);
                });
            });
        })
        .delete(function (req, res) {
            const sqlDeleteSchedule = new sql.Connection(dbconfig, function (err) {
                let request = new sql.Request(sqlDeleteSchedule);
                request.input('id', sql.Int, req.body.id);
                request.query(
                    `DELETE FROM Schedules
                     WHERE id = @id`
                ).then(res.status(201).send("Schedule has been deleted.")).catch(function (err) {
                    console.log("delete schedule: " + err);
                });
            });
        })
        .get(function (req, res) {
            const sqlSchedules = new sql.Connection(dbconfig, function (err) {
                let request = new sql.Request(sqlSchedules);
                request.query(
                    `SELECT
                        H.id
                        ,H.type
                        ,H.venue AS venue
                        ,H.header AS header
                        ,H.description AS description
                        ,NULL AS session_date
                        ,NULL AS session_time
                        ,NULL AS class
                        ,NULL AS parent_id
                        FROM Headers H
                        WHERE H.type IN (SELECT SC.type FROM Schedules SC)

                        UNION ALL

                        SELECT 
                        S.id
                        ,S.type AS type
                        ,NULL as venue
                        ,NULL as header
                        ,NULL as description
                        ,S.session_date AS session_date
                        ,NULL AS session_time
                        ,NULL AS class
                        ,NULL AS parent_id
                        FROM Schedules S

                        UNION ALL

                        SELECT 
                        D.id
                        ,D.type AS type
                        ,NULL as venue
                        ,NULL as header
                        ,NULL as description
                        ,NULL AS session_date
                        ,D.session_time AS session_time
                        ,D.class AS class
                        ,D.parent_id AS parent_id
                        FROM ScheduleDetails D`
                ).then(function (recordset) {
                    let schedulePage = {
                        header: recordset[0].header,
                        venue: recordset[0].venue,
                        description: recordset[0].description,
                        session_dates: []
                    };
                    let counter = 0;
                    for (let date_prop in recordset) {
                        if (recordset.hasOwnProperty(date_prop)) {
                            if (recordset[date_prop].session_date != null) {
                                let session_dates = {
                                    session_date: recordset[date_prop].session_date,
                                    session_details: []
                                };
                                schedulePage.session_dates.push(session_dates);

                                for (let time_prop in recordset) {
                                    if (recordset.hasOwnProperty(time_prop)) {
                                        if (recordset[time_prop].session_time != null) {
                                            if (recordset[date_prop].id == recordset[time_prop].parent_id) {
                                                let session_details = {
                                                    session_time: recordset[time_prop].session_time,
                                                    class: recordset[time_prop].class
                                                };
                                                schedulePage.session_dates[counter].session_details.push(session_details);
                                            }
                                        }
                                    }
                                }
                                counter++;
                            }
                        }
                    }
                    res.json(schedulePage);
                }).catch(function (err) {
                    console.log("schedules: " + err);
                });
            });
        });

    scheduleRouter.route('/schedules/:scheduleId')
        .get(function (req, res) {
            const sqlSchedule = new sql.Connection(dbconfig, function (err) {
                let request = new sql.Request(sqlSchedule);
                request.input('id', sql.Int, req.params.scheduleId);
                request.query(`SELECT id
                            ,title
                            ,short
                            ,description
                            ,image
                            ,href
                            ,type
                            ,component
                            FROM Schedules
                            WHERE id = @id`
                ).then(function (recordset) {
                    if (recordset.length > 0) {
                        res.json(recordset);
                    }
                    else {
                        res.status(500).send("No Schedule found with this ID.");
                    }
                }).catch(function (err) {
                    console.log("schedule: " + err);
                });
            });
        })
        .delete(function (req, res) {
            const sqlDeleteSchedule = new sql.Connection(dbconfig, function (err) {
                let request = new sql.Request(sqlDeleteSchedule);
                request.input('id', sql.Int, req.params.scheduleId);
                request.query(
                    `DELETE FROM Schedules
                     WHERE id = @id`
                ).then(res.status(201).send("Schedule has been deleted.")).catch(function (err) {
                    console.log("delete schedule: " + err);
                });
            });
        });

    return scheduleRouter;
};

module.exports = scheduleRoutes;

export default scheduleRoutes;