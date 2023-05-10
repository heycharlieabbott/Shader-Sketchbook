import { useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { CanvasCapture } from "canvas-capture";

const Recorder = (props) => {
  const [FF, setFF] = useState(true);
  const [Stop, setStop] = useState(false);

  useThree((s) => {
    CanvasCapture.init(s.gl.domElement);
  });

  CanvasCapture.bindKeyToPNGSnapshot("p");

  useEffect(() => {
    setFF(false);

    if (props.cap && !CanvasCapture.isRecording()) {
      console.log(props.cap);
      CanvasCapture.beginVideoRecord({
        format: CanvasCapture.WEBM,
        name: "vid",
        fps: 30,
      });
      // CanvasCapture.beginPNGFramesRecord({
      //   onExportProgress: (progress) => {
      //     // Options are optional, more info below.
      //     console.log(`Zipping... ${Math.round(progress * 100)}% complete.`);
      //   },
      //   fps: 30,
      // });
    }

    if (!props.cap && !FF) {
      CanvasCapture.stopRecord();
    }
  }, [props.cap]);

  useEffect(() => {
    if (!FF & props.screenshot) {
      CanvasCapture.takePNGSnapshot();
    }
  }, [props.screenshot]);

  useFrame(({ clock }) => {
    if (clock.getElapsedTime() > props.endTime && CanvasCapture.isRecording()) {
      CanvasCapture.stopRecord();
      setStop(true);
    }

    if (props.cap && !Stop) {
      console.log(Stop);
      CanvasCapture.recordFrame();
      // CanvasCapture.takePNGSnapshot({
      //   onExport: (blob, file) => {
      //     console.log(blob)
      //     console.log(file)
      //   },
      // })
    }
  });

  return null;
};

export default Recorder;
