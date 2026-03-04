const express = require('express');
const songRouter = express.Router();


const { upload } = require('../middlewares/upload.middleware');
const  { uploadSong ,getSong } = require('../controllers/song.controller');



songRouter.post("/", upload.single("song"), uploadSong);

songRouter.get("/", getSong);

module.exports = songRouter;