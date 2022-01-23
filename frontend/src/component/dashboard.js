import React, { Component } from "react";
import DashboardItem from "./dashboardItem";
import { Empty } from "antd";
import "./dashboard.css";

class dashboard extends Component {
  render() {
    if (this.props.data.length === 0) {
      return (
        <div className="dashboard-container">
          <Empty />
        </div>
      );
    } else {
      return (
        <div className="dashboard-container">
          {this.props.data.map((items) => {
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
      );
    }
  }
}

export default dashboard;
