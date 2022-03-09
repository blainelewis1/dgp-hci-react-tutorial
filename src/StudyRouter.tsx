import { useState } from "react";

import ConsentScreen from "./ConsentScreen";
import FittsTask from "./FittsTask";

type StudyState = "Consent" | "FittsBlock1" | "FittsBlock2";

export const StudyRouter: React.FC = () => {
  const [studyState, setStudyState] = useState<StudyState>("Consent");

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
      />
    );
  } else if (studyState === "FittsBlock2") {
    return (
      <FittsTask
        width={10}
        distance={30}
        setNextState={() => {
          // TODO:
        }}
      />
    );
  }

  throw new Error("Study state not found.");
};

export default StudyRouter;
