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

apiRouter.route('/blog')
    .get(function(req,res){
        sql.connect(dbconfig).then(function() {
            new sql.Request().query('select * from Blogs').then(function(recordset) {
                res.json(recordset); 
            }).catch(function(err) {
            });
        }).catch(function(err) {
        });
    });

apiRouter.route('/classTypes')
    .get(function(req,res){
        sql.connect(dbconfig).then(function() {
            new sql.Request().query('select * from ClassTypes').then(function(recordset) {
                res.json(recordset); 
            }).catch(function(err) {
            });
        }).catch(function(err) {
        });
    });

apiRouter.route('/costs')
    .get(function(req,res){
        sql.connect(dbconfig).then(function() {
            new sql.Request().query('select * from Costs').then(function(recordset) {
                res.json(recordset); 
            }).catch(function(err) {
            });
        }).catch(function(err) {
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
