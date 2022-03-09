import { FittsLog } from "./StudyRouter";
import { parse } from "json2csv";

const Finish: React.FC<{ logs: Array<FittsLog> }> = ({ logs }) => {
  const csv = parse(
    logs.map((log) => {
      const newLog: Partial<FittsLog> = { ...log };
      const data = log.data;
      delete newLog["data"];

      return { ...newLog, ...data };
    })
  );

  return (
    <div>
      <div> Thank you for completing the experiment.</div>
      <a
        href={`data:text/plain;charset=utf-8,${encodeURIComponent(csv)}`}
        download={`${new Date().getTime()}.csv`}
      >
        Download data
      </a>
    </div>
  );
};

export default Finish;
