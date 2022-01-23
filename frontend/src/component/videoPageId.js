import React, { Component } from "react";
import { config } from "../App";
import Footer from "./footer";
import { Button } from "antd";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import DashboardItem from "./dashboardItem";
import "./videoPageId.css";

class videoPageId extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      likes: 0,
      dislikes: 0,
      dataId: [],
      loading: false,
      check: false,
      checkVal: "",
    };
  }

  performViewUpdateApiCall = async (id) => {
    var requestOptions = {
      method: "PATCH",
      redirect: "follow",
    };

    let errored = false;
    let response;
    try {
      await fetch(`${config.endpoint}/videos/${id}/views`, requestOptions);
    } catch (e) {
      errored = true;
    }
    if (errored) {
      console.log(response);
    }
  };

  performApiCallId = async () => {
    let id = this.props.params.videoId;
    // console.log(id);

    let response = {};
    let errored = false;
    this.setState({
      loading: true,
    });
    try {
      response = await (await fetch(`${config.endpoint}/videos/${id}`)).json();
    } catch (e) {
      errored = true;
    }

    this.setState({
      loading: false,
    });
    if (!errored && response) {
      // console.log(response);
      this.setState({
        dataId: response,
        likes: response.votes.upVotes,
        dislikes: response.votes.downVotes,
      });
      this.performViewUpdateApiCall(response._id);
    }
  };

  performAPICall = async () => {
    // console.log(`${config.endpoint}/videos`);
    let response = {};
    let errored = false;
    this.setState({
      loading: true,
    });
    try {
      response = await (await fetch(`${config.endpoint}/videos`)).json();
    } catch (e) {
      errored = true;
    }

    this.setState({
      loading: false,
    });
    if (!errored && response) {
      // console.log(response);
      this.setState({
        data: response.videos,
      });
    }
  };

  updateVoteApiCall = async (id, vote, change) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      vote: vote,
      change: change,
    });

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(`${config.endpoint}/videos/${id}/votes`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  likeButton = async () => {
    if (this.state.check && this.state.checkVal === "like") {
      return;
    }
    if (this.state.check && this.state.checkVal === "dislike") {
      await this.updateVoteApiCall(
        this.state.dataId._id,
        "downVote",
        "decrease"
      );
      this.setState({
        dislikes: this.state.dislikes - 1,
      });
    }
    this.setState({
      likes: this.state.likes + 1,
      check: true,
      checkVal: "like",
    });
    await this.updateVoteApiCall(this.state.dataId._id, "upVote", "increase");
  };
  dislikeButton = async () => {
    if (this.state.check && this.state.checkVal === "dislike") {
      return;
    }
    if (this.state.check && this.state.checkVal === "like") {
      await this.updateVoteApiCall(this.state.dataId._id, "upVote", "decrease");
      this.setState({
        likes: this.state.likes - 1,
      });
    }
    this.setState({
      check: true,
      checkVal: "dislike",
      dislikes: this.state.dislikes + 1,
    });
    await this.updateVoteApiCall(this.state.dataId._id, "downVote", "increase");
  };

  componentDidMount() {
    this.performApiCallId();
    this.performAPICall();
  }
  render() {
    return (
      <>
        <div className="header-container">
          <div className="header-logo">
            <div className="logo-x">V </div>
            <div className="logo-flix"> Stream</div>
          </div>
        </div>
        <div className="video-parent">
          <div className="video-container">
            <div className="iframe-parent">
              <iframe
                className="iframe-responsive"
                width="853"
                height="480"
                key={this.state.dataId._id}
                src={`https://${this.state.dataId.videoLink}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="video-title-link vedio-description">
            <h2>{this.state.dataId.title}</h2>
          </div>
          <div className="vedio-description">
            <p>{this.state.dataId.viewCount} views</p>
          </div>
          <div className="vedio-description">
            <div className="vedio-header">
              <p>{this.state.dataId.contentRating}</p>
              <p>&bull;</p>
              <p>
                {this.state.dataId.releaseDate
                  ? this.state.dataId.releaseDate.substr(0, 10)
                  : "Today"}
              </p>
            </div>
            <div className="vedio-header">
              <Button className="btn-vote" onClick={this.likeButton}>
                <LikeOutlined />
                {this.state.likes}
              </Button>
              <Button className="btn-vote" onClick={this.dislikeButton}>
                <DislikeOutlined />
                {this.state.dislikes}
              </Button>
            </div>
          </div>
        </div>
        <div className="dashboard-container">
          {this.state.data.map((items) => {
            return (
              <DashboardItem
                key={items._id}
                _id={items._id}
                previewImage={items.previewImage}
                title={items.title}
                releaseDate={items.releaseDate}
              />
            );
          })}
        </div>
        <Footer />
      </>
    );
  }
}

export default videoPageId;
