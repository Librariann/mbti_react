import React from "react";
import TestList from "./mbtiPage/testList";

class App extends React.Component {
  state = {};

  componentDidMount() {}

  render() {
    return (
      <div className="test__list">
        <h1>Hello World!</h1>
        <TestList />
      </div>
    );
  }
}

export default App;
