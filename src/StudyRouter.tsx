import { useState } from "react";

import ConsentScreen from "./ConsentScreen";
import FittsTask from "./FittsTask";

type StudyState = "Consent" | "Fitts";

export const StudyRouter: React.FC = () => {
  const [studyState, setStudyState] = useState<StudyState>("Consent");

  if (studyState === "Consent") {
    return (
      <ConsentScreen
        setNextState={() => {
          setStudyState("Fitts");
        }}
      />
    );
  } else if (studyState === "Fitts") {
    return <FittsTask />;
  }

  throw new Error("Study state not found.");
};

export default StudyRouter;
