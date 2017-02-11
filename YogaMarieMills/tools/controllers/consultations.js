import express from 'express';
import sql from 'mssql';

let consultationRoutes = function () {

    const consultationRouter = express.Router();
    const dbconfig = "mssql://Application:!Testing123@BPHSERVER/YogaMarieMills";

    consultationRouter.route('/consultations')
        .get(function (req, res) {
            const sqlConsultations = new sql.Connection(dbconfig, function (err) {
                let request = new sql.Request(sqlConsultations);
                request.query(
                    `SELECT C.id AS id
                ,H.header AS header
                ,H.short AS short
                ,H.description AS description 
                ,H.venue AS venue
                ,C.session_time AS session_time
                ,C.title AS title
                ,C.short AS consultation
                ,C.description AS consultation_desc
                ,C.cost AS cost
                FROM Headers H
                JOIN Consultations C
                ON H.type = C.type`
                ).then(function (recordset) {
                    let consultationDetails = [];
                    for (let consultationProp in recordset) {
                        if (recordset.hasOwnProperty(consultationProp)) {
                            consultationDetails.push({
                                session_time: recordset[consultationProp].session_time,
                                title: recordset[consultationProp].title,
                                consultation: recordset[consultationProp].consultation,
                                consultation_desc: recordset[consultationProp].consultation_desc,
                                cost: recordset[consultationProp].cost
                            });
                        }
                    }
                    let consultation = {
                        header: recordset[0].header,
                        short: recordset[0].short,
                        description: recordset[0].description,
                        venue: recordset[0].venue,
                        consultationDetails: consultationDetails
                    };
                    res.json(consultation);
                }).catch(function (err) {
                    console.log("consultations: " + err);
                });
            });
        });

    return consultationRouter
};

module.exports = consultationRoutes;

export default consultationRoutes;
