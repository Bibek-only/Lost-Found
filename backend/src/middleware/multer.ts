import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //distination wher the file is saved
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // set up the file name
  },
});

const upload = multer({
  storage,
});

export default upload;
