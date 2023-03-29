import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, ProgressBar } from "react-bootstrap";

interface IData {
  title: string;
  question1: string;
  question2: string;
}

export const TestProcess = () => {
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState<IData>();
  const [paramsId, setParamsId] = useState(1);
  const [result, setResult] = useState(false);
  const [elements, setElements] = useState("");
  const [ei, setEi] = useState(0);
  const [sn, setSn] = useState(0);
  const [tf, setTf] = useState(0);
  const [jp, setJp] = useState(0);

  const mbtiUp = async () => {
    if (elements === "EI") {
      setEi((current) => current + 1);
    } else if (elements === "SN") {
      setSn((current) => current + 1);
    } else if (elements === "TF") {
      setTf((current) => current + 1);
    } else if (elements === "JP") {
      setJp((current) => current + 1);
    }

    const { data } = await axios.get(`/api/index.php?seq=${paramsId}`);
    let progress = (100 / 12) * paramsId;
    let dataJson = data[0];
    let result = false;
    if (progress >= 100) {
      result = true;
    }

    setData(dataJson);
    setProgress(progress);
    setElements(dataJson.elements);
    setParamsId(paramsId + 1);
    setResult(result);
  };

  const mbtiDown = async () => {
    const { data } = await axios.get(`/api/index.php?seq=${paramsId}`);
    let progress = (100 / 12) * paramsId;
    let dataJson = data[0];
    let result = false;
    if (progress >= 100) {
      result = true;
    }

    setData(dataJson);
    setProgress(progress);
    setElements(dataJson.elements);
    setParamsId(paramsId + 1);
    setResult(result);
  };

  useEffect(() => {
    mbtiDown();
  });

  return (
    <article className="question container">
      <ProgressBar animated now={progress} />
      <h2 id="title" className="text-center mt-5">
        {data?.title}
      </h2>
      {result ? (
        <>
          <Link
            to={{
              pathname: "/result",
              state: {
                mbti: {
                  ei,
                  sn,
                  tf,
                  jp: jp + 1,
                },
              },
            }}
          >
            <Button className="prcbtn" variant="primary mt-5">
              {data?.question1}
            </Button>
          </Link>
          <Link
            to={{
              pathname: "/result",
              state: {
                mbti: {
                  ei,
                  sn,
                  tf,
                  jp,
                },
              },
            }}
          >
            <Button className="prcbtn" variant="primary mt-5">
              {data?.question2}
            </Button>
          </Link>
        </>
      ) : (
        <>
          <Button variant="primary mt-5" onClick={mbtiUp}>
            {data?.question1}
          </Button>
          <Button variant="primary mt-5" onClick={mbtiDown}>
            {data?.question2}
          </Button>
        </>
      )}
    </article>
  );
};
