import express from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer'

let upload = multer({ dest: '../../src/images/uploads/' });

let uploadRoute = function () {

    const uploadRouter = express.Router();

    uploadRouter.post('/uploads', upload.single('file'), function (req, res, next) {
        var file = __dirname + "/uploads/" + req.file.originalname;
        let response;
        fs.readFile(req.file.path, function (err, data) {
            fs.writeFile(file, data, function (err) {
                if (err) {
                    console.error(err);
                    response = {
                        message: 'Sorry, file couldn\'t be uploaded.',
                        filename: req.file.originalname
                    };
                } else {
                    response = {
                        message: 'File uploaded successfully',
                        filename: req.file.originalname
                    };
                }
                console.log(JSON.stringify(response));
                res.end(JSON.stringify(response));
            });
        });
    })


    return uploadRouter;
};

module.exports = uploadRoute;

export default uploadRoute;



    // const tempPath = req.file.name,
    //     targetPath = path.resolve('../src/images/uploads/' + req.file.name);
    // console.log("targetPath: " + targetPath);
    // if (path.extname(req.file.name).toLowerCase() === '.png' ||
    //     path.extname(req.file.name).toLowerCase() === '.jpg' ||
    //     path.extname(req.file.name).toLowerCase() === '.gif') {

    //     fs.rename(tempPath, targetPath, function (err) {
    //         console.log("Upload completed!");
    //     });
    // } else {
    //     fs.unlink(tempPath, function () {
    //         console.log("Only .png, .jpg, and .gif files are allowed!");
    //     });
    // }