import express from 'express';
import sql from 'mssql';

let scheduleRoutes = function () {

    const scheduleRouter = express.Router();
    const dbconfig = "mssql://Application:!Testing123@BPHSERVER/YogaMarieMills";

    scheduleRouter.route('/schedules')
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


    return scheduleRouter
};

module.exports = scheduleRoutes;

export default scheduleRoutes;