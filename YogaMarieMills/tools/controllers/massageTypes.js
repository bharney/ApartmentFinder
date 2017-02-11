import express from 'express';
import sql from 'mssql';

let massageTypeRoutes = function () {

    const massageTypeRouter = express.Router();
    const dbconfig = "mssql://Application:!Testing123@BPHSERVER/YogaMarieMills";

    massageTypeRouter.route('/massageTypes')
        .get(function (req, res) {
            const sqlMassageTypes = new sql.Connection(dbconfig, function (err) {
                let request = new sql.Request(sqlMassageTypes);
                request.query(
                    `SELECT
				  H.id
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


    return massageTypeRouter
};

module.exports = massageTypeRoutes;

export default massageTypeRoutes;
