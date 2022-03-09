import { useEffect, useState } from "react";

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
  const [blockSettings, setBlockSettings] =
    useState<{ width: number; distance: number }>();
  const [loadingState, setLoadingState] = useState<{
    loading: boolean;
    error?: string;
  }>({ loading: true });

  useEffect(() => {
    async function fetchBlockSettings() {
      try {
        const response = await fetch(
          "https://www.random.org/integers/?num=2&min=10&max=50&col=1&base=10&format=plain&rnd=new"
        ).then((res) => res.text());

        const [width, distance] = response.split("\n").map((x) => parseInt(x));

        setBlockSettings({ width, distance });
        setLoadingState({ loading: false });
      } catch (e) {
        // @ts-ignore
        setLoadingState({ loading: false, error: e.message });
      }
    }

    fetchBlockSettings();
  }, []);

  const [studyState, setStudyState] = useState<StudyState>("FittsBlock1");

  const [logs, setLogs] = useState<Array<FittsLog>>([]);
  const logData = (data: object) =>
    setLogs([
      ...logs,
      { timestamp: Date.now(), block: studyState, data: data },
    ]);

  if (loadingState.loading) {
    return <div>Loading...</div>;
  } else if (loadingState.error) {
    return <div>Error: {loadingState.error}</div>;
  }

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
        width={blockSettings?.width}
        distance={blockSettings?.distance}
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
