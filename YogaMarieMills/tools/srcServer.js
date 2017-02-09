import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import sql from 'mssql';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);
const dbconfig = "mssql://Application:!Testing123@BPHSERVER/YogaMarieMills";

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

const apiRouter = express.Router();

apiRouter.route('/blogs')
    .post(function (req, res) {
        let blog = {
               id : 0, 
               title: "",
               short: "", 
               description: "", 
               image: "", 
               href: "", 
               type: "", 
               component: ""
        };
        const sqlInsertBlog = new sql.Connection(dbconfig, function (err) {
            let request = new sql.Request(sqlInsertBlog);
            request.input('id', sql.Int, blog.id);
            request.input('title', sql.VarChar, blog.title);
            request.input('short', sql.VarChar, blog.short);
            request.input('description', sql.VarChar, blog.description);
            request.input('image', sql.VarChar, blog.image);
            request.input('href', sql.VarChar, blog.href);
            request.input('type', sql.VarChar, blog.type);
            request.input('component', sql.VarChar, blog.component);
            request.query(
               `INSERT INTO Blogs (id, title, short, description, image, href, type, component)
                VALUES (@id, @title, @short, @description, @image, @href, @type, @component)`
            ).then(function (recordset) {
                console.log(recordset);
                res.json(recordset);
            }).catch(function (err) {
                console.log("insert schedules: " + err);
            });
        });
    })
    .get(function (req, res) {
        const sqlBlogs = new sql.Connection(dbconfig, function (err) {
            let request = new sql.Request(sqlBlogs);
            request.query(`SELECT id
                            ,title
                            ,short
                            ,description
                            ,image
                            ,href
                            ,type
                            ,component
                            FROM Blogs`
            ).then(function (recordset) {
                res.json(recordset);
            }).catch(function (err) {
                console.log("blogs: " + err);
            });
        });
    });

apiRouter.route('/consultations')
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

apiRouter.route('/classTypes')
    .get(function (req, res) {
        const sqlClassTypes = new sql.Connection(dbconfig, function (err) {
            let request = new sql.Request(sqlClassTypes);
            request.query('select * from ClassTypes').then(function (recordset) {
                res.json(recordset);
            }).catch(function (err) {
                console.log("classTypes: " + err);
            });
        });
    });


apiRouter.route('/costs')
    .get(function (req, res) {
        const sqlCosts = new sql.Connection(dbconfig, function (err) {
            let request = new sql.Request(sqlCosts);
            request.query('SELECT * FROM Costs').then(function (recordset) {
                res.json(recordset);
            }).catch(function (err) {
                console.log("costs: " + err);
            });
        });
    });


apiRouter.route('/events')
    .get(function (req, res) {
        const sqlEvents = new sql.Connection(dbconfig, function (err) {
            let request = new sql.Request(sqlEvents);
            request.query(
                `SELECT E.id AS id
                ,E.type AS type
                ,H.header AS header
                ,H.short AS short
                ,H.description AS description 
                ,H.venue AS venue
                ,E.time AS session_time
                ,E.title AS title
                ,E.description AS description
                ,E.cost AS cost
                FROM Headers H
                JOIN EventTypes E
                ON H.type = E.type`
            ).then(function (recordset) {
                res.json(recordset);
            }).catch(function (err) {
                console.log("events: " + err);
            });
        });
    });

apiRouter.route('/massageTypes')
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


apiRouter.route('/schedules')
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


apiRouter.route('/testimonials')
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

apiRouter.route('/navbars')
    .get(function (req, res) {
        const sqlNavbars = new sql.Connection(dbconfig, function (err) {
            let request = new sql.Request(sqlNavbars);
            request.query(
                `SELECT id
                 ,type
                 ,name
                 ,href
                 ,route
                 ,parent_id
                 FROM Navbar_Items`
            ).then(function (recordset) {
                let navbar_items = [];

                for (let navbar_prop in recordset) {
                    if (recordset.hasOwnProperty(navbar_prop)) {
                        if (recordset[navbar_prop].parent_id == null) {
                            let submenu_items = [];
                            navbar_items.push({
                                id: recordset[navbar_prop].id,
                                name: recordset[navbar_prop].name,
                                href: recordset[navbar_prop].href,
                                route: recordset[navbar_prop].route,
                                subMenu: submenu_items
                            });
                            for (let submenu_prop in recordset) {
                                if (recordset.hasOwnProperty(submenu_prop)) {
                                    if (recordset[submenu_prop].parent_id != null) {
                                        if (recordset[navbar_prop].id == recordset[submenu_prop].parent_id) {
                                            submenu_items.push({
                                                id: recordset[submenu_prop].id,
                                                name: recordset[submenu_prop].name,
                                                href: recordset[submenu_prop].href,
                                                route: recordset[submenu_prop].route,
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                res.json(navbar_items);
            }).catch(function (err) {
                console.log("navbars: " + err);
            });
        });
    });


app.use('/api', apiRouter);

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, function (err) {
    if (err) {
        console.log(err);
    } else {
        open(`http://localhost:${port}`);
    }
});
