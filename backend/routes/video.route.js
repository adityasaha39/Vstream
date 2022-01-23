const router = require("express").Router();
const {
  getAllVideos,
  getVideosById,
  postNewVideo,
  updateVote,
  updateViews,
} = require("../controllers/video.controller");

router.get("/videos", getAllVideos);
router.get("/videos/:id", getVideosById);
router.post("/videos", postNewVideo);
router.patch("/videos/:videoId/votes", updateVote);
router.patch("/videos/:videoId/views", updateViews);

module.exports = router;
