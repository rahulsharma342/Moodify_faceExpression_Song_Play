const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  mood: {
    type: String,
    required: true,
    enum:{
        values:["happy","sad","surprise","neutral"],
        message:"mood must be one of happy,sad,surprise,neutral"
    }
  },
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
