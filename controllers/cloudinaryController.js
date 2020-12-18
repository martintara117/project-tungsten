var cloudinary = require("cloudinary").v2;
const express = require("express");
const router = express.Router();

const multer = require("multer");
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single("image");
const DatauriParser = require("datauri/parser");
const parser = new DatauriParser();
// const aws = require('aws-sdk');

// // set your env variable CLOUDINARY_URL or set the following configuration
// TODO: Move these to environment variables
cloudinary.config({
  cloud_name: "dnmpdqhrd",
  // api_key: process.env.S3_KEY,
  // api_secret: process.env.S3_SECRET
  api_key: "959694383232459",
  api_secret: "Vyrs0bOFY1W87yax2JS8y2dJgK4",
});

// var myWidget = cloudinary.createUploadWidget(
//   {
//     cloudName: "dnmpdqhrd",
//     uploadPreset: "my_preset",
//   },
//   (error, result) => {
//     if (!error && result && result.event === "success") {
//       console.log("Done! Here is the image info: ", result.info);
//     }
//   }
// );

// document.getElementById("upload_widget").addEventListener(
//   "click",
//   function () {
//     myWidget.open();
//   },
//   false
// );
// let s3 = new aws.S3({
//   accessKeyId: process.env.S3_KEY,
//   secretAccessKey: process.env.S3_SECRET
// });

router.post("/cloudinary", multerUploads, (req, res) => {
  if (req.file) {
    const file = parser.format(req.file.originalname, req.file.buffer);

    cloudinary.uploader
      .upload(file.content)
      .then((response) => {
        console.log(response);
        res.json(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

module.exports = router;
