import express from 'express';
import sql from 'mssql';

let testimonialRoutes = function () {

    const testimonialRouter = express.Router();
    const dbconfig = "mssql://Application:!Testing123@BPHSERVER/YogaMarieMills";

    testimonialRouter.route('/testimonials')
        .post(function (req, res) {
            let testimonial = (req.body);
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
        })
        .put(function (req, res) {
            let testimonial = (req.body);
            const sqlUpdateTestimonial = new sql.Connection(dbconfig, function (err) {
                let request = new sql.Request(sqlUpdateTestimonial);
                request.input('id', sql.Int, testimonial.id);
                request.input('type', sql.VarChar, testimonial.type);
                request.input('testimonial', sql.VarChar, testimonial.testimonial);
                request.input('name', sql.VarChar, testimonial.name);
                request.query(
                    `UPDATE Testimonials
                    SET type = @type
                    ,testimonial = @testimonial
                    ,name = @name
                    WHERE id = @id`
                ).then(res.status(201).send(testimonial)).catch(function (err) {
                    console.log("update testimonial: " + err);
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
                        ,H.venue AS venue
                        ,H.header AS header
                        ,H.description AS description
                        ,NULL AS testimonial
                        ,NULL AS name
                        FROM Headers H
                        WHERE H.type IN (SELECT T.type FROM Testimonials T)

                        UNION ALL

                        SELECT T.id AS id
                        ,T.type AS type
                        ,NULL as venue
                        ,NULL as header
                        ,NULL as description
                        ,T.testimonial AS testimonial
                        ,T.name AS name
                        FROM Testimonials T`
                ).then(function (recordset) {
                    let testimonials = {
                        header: recordset[0].header,
                        venue: recordset[0].venue,
                        description: recordset[0].description,
                        testimonial_details: []
                    };
                    for (let testimonialProp in recordset) {
                        if (recordset.hasOwnProperty(testimonialProp)) {
                            if (recordset[testimonialProp].testimonial != null) {
                                let testimonial = {
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
