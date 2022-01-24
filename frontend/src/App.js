import React, { Component } from "react";
import env from "./env";
import "./App.css";
import Header from "./component/header";
import Pannel from "./component/pannel";
import VedioPage from "./component/videoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const config = {
  endpoint: env.END_POINT,
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
    };
  }

  onSearch = (value) => {
    this.setState({
      title: value,
    });
  };

  render() {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header onSearch={this.onSearch} />
                  <Pannel title={this.state.title} />
                </>
              }
            />
            <Route path="videos/:videoId" element={<VedioPage />} />
            <Route
              path="*"
              element={
                <>
                  <Header onSearch={this.onSearch} />
                  <Pannel title={this.state.title} />
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
