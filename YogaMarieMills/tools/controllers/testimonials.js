import express from 'express';
import sql from 'mssql';

let testimonialRoutes = function () {

    const testimonialRouter = express.Router();
    const dbconfig = "mssql://Application:!Testing123@BPHSERVER/YogaMarieMills";

    testimonialRouter.route('/testimonials')
        .post(function (req, res) {
            let testimonial = (req.body);
            for (let prop in testimonial.testimonial_details) {
                if (testimonial.testimonial_details.hasOwnProperty(prop)) {
                    const sqlInsertTestimonial = new sql.Connection(dbconfig, function (err) {
                        let request = new sql.Request(sqlInsertTestimonial);
                        request.input('type', sql.VarChar, testimonial.type);
                        request.input('testimonial', sql.VarChar, testimonial.testimonial);
                        request.input('name', sql.VarChar, testimonial.name);
                        request.query(
                            `INSERT INTO Testimonials (type, testimonial, name)
                             VALUES (@type, @testimonial, @name)`
                        ).then(res.status(201).send(testimonial)).catch(function (err) {
                            console.log("insert testimonial: " + err);
                        });
                    });
                }
            }
        })
        .put(function (req, res) {
            let testimonial = (req.body);
            const sqlUpdateConsultation = new sql.Connection(dbconfig, function (err) {
                let request = new sql.Request(sqlUpdateConsultation);
                request.input('short', sql.VarChar, testimonial.short);
                request.input('description', sql.VarChar, testimonial.description);
                request.input('type', sql.VarChar, 'Testimonial');
                request.query(
                    `UPDATE Headers 
                     SET short = @short
                     ,description = @description
                     FROM Headers
                     WHERE type = @type;`
                ).then(function (recordset) {
                    for (let prop in testimonial.testimonial_details) {
                        if (testimonial.testimonial_details.hasOwnProperty(prop)) {
                            const sqlUpdateTestimonial = new sql.Connection(dbconfig, function (err) {
                                let request = new sql.Request(sqlUpdateTestimonial);
                                request.input('id', sql.Int, testimonial.testimonial_details[prop].id);
                                request.input('testimonial', sql.VarChar, testimonial.testimonial_details[prop].testimonial);
                                request.input('name', sql.VarChar, testimonial.testimonial_details[prop].name);
                                request.query(
                                   `UPDATE Testimonials
                                    SET testimonial = @testimonial
                                    ,name = @name
                                    WHERE id = @id`
                                ).then(
                                    console.log(testimonial.testimonial_details[prop])
                                    ).catch(function (err) {
                                        console.log("update testimonial: " + err);
                                    });
                            });
                        }
                    }
                }).catch(function (err) {
                    console.log("massageType: " + err);
                });
            });
        })
        .delete(function (req, res) {
            const sqlDeleteTestimonial = new sql.Connection(dbconfig, function (err) {
                let request = new sql.Request(sqlDeleteTestimonial);
                request.input('id', sql.Int, req.body.id);
                request.query(
                    `DELETE FROM Testimonials
                     WHERE id = @id`
                ).then(res.status(201).send("Testimonial has been deleted.")).catch(function (err) {
                    console.log("delete testimonial: " + err);
                });
            });
        })
        .get(function (req, res) {
            const sqlTestimonials = new sql.Connection(dbconfig, function (err) {
                let request = new sql.Request(sqlTestimonials);
                request.query(
                    `SELECT
                        H.id
                        ,H.type
                        ,H.short AS short
                        ,H.header AS header
                        ,H.description AS description
                        ,NULL AS testimonial
                        ,NULL AS name
                        FROM Headers H
                        WHERE H.type IN (SELECT T.type FROM Testimonials T)

                        UNION ALL

                        SELECT T.id AS id
                        ,T.type AS type
                        ,NULL as short
                        ,NULL as header
                        ,NULL as description
                        ,T.testimonial AS testimonial
                        ,T.name AS name
                        FROM Testimonials T`
                ).then(function (recordset) {
                    let testimonials = {
                        header: recordset[0].header,
                        short: recordset[0].short,
                        description: recordset[0].description,
                        testimonial_details: []
                    };
                    for (let testimonialProp in recordset) {
                        if (recordset.hasOwnProperty(testimonialProp)) {
                            if (recordset[testimonialProp].testimonial != null) {
                                let testimonial = {
                                    id: recordset[testimonialProp].id,
                                    type: recordset[testimonialProp].type,
                                    testimonial: recordset[testimonialProp].testimonial,
                                    name: recordset[testimonialProp].name
                                };
                                testimonials.testimonial_details.push(testimonial);
                            }
                        }
                    }
                    res.json(testimonials);
                }).catch(function (err) {
                    console.log("testimonials: " + err);
                });
            });
        });

    testimonialRouter.route('/testimonials/:testimonialId')
        .get(function (req, res) {
            const sqlTestimonials = new sql.Connection(dbconfig, function (err) {
                let request = new sql.Request(sqlTestimonials);
                request.query(
                    `SELECT id
                    ,type
                    ,testimonial
                    ,name
                    FROM Testimonials`
                ).then(function (recordset) {
                    res.json(recordset);
                }).catch(function (err) {
                    console.log("testimonials: " + err);
                });
            });
        })
        .delete(function (req, res) {
            const sqlDeleteTestimonial = new sql.Connection(dbconfig, function (err) {
                let request = new sql.Request(sqlDeleteTestimonial);
                request.input('id', sql.Int, req.params.testimonialId);
                request.query(
                    `DELETE FROM Testimonials
                     WHERE id = @id`
                ).then(res.status(201).send("Testimonial has been deleted.")).catch(function (err) {
                    console.log("delete testimonial: " + err);
                });
            });
        });

    return testimonialRouter;
};

module.exports = testimonialRoutes;

export default testimonialRoutes;
