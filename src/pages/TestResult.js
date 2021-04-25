import React from "react";
import axios from "axios";

class TestResult extends React.Component {
  state = {
    EI: "",
    SN: "",
    TF: "",
    JP: "",
    RESULT: "",
    data: "",
  };
  mbti = async () => {
    const mbti = this.props.location.state.mbti;
    let { EI, SN, TF, JP } = this.state;
    console.log(mbti);

    if (mbti.EI > 1) {
      EI = "E";
    } else if (mbti.EI < 2) {
      EI = "I";
    }
    if (mbti.SN > 1) {
      SN = "S";
    } else if (mbti.SN < 2) {
      SN = "N";
    }
    if (mbti.TF > 1) {
      TF = "T";
    } else if (mbti.TF < 2) {
      TF = "F";
    }
    if (mbti.JP > 1) {
      JP = "J";
    } else if (mbti.JP < 2) {
      JP = "P";
    }

    let RESULT = EI + SN + TF + JP;

    const { data } = await axios.get(`/api/result.php?result=${RESULT}`);

    console.log(data[0]);
    this.setState({
      EI,
      SN,
      TF,
      JP,
      RESULT,
      data: data[0],
    });
  };
  componentDidMount() {
    this.mbti();
  }
  render() {
    const { data } = this.state;
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
        <div className="text-center mt-5">{data.explains}</div>
      </section>
    );
  }
}

export default TestResult;
