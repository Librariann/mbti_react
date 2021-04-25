import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function TestReady() {
  return (
    <div className="backgroun-images">
      <div className="container mt-5">
        <h1>
          당신에게 어울리는 <br /> <span>히어로는</span> 누구인가요?
        </h1>
        <h6>마블 히어로로 알아보는 나의 성향 테스트</h6>
        <Link to="/process">
          <Button className="startbtn mt-5" variant="primary">
            테스트 시작
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default TestReady;
