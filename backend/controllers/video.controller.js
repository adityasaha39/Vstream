const videoService = require("../services/video.services");
const videoServiceInstance = new videoService();
const mongoose = require("mongoose");

const getAllVideos = async (req, res) => {
  const { genres, contentRating, sortBy, title } = req.query;
  // console.log(genres, contentRating, sortBy, title, req.params);

  try {
    let findArray = [];
    let orderBy = {};

    if (genres !== undefined) {
      const genereArray = [
        "Education",
        "Sports",
        "Movies",
        "Comedy",
        "Lifestyle",
        "All",
      ];
      const paramGenere = genres.split(",");
      for (let i = 0; i < paramGenere.length; i++) {
        let flag = 0;
        for (let j = 0; j < genereArray.length; j++) {
          if (paramGenere[i] === genereArray[j]) {
            flag = 1;
            break;
          }
        }
        if (flag === 0) {
          res.status(400).send({
            code: 400,
            message:
              '"[0]" must be one of [Education, Sports, Movies, Comedy, Lifestyle, All]',
            stack:
              'Error: "[0]" must be one of [Education, Sports, Movies, Comedy, Lifestyle, All]\n    at ...',
          });
          return;
        }
      }
      let obj = {
        genre: {
          $in: paramGenere,
        },
      };
      findArray.push(obj);
    }
    if (contentRating !== undefined) {
      const contentRatingArray = ["Anyone", "7+", "12+", "16+", "18+"];
      let flag = 0;
      for (let i = 0; i < contentRatingArray.length; i++) {
        if (contentRatingArray[i] === contentRating) {
          flag = 1;
        }
      }
      if (flag === 0) {
        res.status(400).send({
          code: 400,
          message:
            '"contentRating" must be one of [Anyone, 7+, 12+, 16+, 18+, All]',
          stack:
            'Error: "contentRating" must be one of [Anyone, 7+, 12+, 16+, 18+, All]\n  at ...',
        });
        return;
      }
      let obj = {
        contentRating: contentRating,
      };
      findArray.push(obj);
    }
    if (sortBy !== undefined) {
      let flag = 0;
      if (sortBy === "viewCount") {
        flag = 1;
      } else if (sortBy === "releaseDate") {
        flag = 2;
      }

      if (flag === 0) {
        res.status(400).send({
          code: 400,
          message: '"sortBy" must be one of [viewCount, releaseDate]',
          stack:
            'Error: "sortBy" must be one of [viewCount, releaseDate]\n    at ...',
        });
        return;
      } else if (flag === 1) {
        orderBy = {
          viewCount: -1,
        };
      } else {
        orderBy = {
          releaseDate: -1,
        };
      }
    }
    if (title !== undefined) {
      let obj = {
        title: { $regex: new RegExp(title), $options: "gi" },
      };
      findArray.push(obj);
    }
    if (findArray.length === 0 && Object.keys(orderBy).length === 0) {
      const videos = await videoServiceInstance.findAll();
      res.send({ videos: videos });
    } else {
      // console.log(findArray, orderBy);
      const videos = await videoServiceInstance.findOnQuery(findArray, orderBy);
      res.send({ videos: videos });
    }
  } catch (error) {
    res.status(404).json({ message: "Could Not Fetch Videos from DB", error });
  }
};

const getVideosById = async (req, res) => {
  try {
    var isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) {
      res.status(400).send({
        code: 400,
        message: '"videoId" must be a valid mongo id',
        stack: 'Error: "videoId" must be a valid mongo id\n    at ...',
      });
    } else {
      await videoServiceInstance.findOneById(req, res);
    }
  } catch (error) {}
};

const postNewVideo = async (req, res) => {
  try {
    const body = req.body;
    const newVideo = await videoServiceInstance.create(body);
    res.status(201).send(newVideo);
  } catch (error) {
    res.status(400).send({
      code: 400,
      message: '"videoLink" is required',
      stack: 'Error: "videoLink" is required\n    at ...',
    });
  }
};

const updateVote = async (req, res) => {
  try {
    const id = req.params.videoId;
    const body = req.body;
    let updateObj;
    if (body.vote === "upVote") {
      if (body.change === "increase") {
        updateObj = { $inc: { "votes.upVotes": 1 } };
      } else if (body.change === "decrease") {
        updateObj = { $inc: { "votes.upVotes": -1 } };
      }
    } else if (body.vote === "downVote") {
      if (body.change === "increase") {
        updateObj = { $inc: { "votes.downVotes": 1 } };
      } else if (body.change === "decrease") {
        updateObj = { $inc: { "votes.downVotes": -1 } };
      }
    }
    const updatedData = await videoServiceInstance.updateVotes(id, updateObj);
    res.status(204).send();
  } catch (error) {
    res.status(400).send({
      code: 400,
      message: '"vote" is required',
      stack: 'Error: "vote" is required\n ...',
    });
  }
};

const updateViews = async (req, res) => {
  try {
    const id = req.params.videoId;
    let updateObj = { $inc: { viewCount: 1 } };
    const updatedData = await videoServiceInstance.updateViews(id, updateObj);
    res.status(204).send();
  } catch (error) {
    res.status(400).send({
      code: 400,
      message: '""videoId"" must be a valid id',
      stack: 'Error: ""videoId"" must be a valid id\n',
    });
  }
};

module.exports = {
  getAllVideos,
  getVideosById,
  postNewVideo,
  updateVote,
  updateViews,
};
