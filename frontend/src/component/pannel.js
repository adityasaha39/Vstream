import React, { Component } from "react";
import { Button, Select } from "antd";
import Dashboard from "./dashboard";
import Footer from "./footer";
import { config } from "../App";
import "./pannel.css";
import "antd/dist/antd.css";

const { Option } = Select;

class pannel extends Component {
  constructor() {
    super();
    this.state = {
      genres: "",
      contentRating: "",
      sortBy: "",
      loading: false,
      data: [],
    };
    this.apiStrring = "videos";
  }

  updateApi = () => {
    let title = this.props.title;
    const generes = this.state.genres;
    const contentRating = this.state.contentRating;
    const sortBy = this.state.sortBy;

    let data = [];

    if (title !== "") {
      title = title.toLowerCase();
      let obj = {
        key: "title",
        value: title,
      };
      data.push(obj);
    }

    if (generes !== "" && generes !== "All") {
      let obj = {
        key: "genres",
        value: generes,
      };
      data.push(obj);
    }

    if (contentRating !== "" && contentRating !== "All") {
      let obj = {
        key: "contentRating",
        value: contentRating,
      };
      data.push(obj);
    }

    if (sortBy !== "") {
      let obj = {
        key: "sortBy",
        value: sortBy,
      };
      data.push(obj);
    }

    if (data.length === 0) {
      this.apiStrring = "videos";
    } else if (data.length >= 1) {
      this.apiStrring = `videos?${data[0].key}=${data[0].value}`;

      for (let i = 1; i < data.length; i++) {
        this.apiStrring += `&${data[i].key}=${data[i].value}`;
      }
    }

    // console.log(this.apiStrring);
    this.performAPICall(this.apiStrring);
  };

  handleChange = (value) => {
    this.setState({
      sortBy: value,
    });
    // console.log(this.props.title);
    setTimeout(
      function () {
        this.updateApi();
      }.bind(this),
      1000
    );
  };

  genereButton1 = () => {
    this.setState({
      genres: "All",
    });
    // console.log("All");
    setTimeout(
      function () {
        this.updateApi();
      }.bind(this),
      1000
    );
  };

  genereButton2 = () => {
    this.setState({
      genres: "Education",
    });
    // console.log("Education");
    setTimeout(
      function () {
        this.updateApi();
      }.bind(this),
      1000
    );
  };

  genereButton3 = () => {
    this.setState({
      genres: "Sports",
    });
    setTimeout(
      function () {
        this.updateApi();
      }.bind(this),
      1000
    );
  };

  genereButton4 = () => {
    this.setState({
      genres: "Comedy",
    });
    // console.log("Comedy");
    setTimeout(
      function () {
        this.updateApi();
      }.bind(this),
      1000
    );
  };

  genereButton5 = () => {
    this.setState({
      genres: "Lifestyle",
    });
    // console.log("Lifestyle");
    setTimeout(
      function () {
        this.updateApi();
      }.bind(this),
      1000
    );
  };

  ageChange1 = () => {
    this.setState({
      contentRating: "All",
    });
    setTimeout(
      function () {
        this.updateApi();
      }.bind(this),
      1000
    );
  };

  ageChange2 = () => {
    this.setState({
      contentRating: "7%2B",
    });
    setTimeout(
      function () {
        this.updateApi();
      }.bind(this),
      1000
    );
  };

  ageChange3 = () => {
    this.setState({
      contentRating: "12%2B",
    });
    setTimeout(
      function () {
        this.updateApi();
      }.bind(this),
      1000
    );
  };

  ageChange4 = () => {
    this.setState({
      contentRating: "16%2B",
    });
    setTimeout(
      function () {
        this.updateApi();
      }.bind(this),
      1000
    );
  };

  ageChange5 = () => {
    this.setState({
      contentRating: "18%2B",
    });
    setTimeout(
      function () {
        this.updateApi();
      }.bind(this),
      1000
    );
  };

  performAPICall = async (value) => {
    let response = {};
    let errored = false;
    this.setState({
      loading: true,
    });
    try {
      response = await (await fetch(`${config.endpoint}/${value}`)).json();
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

  componentDidMount() {
    this.performAPICall("videos");
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.title !== this.props.title) {
      this.updateApi();
    }
  }

  render() {
    return (
      <>
        <div className="pannel-container">
          <div className="genre-container">
            <div className="genre-btn-container">
              <Button onClick={this.genereButton1} className="genre-btn">
                All Gnere
              </Button>
              <Button onClick={this.genereButton2} className="genre-btn">
                Education
              </Button>
              <Button onClick={this.genereButton3} className="genre-btn">
                Sports
              </Button>
              <Button onClick={this.genereButton4} className="genre-btn">
                Comedy
              </Button>
              <Button onClick={this.genereButton5} className="genre-btn">
                Lifestyle
              </Button>

              <Select
                className="sort-select"
                defaultValue="releaseDate"
                onChange={this.handleChange}
              >
                <Option id="release-date-option" value="releaseDate">
                  Sort by:- Release Date
                </Option>
                <Option id="view-count-option" value="viewCount">
                  Sort by:- View Count
                </Option>
              </Select>
            </div>
          </div>
          <div className="age-container">
            <Button onClick={this.ageChange1} className="genre-btn">
              All Age
            </Button>
            <Button onClick={this.ageChange2} className="genre-btn">
              7+
            </Button>
            <Button onClick={this.ageChange3} className="genre-btn">
              12+
            </Button>
            <Button onClick={this.ageChange4} className="genre-btn">
              16+
            </Button>
            <Button onClick={this.ageChange5} className="genre-btn">
              18+
            </Button>
          </div>
        </div>
        <Dashboard data={this.state.data} />
        <Footer />
      </>
    );
  }
}

export default pannel;
