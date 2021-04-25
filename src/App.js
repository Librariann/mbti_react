import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Routes from "./Routes";
import { TestReady, TestProcess, TestResult } from "./pages";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";

class App extends React.Component {
  state = {
    isLoading: true,
    data: [],
  };
  mbti = async () => {
    const { data } = await axios.get("/api/index.php");
    this.setState({ data, isLoading: false });
  };

  componentDidMount() {
    this.mbti();
  }

  render() {
    const { isLoading } = this.state;
    return (
      <section>
        {isLoading ? (
          <div className="loading">
            <span className="spinner"></span>
          </div>
        ) : (
          <Router>
            <div>
              <Route exact path={Routes.TESTREADY} component={TestReady} />
              <Route path={Routes.TESTPROCESS} component={TestProcess} />
              <Route path={Routes.TESTRESULT} component={TestResult} />
            </div>
          </Router>
        )}
      </section>
    );
  }
}

export default App;
