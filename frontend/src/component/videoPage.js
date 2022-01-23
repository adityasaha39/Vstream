import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import VideoPageId from "./videoPageId";

export default function VideoPage() {
  let params = useParams();
  const navigate = useNavigate();
  navigate("/");
  return (
    <>
      <VideoPageId params={params} />
    </>
  );
}
