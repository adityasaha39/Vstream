import React, { Component } from "react";
import {
  GithubOutlined,
  TwitterOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import "./footer.css";

class footer extends Component {
  render() {
    return (
      <div className="footer-container">
        <p>&copy; Aditya Saha | 2022</p>
        <p>A clone of video streaming platfrom</p>
        <div className="footer-social">
          <a
            href="https://github.com/adityasaha39"
            target="_blank"
            rel="noreferrer noopener"
          >
            <div className="social-item">
              <GithubOutlined />
            </div>
          </a>
          <a
            href="https://www.linkedin.com/in/adityasaha39/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <div className="social-item">
              <LinkedinOutlined />
            </div>
          </a>
          <a
            href="https://twitter.com/adityasaha39"
            target="_blank"
            rel="noreferrer noopener"
          >
            <div className="social-item">
              <TwitterOutlined />
            </div>
          </a>
        </div>
      </div>
    );
  }
}

export default footer;
