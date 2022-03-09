import React, { useState } from "react";

const ConsentScreen: React.FunctionComponent<{ setNextState: () => void }> = ({
  setNextState,
}) => {
  const [consentGiven, setConsentGiven] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (consentGiven) {
          setNextState();
        }
      }}
    >
      <h1>Blaine and Arnav's Consent Screen</h1>
      <p>
        By consenting to this screen you relinquish your right to sue Blaine or
        Arnav for any misinformation they have spread about React.
      </p>
      <label>
        <input
          required
          type="checkbox"
          checked={consentGiven}
          onChange={() => setConsentGiven(true)}
        />{" "}
        I consent to the above
      </label>
      <br />
      <br />
      <input type="submit" value="Continue" />
    </form>
  );
};

export default ConsentScreen;
