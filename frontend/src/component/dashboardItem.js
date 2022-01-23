import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./dashboardItem.css";

class dashbordItem extends Component {
  render() {
    return (
      <Link to={`videos/${this.props._id}`} replace={false}>
        <div className="video-tile-link">
          <img
            src={this.props.previewImage}
            alt="No-img"
            className="vedio-img"
          />
          <div className="video-tile">{this.props.title}</div>
          <div className="vedio-date">
            {this.props.releaseDate.substr(0, 10)}
          </div>
        </div>
      </Link>
    );
  }
}

export default dashbordItem;
