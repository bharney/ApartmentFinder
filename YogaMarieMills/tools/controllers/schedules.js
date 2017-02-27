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
                request.input('session_date', sql.Date, schedule.session_date);
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
                        ,H.type AS type
                        ,H.venue AS venue
                        ,H.header AS header
                        ,H.description AS description
                        ,NULL AS session_date
                        ,NULL AS DateSort
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
                        ,DATENAME(DW, S.session_date) + ' ' + CONVERT(VARCHAR, S.session_date, 107) AS session_date
                        ,S.session_date as DateSort
                        ,NULL AS session_time
                        ,NULL AS class
                        ,NULL AS parent_id
                        FROM Schedules S
                        WHERE session_date >= GETDATE()
                                                

                        UNION ALL

                        SELECT 
                        D.id
                        ,D.type AS type
                        ,NULL as venue
                        ,NULL as header
                        ,NULL as description
                        ,NULL AS session_date
                        ,NULL AS DateSort
                        ,D.session_time AS session_time
                        ,D.class AS class
                        ,D.parent_id AS parent_id
                        FROM ScheduleDetails D
                        ORDER BY header desc, DateSort`
                ).then(function (recordset) {
                    let schedulePage = {
                        id: recordset[0].id,
                        type: recordset[0].type,
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
                                    id: recordset[date_prop].id,
                                    type: recordset[date_prop].type,
                                    session_date: recordset[date_prop].session_date,
                                    session_details: []
                                };
                                schedulePage.session_dates.push(session_dates);

                                for (let time_prop in recordset) {
                                    if (recordset.hasOwnProperty(time_prop)) {
                                        if (recordset[time_prop].session_time != null) {
                                            if (recordset[date_prop].id == recordset[time_prop].parent_id) {
                                                let session_details = {
                                                    id: recordset[time_prop].id,
                                                    type: recordset[time_prop].type,
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
                request.query(`SELECT
                        S.id
                        ,S.type AS type
                        ,DATENAME(DW, S.session_date) + ' ' + CONVERT(VARCHAR, S.session_date, 107) AS session_date
                        ,NULL AS session_time
                        ,NULL AS class
                        ,NULL AS parent_id
                        FROM Schedules S
                        WHERE id = @id

                        UNION ALL

                        SELECT 
                        D.id
                        ,D.type AS type
                        ,NULL AS session_date
                        ,D.session_time AS session_time
                        ,D.class AS class
                        ,D.parent_id AS parent_id
                        FROM ScheduleDetails D
                        WHERE parent_id = @id`
                ).then(function (recordset) {
                    if (recordset.length > 0) {
                        let session_dates = {
                            id: recordset[0].id,
                            session_date: recordset[0].session_date,
                            session_details: []
                        };
                        for (let time_prop in recordset) {
                            if (recordset.hasOwnProperty(time_prop)) {
                                if (recordset[time_prop].session_time != null) {
                                    let session_details = {
                                        id: recordset[time_prop].id,
                                        session_time: recordset[time_prop].session_time,
                                        class: recordset[time_prop].class
                                    };
                                    session_dates.session_details.push(session_details);
                                }
                            }
                        }

                        res.json(session_dates);
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