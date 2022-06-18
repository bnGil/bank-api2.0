import React, { useState } from "react";
import "./example.css";

function Example({ method, endpoint, explanation, output }) {
  return (
    <div className="example">
      <div className="methodEp">
        <p className="method">{method}</p>
        <p className="endpoint">{endpoint}</p>
      </div>
      <p className="explanation">{explanation}</p>
      <p className="output">
        <pre>{output}</pre>
      </p>
    </div>
  );
}

export default Example;
