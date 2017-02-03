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
const dbconfig = "mssql://Application:!Testing123@BPHSERVER/YogaMarieMills"

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

const apiRouter = express.Router();

apiRouter.get('/consultations', function (req, res) {
    const sqlConsultations = new sql.Connection(dbconfig, function(err) {
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
                console.log("consultations: " + err)
            });
        })
    });

apiRouter.get('/blogs',function (req, res) {
    const sqlBlogs = new sql.Connection(dbconfig, function(err) {
        let request = new sql.Request(sqlBlogs);
        request.query('select * from Blogs').then(function (recordset) {
                res.json(recordset);
            }).catch(function (err) {
                console.log("blogs: " + err)
            });
        })
    });



apiRouter.route('/classTypes')
    .get(function (req, res) {
        const sqlClassTypes = new sql.Connection(dbconfig, function(err) {
        let request = new sql.Request(sqlClassTypes);
        request.query('select * from ClassTypes').then(function (recordset) {
                res.json(recordset);
            }).catch(function (err) {
            });
        })
    });


apiRouter.route('/costs')
    .get(function (req, res) {
        const sqlCosts = new sql.Connection(dbconfig, function(err) {
        let request = new sql.Request(sqlCosts);
        request.query('select * from Costs').then(function (recordset) {
                res.json(recordset);
            }).catch(function (err) {
            });
        })
    });


apiRouter.route('/events')
    .get(function (req, res) {
       const sqlEvents = new sql.Connection(dbconfig, function(err) {
        let request = new sql.Request(sqlEvents);
        request.query(
                `select E.id AS id
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
            });
        })
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
