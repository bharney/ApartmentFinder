import express from 'express';
import sql from 'mssql';

let consultationRoutes = function () {

    const consultationRouter = express.Router();
    const dbconfig = "mssql://Application:!Testing123@BPHSERVER/YogaMarieMills";

    consultationRouter.route('/consultations')
        .post(function (req, res) {
            let consultation = (req.body);
            const sqlInsertConsultation = new sql.Connection(dbconfig, function (err) {
                let request = new sql.Request(sqlInsertConsultation);
                request.input('type', sql.VarChar, consultation.type);
                request.input('header', sql.VarChar, consultation.header);
                request.input('short', sql.VarChar, consultation.short);
                request.input('description', sql.VarChar, consultation.description);
                request.input('venue', sql.VarChar, consultation.venue);
                request.input('title', sql.VarChar, consultation.consultationDetails.title);
                request.input('session_time', sql.VarChar, consultation.consultationDetails.session_time);
                request.input('consultation', sql.VarChar, consultation.consultationDetails.consultation);
                request.input('consultation_desc', sql.VarChar, consultation.consultationDetails.consultation_desc);
                request.input('cost', sql.VarChar, consultation.consultationDetails.cost);
                request.query(
                    `INSERT INTO Consultations (title, session_time, short, description, cost)
                    VALUES (@title, @session_time, @consultation, @consultation_desc, @cost); 

                    UPDATE header 
                    SET header = @header
                    ,short = @short
                    ,description = @description
                    ,venue = @venue
                    WHERE type = @type`
                ).then(res.status(201).send(consultation)).catch(function (err) {
                    console.log("insert Consultations: " + err);
                });
            });
        })
        .put(function (req, res) {
            let consultation = (req.body);
            const sqlUpdateConsultation = new sql.Connection(dbconfig, function (err) {
                let request = new sql.Request(sqlUpdateConsultation);
                request.input('header', sql.VarChar, consultation.header);
                request.input('short', sql.VarChar, consultation.short);
                request.input('description', sql.VarChar, consultation.description);
                request.input('venue', sql.VarChar, consultation.venue);
                request.input('ID', sql.Int, consultation.consultationDetails.id);
                request.input('title', sql.VarChar, consultation.consultationDetails.title);
                request.input('session_time', sql.VarChar, consultation.consultationDetails.session_time);
                request.input('consultation', sql.VarChar, consultation.consultationDetails.consultation);
                request.input('consultation_desc', sql.VarChar, consultation.consultationDetails.consultation_desc);
                request.input('cost', sql.VarChar, consultation.consultationDetails.cost);
                request.query(
                    `UPDATE Consultations 
                     SET title = @title
                     , session_time = @session_time
                     , short = @consultation
                     , description = @consultation_desc
                     , cost = @cost
                     WHERE id = @id; 

                    UPDATE header 
                    SET header = @header
                    ,short = @short
                    ,description = @description
                    ,venue = @venue
                    WHERE type = @type`
                ).then(res.status(201).send(consultation)).catch(function (err) {
                    console.log("update Consultations: " + err);
                });
            });
        })
        .delete(function (req, res) {
            const sqlDeleteConsultation = new sql.Connection(dbconfig, function (err) {
                let request = new sql.Request(sqlDeleteConsultation);
                request.input('id', sql.Int, req.body.id);
                request.query(
                    `DELETE FROM Consultations
                     WHERE id = @id`
                ).then(res.status(201).send("Consultation has been deleted.")).catch(function (err) {
                    console.log("delete Consultation: " + err);
                });
            });
        })
        .get(function (req, res) {
            const sqlConsultations = new sql.Connection(dbconfig, function (err) {
                let request = new sql.Request(sqlConsultations);
                request.query(
                    `SELECT C.id AS id
                    ,C.type AS type
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

    consultationRouter.route('/consultations/:consultationId')
        .get(function (req, res) {
            const sqlConsultation = new sql.Connection(dbconfig, function (err) {
                let request = new sql.Request(sqlConsultation);
                request.input('id', sql.Int, req.params.consultationId);
                request.query(`SELECT id
                                ,type
                                ,session_time
                                ,title
                                ,consultation
                                ,consultation_desc
                                ,cost
                                FROM consultations
                                WHERE id = @id`
                ).then(function (recordset) {
                    if (recordset.length > 0) {
                        res.json(recordset);
                    }
                    else {
                        res.status(500).send("No Consultation found with this ID.");
                    }
                }).catch(function (err) {
                    console.log("Consultation: " + err);
                });
            });
        })
        .delete(function (req, res) {
            const sqlDeleteConsultation = new sql.Connection(dbconfig, function (err) {
                let request = new sql.Request(sqlDeleteConsultation);
                request.input('id', sql.Int, req.params.consultationId);
                request.query(
                    `DELETE FROM Consultations
                     WHERE id = @id`
                ).then(res.status(201).send("Consultation has been deleted.")).catch(function (err) {
                    console.log("delete Consultation: " + err);
                });
            });
        })

    return consultationRouter
};

module.exports = consultationRoutes;

export default consultationRoutes;
