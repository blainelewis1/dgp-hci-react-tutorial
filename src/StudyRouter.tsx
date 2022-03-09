import { useState } from "react";

import ConsentScreen from "./ConsentScreen";
import FittsTask from "./FittsTask";
import Finish from "./Finish";

type StudyState = "Consent" | "FittsBlock1" | "FittsBlock2" | "Finish";

export interface FittsLog {
  timestamp: number;
  block: string;
  data: object;
}

export const StudyRouter: React.FC = () => {
  const [studyState, setStudyState] = useState<StudyState>("Consent");

  const [logs, setLogs] = useState<Array<FittsLog>>([]);
  const logData = (data: object) =>
    setLogs([
      ...logs,
      { timestamp: Date.now(), block: studyState, data: data },
    ]);

  if (studyState === "Consent") {
    return (
      <ConsentScreen
        setNextState={() => {
          setStudyState("FittsBlock1");
        }}
      />
    );
  } else if (studyState === "FittsBlock1") {
    return (
      <FittsTask
        setNextState={() => {
          setStudyState("FittsBlock2");
        }}
        onLog={logData}
      />
    );
  } else if (studyState === "FittsBlock2") {
    return (
      <FittsTask
        width={10}
        distance={30}
        setNextState={() => {
          setStudyState("Finish");
        }}
        onLog={logData}
      />
    );
  } else if (studyState === "Finish") {
    return <Finish logs={logs} />;
  }

  throw new Error("Study state not found.");
};

export default StudyRouter;
