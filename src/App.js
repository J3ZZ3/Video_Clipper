import React, { useState, useRef } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [startTime, setStartTime] = useState("00:00:00");
  const [endTime, setEndTime] = useState("00:00:00");
  const [clipName, setClipName] = useState("my_clip");
  const mediaRef = useRef(null);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(URL.createObjectURL(uploadedFile));
    }
  };

  const handlePreview = () => {
    const mediaElement = mediaRef.current;
    const startSec = timeToSeconds(startTime);
    const endSec = timeToSeconds(endTime);
    mediaElement.currentTime = startSec;
    mediaElement.play();

    setTimeout(() => {
      mediaElement.pause();
    }, (endSec - startSec) * 1000);
  };

  const handleDownload = () => {
    const blob = new Blob([file], { type: "video/mp4" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${clipName}.mp4`;
    link.click();
  };

  const timeToSeconds = (time) => {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Basic Video Editor</h1>

      <input type="file" accept="video/*,audio/*" onChange={handleFileUpload} />

      {file && (
        <div>
          <video
            ref={mediaRef}
            src={file}
            controls
            style={{ marginTop: "20px", maxWidth: "100%" }}
          ></video>
        </div>
      )}

      {/* Inputs to set start time, end time, and clip name */}
      {file && (
        <div style={{ marginTop: "20px" }}>
          <label>
            Start Time (hh:mm:ss):
            <input
              type="text"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              placeholder="hh:mm:ss"
            />
          </label>
          <br />
          <label>
            End Time (hh:mm:ss):
            <input
              type="text"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              placeholder="hh:mm:ss"
            />
          </label>
          <br />
          <label>
            Clip Name:
            <input
              type="text"
              value={clipName}
              onChange={(e) => setClipName(e.target.value)}
              placeholder="Clip name"
            />
          </label>
          <br />
          {/* Buttons to preview and download the clip */}
          <button onClick={handlePreview}>Preview</button>
          <button onClick={handleDownload} style={{ marginLeft: "10px" }}>
            Download Clip
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
