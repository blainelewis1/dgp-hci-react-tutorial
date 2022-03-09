import { useState } from "react";

import ConsentScreen from "./ConsentScreen";
import FittsTask from "./FittsTask";
import Finish from "./Finish";

type StudyState = "Consent" | "FittsBlock1" | "FittsBlock2" | "Finish";

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
          setStudyState("Finish");
        }}
      />
    );
  } else if (studyState === "Finish") {
    return <Finish />;
  }

  throw new Error("Study state not found.");
};

export default StudyRouter;
