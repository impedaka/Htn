import React from "react";
import ReactDOM from "react-dom";
import AudioRecorder from "./AudioRecorder.js";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h2>Record, Encode and Download Audio</h2>
      <AudioRecorder />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
