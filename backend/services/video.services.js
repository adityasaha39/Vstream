const Videos = require("../models/video.model");

class VideoService {
  findAll = async () => {
    const allVideos = await Videos.find({});
    return allVideos;
  };

  findOneById = async (req, res) => {
    const Video = await Videos.findById(req.params.id);
    if (Video === null) {
      res.status(404).send({
        code: 404,
        message: "No video found with matching id",
        stack: "Error: No video found with matching id\n    at ....",
      });
    } else {
      res.send(Video);
    }
  };

  findOnQuery = async (findArray, orderBy) => {
    if (findArray.length === 0) {
      const allVideos = await Videos.find({}).sort(orderBy);
      return allVideos;
    } else if (Object.keys(orderBy).length === 0) {
      const allVideos = await Videos.find({ $and: findArray });
      return allVideos;
    } else {
      const allVideos = await Videos.find({
        $query: { $and: findArray }
      }).sort(orderBy);
      return allVideos;
    }
  };

  create = async (body) => {
    const newVideo = new Videos(body);
    const saveVideo = await newVideo.save();
    return saveVideo;
  };

  updateVotes = async (id, updateObj) => {
    const filter = { _id: id };
    const updatedDoc = await Videos.updateOne(filter, updateObj);
    return updatedDoc;
  };

  updateViews = async (id, updateObj) => {
    const filter = { _id: id };
    const updatedDoc = await Videos.updateOne(filter, updateObj);
    return updatedDoc;
  }
}

module.exports = VideoService;
