import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, ProgressBar } from "react-bootstrap";

class TestProcess extends React.Component {
  state = {
    progress: 0,
    data: "",
    paramsId: 1,
    result: false,
    elements: "",
    EI: 0,
    SN: 0,
    TF: 0,
    JP: 0,
  };

  mbtiUp = async () => {
    let { paramsId, elements, EI, SN, TF, JP } = this.state;

    let elementsUse = elements;

    if (elementsUse === "EI") {
      EI += 1;
    } else if (elementsUse === "SN") {
      SN += 1;
    } else if (elementsUse === "TF") {
      TF += 1;
    } else if (elementsUse === "JP") {
      JP += 1;
    }

    const { data } = await axios.get(`/api/index.php?seq=${paramsId}`);
    let progress = (100 / 12) * paramsId;
    let dataJson = data[0];
    let result = false;
    if (progress >= 100) {
      result = true;
    }

    this.setState({
      data: dataJson,
      progress,
      elements: dataJson.elements,
      paramsId: paramsId + 1,
      result,
      EI,
      SN,
      TF,
      JP,
    });
  };

  mbtiDown = async () => {
    const { paramsId } = this.state;
    const { data } = await axios.get(`/api/index.php?seq=${paramsId}`);
    let progress = (100 / 12) * paramsId;
    let dataJson = data[0];
    let result = false;
    if (progress >= 100) {
      result = true;
    }
    this.setState({
      data: dataJson,
      progress,
      elements: dataJson.elements,
      paramsId: paramsId + 1,
      result,
    });
  };

  componentDidMount() {
    this.mbtiDown();
  }

  render() {
    const { data, progress, result, EI, SN, TF, JP } = this.state;
    return (
      <article className="question container">
        <ProgressBar animated now={progress} />
        <h2 id="title" className="text-center mt-5">
          {data.title}
        </h2>
        {result ? (
          <>
            <Link
              to={{
                pathname: "/result",
                state: {
                  mbti: {
                    EI,
                    SN,
                    TF,
                    JP: parseInt(JP + 1),
                  },
                },
              }}
            >
              <Button className="prcbtn" variant="primary mt-5">
                {data.question1}
              </Button>
            </Link>
            <Link
              to={{
                pathname: "/result",
                state: {
                  mbti: {
                    EI,
                    SN,
                    TF,
                    JP,
                  },
                },
              }}
            >
              <Button className="prcbtn" variant="primary mt-5">
                {data.question2}
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Button variant="primary mt-5" onClick={this.mbtiUp}>
              {data.question1}
            </Button>
            <Button variant="primary mt-5" onClick={this.mbtiDown}>
              {data.question2}
            </Button>
          </>
        )}
      </article>
    );
  }
}

export default TestProcess;
