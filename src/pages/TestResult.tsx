import React, { useEffect, useState } from "react";
import axios from "axios";

interface IData {
  result: string;
  title: string;
  explains: string;
  explains2: string;
}

export const TestResult = (props: any) => {
  const [ei, setEi] = useState("");
  const [sn, setSn] = useState("");
  const [tf, setTf] = useState("");
  const [jp, setJp] = useState("");
  const [result, setResult] = useState("");
  const [data, setData] = useState<IData>();

  const mbti = async () => {
    const location = props.location.state.mbti;
    const mbti = location.state.mbti;

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

    let RESULT = ei + sn + tf + jp;
    const { data } = await axios.get(`/api/result.php?result=${RESULT}`);
    setResult(RESULT);
    setData(data[0]);
  };

  useEffect(() => {
    mbti();
  });

  let imgPath = `img/${data?.result}.jpg`;
  return (
    <section className="container">
      <img
        src={imgPath}
        className="rounded-circle mt-5"
        id="natuerImage"
        alt="heroImage"
      />
      <div className="text-center mt-5">
        당신의 히어로 메이트는 <h2>{data?.title}</h2>
      </div>
      <div className="text-center mt-5">{data?.explains2}</div>
      <div className="text-center mt-5">{data?.explains}</div>
    </section>
  );
};
