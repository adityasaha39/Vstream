import React, { Component } from "react";
import { Input, Button, Modal, Select, DatePicker, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { config } from "../App";
import "./header.css";
import "antd/dist/antd.css";

const { Search } = Input;
const { Option } = Select;

class header extends Component {
  constructor() {
    super();
    this.state = {
      isVisible: false,
      modalVideoUrl: "",
      modalVideoTitle: "",
      modalVideoGenere: "Education",
      modalVideoAge: "7+",
      modalVideoDate: "",
      modalVideoImage: "",
    };
  }

  verifyResponse = (response) => {
    if (response.code === undefined) {
      message.success("Video Uploaded Successfully");
    } else {
      message.error("Video not Uploaded");
      message.info("Ensure all feilds in proper format");
    }
  };

  performPostApiCall = async () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        videoLink: `${this.state.modalVideoUrl}`,
        title: `${this.state.modalVideoTitle}`,
        genre: `${this.state.modalVideoGenere}`,
        contentRating: `${this.state.modalVideoAge}`,
        releaseDate: `${this.state.modalVideoDate}`,
        previewImage: `${this.state.modalVideoImage}`,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch(`${config.endpoint}/videos`, requestOptions)
        .then((response) => response.text())
        .then((result) => JSON.parse(result))
        .then((result) => this.verifyResponse(result))
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.log(error);
    }
  };

  modalSubmit = async () => {
    await this.performPostApiCall();
  };

  showModal = () => {
    this.setState({
      isVisible: true,
    });
  };

  handleOk = () => {
    this.setState({
      isVisible: false,
    });
    this.modalSubmit();
  };

  handleCancel = () => {
    this.setState({
      isVisible: false,
    });
  };

  onUpload = () => {
    this.showModal();
  };

  onChangeUrl = (e) => {
    this.setState({
      modalVideoUrl: e.target.value,
    });
  };

  onChangeThumbnail = (e) => {
    this.setState({
      modalVideoImage: e.target.value,
    });
  };

  onChangeTitle = (e) => {
    this.setState({
      modalVideoTitle: e.target.value,
    });
  };

  onChangeGenere = (value) => {
    this.setState({
      modalVideoGenere: value,
    });
  };

  onChangeAge = (value) => {
    this.setState({
      modalVideoAge: value,
    });
  };

  onChangeDate = (date, dateString) => {
    this.setState({
      modalVideoDate: dateString,
    });
  };

  render() {
    return (
      <>
        <div className="header-container">
          <div className="header-logo">
            <div className="logo-x">V </div>
            <div className="logo-flix"> Stream</div>
          </div>
          <Search
            placeholder="input search text"
            allowClear
            onSearch={this.props.onSearch}
            style={{ maxWidth: 500 }}
          />
          <Button
            type="primary"
            icon={<UploadOutlined />}
            onClick={this.onUpload}
          >
            Upload
          </Button>
          <Modal
            title="Upload Video"
            visible={this.state.isVisible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            okButtonProps={{ id: "upload-btn-submit" }}
            cancelButtonProps={{ id: "upload-btn-cancel" }}
            okText="Upload"
          >
            <Input placeholder="Enter the url" onChange={this.onChangeUrl} />
            <h5>Link to be used in video</h5>
            <Input
              placeholder="Enter thumbnail url"
              onChange={this.onChangeThumbnail}
            />
            <h5>Thumbnail to be used in dashboard</h5>
            <Input placeholder="Enter title" onChange={this.onChangeTitle} />
            <h5>Title of the video</h5>
            <Select defaultValue="Education" onChange={this.onChangeGenere}>
              <Option value="Education">Education</Option>
              <Option value="Sports">Sports</Option>
              <Option value="Comedy">Comedy</Option>
              <Option value="Lifestyle">Lifestyle</Option>
            </Select>
            <h5>Type of hte video</h5>
            <Select defaultValue="7+" onChange={this.onChangeAge}>
              <Option value="7+">7+</Option>
              <Option value="12+">12+</Option>
              <Option value="16+">16+</Option>
              <Option value="18+">18+</Option>
            </Select>
            <h5>Age group of the video</h5>
            <DatePicker onChange={this.onChangeDate} />
            <h5>Upload date of video</h5>
          </Modal>
        </div>
      </>
    );
  }
}

export default header;
