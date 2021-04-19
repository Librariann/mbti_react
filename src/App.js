import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Routes from "./Routes";
import { TestList, TestStart } from "./pages";

class App extends React.Component {
  state = {};

  componentDidMount() {}

  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/start/123">Start</Link>
              </li>
            </ul>
          </nav>

          <Route exact path={Routes.TESTLIST} component={TestList} />
          <Route path={Routes.TESTSTART} component={TestStart} />
        </div>
      </Router>
    );
  }
}

export default App;
