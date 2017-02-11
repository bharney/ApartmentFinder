import express from 'express';
import sql from 'mssql';

let testimonialRoutes = function () {

    const testimonialRouter = express.Router();
    const dbconfig = "mssql://Application:!Testing123@BPHSERVER/YogaMarieMills";

    testimonialRouter.route('/testimonials')
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
    return testimonialRouter
};

module.exports = testimonialRoutes;

export default testimonialRoutes;
