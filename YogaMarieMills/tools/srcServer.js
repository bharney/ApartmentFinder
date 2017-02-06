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

apiRouter.get('/consultations', function (req, res) {
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

apiRouter.get('/blogs', function (req, res) {
    const sqlBlogs = new sql.Connection(dbconfig, function (err) {
        let request = new sql.Request(sqlBlogs);
        request.query('SELECT * FROM Blogs').then(function (recordset) {
            res.json(recordset);
        }).catch(function (err) {
            console.log("blogs: " + err);
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
                let eventTypes = [];
                for (let eventProp in recordset) {
                    if (recordset.hasOwnProperty(eventProp)) {
                        eventTypes.push({
                            header: recordset[eventProp].header,
                            type: recordset[eventProp].type,
                            short: recordset[eventProp].short,
                            description: recordset[eventProp].description,
                            venue: recordset[eventProp].venue,
                            session_time: recordset[eventProp].session_time,
                            title: recordset[eventProp].title,
                            consultation: recordset[eventProp].description,
                            cost: recordset[eventProp].cost
                        });
                    }
                }
                res.json(eventTypes);
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
                `SELECT M.id AS id
                ,M.type AS type
                ,H.header AS header
                ,H.short AS short
                ,H.description AS description 
                ,H.venue AS venue
                ,M.session_time AS session_time
                ,M.title AS title
                ,M.description AS description
                ,M.cost AS cost
                FROM Headers H
                JOIN MassageTypes M
                ON H.type = M.type`
            ).then(function (recordset) {
                let lineItems = [];
                let massageDetails = [];
                let massageTypes = [];
                for (let messageType in recordset) {
                    if (recordset.hasOwnProperty(messageType)) {
                        switch (recordset[messageType].type) {
                            case "HeadHandsFeetAb":
                                for (let messageDetail in recordset) {
                                    if (recordset.hasOwnProperty(messageDetail)) {
                                        // for (let lineItem in recordset) {
                                        //     if (recordset.hasOwnProperty(lineItem)) {
                                        //         lineItems.push({
                                        //             detail: recordset[lineItem].detail,
                                        //         });
                                        //     }
                                        // }
                                        massageDetails.push({
                                            session_time: recordset[messageDetail].session_time,
                                            title: recordset[messageDetail].title,
                                            description: recordset[messageDetail].description,
                                            cost: recordset[messageDetail].cost
                                            //,lineItems: lineItems
                                        });
                                    }
                                }
                                massageTypes = {
                                    header: recordset[messageType].header,
                                    short: recordset[messageType].short,
                                    description: recordset[messageType].description,
                                    venue: recordset[messageType].venue,
                                    massageDetails: massageDetails
                                };

                                break;
                            case "Body":
                                for (let messageDetail in recordset) {
                                    if (recordset.hasOwnProperty(messageDetail)) {
                                        // for (let lineItem in recordset) {
                                        //     if (recordset.hasOwnProperty(lineItem)) {
                                        //         lineItems.push({
                                        //             detail: recordset[lineItem].detail,
                                        //         });
                                        //     }
                                        // }
                                        massageDetails.push({
                                            session_time: recordset[messageDetail].session_time,
                                            title: recordset[messageDetail].title,
                                            description: recordset[messageDetail].description,
                                            cost: recordset[messageDetail].cost
                                            //,lineItems: lineItems
                                        });
                                    }
                                }
                                massageTypes.push({
                                    header: recordset[messageType].header,
                                    short: recordset[messageType].short,
                                    description: recordset[messageType].description,
                                    venue: recordset[messageType].venue,
                                    massageDetails: massageDetails
                                });
                                break;
                            default:
                                break;
                        }
                    }
                }
                res.json(massageTypes);
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
                `SELECT S.id AS id
                 ,S.type AS type
                 ,H.venue AS venue
                 ,H.header AS header
                 ,H.description AS description
                 ,S.session_date AS session_date
                 ,D.session_time AS session_time
                 ,D.class AS class
                 FROM Schedules S
                 JOIN ScheduleDetails D
                 ON S.id = D.id
                 JOIN Headers H
                 ON S.type = H.type`
            ).then(function (recordset) {
                let dates = [];
                let schedules = [];
                for (let dateProp in recordset) {
                    if (recordset.hasOwnProperty(dateProp)) {
                        for (let prop in recordset) {
                            if (recordset.hasOwnProperty(prop)) {
                                schedules.push({
                                    session_time: recordset[prop].session_time,
                                    title: recordset[prop].title,
                                    description: recordset[prop].description,
                                    cost: recordset[prop].cost
                                });
                            }
                        }
                        dates.push({
                            session_time: recordset[dateProp].header,
                            class: recordset[dateProp].class,
                            schedules: schedules
                        });
                    }
                }
                res.json(schedules);
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
                `SELECT T.id AS id
                ,T.type AS type
                ,H.header AS header
                ,H.short AS short
                ,H.description AS description 
                ,T.testimonial AS testimonial
                ,T.name AS name
                FROM Headers H
                JOIN Testimonials T
                ON H.type = T.type`
            ).then(function (recordset) {
                let testimonialDetails = [];
                for (let testimonialProp in recordset) {
                    if (recordset.hasOwnProperty(testimonialProp)) {
                        testimonialDetails.push({
                            testimonial: recordset[testimonialProp].testimonial,
                            name: recordset[testimonialProp].name,
                        });
                    }
                }

                let testimonials = {
                    header: recordset[0].header,
                    short: recordset[0].short,
                    description: recordset[0].description,
                    testimonialDetails: testimonialDetails
                };
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
                 ,name
                 ,route
                 ,parent_id
                 FROM Navbar_Items`
            ).then(function (recordset) {
                let navbar_items = [];
                let submenu_items = [];
                for (let navbar_prop in recordset) {
                    if (recordset.hasOwnProperty(navbar_prop)) {
                        if (recordset[navbar_prop].parentId != "") {
                            for (let submenu_prop in recordset) {
                                if (recordset.hasOwnProperty(submenu_prop)) {
                                    if (recordset[submenu_prop].id == recordset[navbar_prop].parentId) {
                                        submenu_items.push({
                                            id: recordset[submenu_prop].id,
                                            name: recordset[submenu_prop].name,
                                            href: recordset[submenu_prop].href,
                                            route: recordset[submenu_prop].route,
                                        });
                                    }
                                }
                            }
                            navbar_items.push({
                                id: recordset[navbar_prop].id,
                                name: recordset[navbar_prop].name,
                                href: recordset[navbar_prop].href,
                                route: recordset[navbar_prop].route,
                                submenu_items: submenu_items
                            });
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
