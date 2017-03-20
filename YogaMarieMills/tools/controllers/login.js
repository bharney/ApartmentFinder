import express from 'express';
import sql from 'mssql';
import secret from '../../secrets';
import jwt from 'jwt-simple';
import bcrypt from 'bcrypt-nodejs';

let loginRoutes = function () {

    const loginRouter = express.Router();
    const dbconfig = "mssql://Application:!Testing123@BPHSERVER/YogaMarieMills";

    function createToken(user, res, req) {
        console.log("user: " + user);
        console.log("res: " + res);
        console.log("req: " + req);
        const payload = {
            iss: req.hostname,
            sub: user.emailAddress
        }
        console.log("payload: " + payload);
        const token = jwt.encode(payload, secret);
        console.log("token: " + token);
        res.status(200).send({
            user: user,
            token: token
        });
    }

    loginRouter.route('/login')
        .post(function (req, res) {
            let user = (req.body);
            const sqlAuthorize = new sql.Connection(dbconfig, function (err) {
                let request = new sql.Request(sqlAuthorize);
                request.input('emailAddress', sql.VarChar, user.emailAddress);
                request.query(`SELECT top 1 id
                                ,emailAddress
                                ,password
                                ,firstName
                                ,lastName
                                FROM Users
                                WHERE emailAddress = @emailAddress`
                ).then(function (recordset) {
                    console.log(recordset);
                    if (recordset[0].emailAddress) {

                        bcrypt.compare(user.password, recordset[0].password, function (err, isMatch) {
                            if (err) return;

                            console.log("user.password: " + user.password);
                            console.log("recordset.password " + recordset[0].password);
                            console.log("isMatch: " + isMatch);
                            if (!isMatch) {
                                res.status(401).send("Email Address or Password is incorrect.")
                            } else {
                                console.log("PrecreateToken");
                                createToken(recordset, res, req)
                                console.log("PostcreateToken");
                            }
                        });
                    }
                    else {
                        res.status(401).send("Email Address or Password is incorrect.");
                    }
                }).catch(function (err) {
                    console.log("login: " + err);
                });
            });
        });

    return loginRouter;
};

module.exports = loginRoutes;

export default loginRoutes;
