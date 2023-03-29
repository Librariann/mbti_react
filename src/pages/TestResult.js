import React, { useEffect, useState } from "react";
import axios from "axios";

export const TestResult = () => {
  const [ei, setEi] = useState("");
  const [sn, setSn] = useState("");
  const [tf, setTf] = useState("");
  const [jp, setJp] = useState("");
  const [result, setResult] = useState("");
  const [data, setData] = useState("");

  const mbti = async () => {
    const mbti = this.props.location.state.mbti;
    let { EI, SN, TF, JP } = this.state;
    console.log(mbti);

    if (mbti.EI > 1) {
      setEi("E");
    } else if (mbti.EI < 2) {
      setEi("I");
    }
    if (mbti.SN > 1) {
      setSn("S");
    } else if (mbti.SN < 2) {
      setSn("N");
    }
    if (mbti.TF > 1) {
      setTf("T");
    } else if (mbti.TF < 2) {
      setTf("F");
    }
    if (mbti.JP > 1) {
      setJp("J");
    } else if (mbti.JP < 2) {
      setJp("P");
    }

    let RESULT = EI + SN + TF + JP;
    const { data } = await axios.get(`/api/result.php?result=${RESULT}`);

    console.log(data[0]);
    setEi();
    setSn();
    setTf();
    setJp();
    setResult(RESULT);
    setData(data[0]);
  };

  useEffect(() => {
    mbti();
  });
  let imgPath = `img/${data.result}.jpg`;
  return (
    <section className="container">
      <img
        src={imgPath}
        className="rounded-circle mt-5"
        id="natuerImage"
        alt="heroImage"
      />
      <div className="text-center mt-5">
        당신의 히어로 메이트는 <h2>{data.title}</h2>
      </div>
      <div className="text-center mt-5">{data.explains2}</div>
      <div className="text-center mt-5">{data.explains}</div>
    </section>
  );
};
