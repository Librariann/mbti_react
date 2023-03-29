import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Routes from "./Routes";
import { TestReady, TestProcess, TestResult } from "./pages";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const mbti = async () => {
    const { data } = await axios.get("/api/index.php");
    setLoading(false);
    setData(data);
  };

  useEffect(() => {
    mbti();
  });

  return (
    <section>
      {loading ? (
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
};

export default App;
