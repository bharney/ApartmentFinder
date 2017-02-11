import express from 'express';
import sql from 'mssql';

let navbarRoutes = function () {

    const navbarRouter = express.Router();
    const dbconfig = "mssql://Application:!Testing123@BPHSERVER/YogaMarieMills";

    navbarRouter.route('/navbars')
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
    return navbarRouter
};

module.exports = navbarRoutes;

export default navbarRoutes;
