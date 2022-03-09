import React, { useState } from "react";

const FittsTask: React.FC<{
  numBubbles?: number;
  width?: number;
  distance?: number;
  setNextState: () => void;
  onLog: (data: object) => void;
}> = ({ numBubbles = 9, width = 15, distance = 75, setNextState, onLog }) => {
  // Store some state that determines which circle is the one the user should be clicking on.
  const [selectedCircle, setSelectedCircle] = useState(0);

  return (
    // To make things easy we place 0,0 in the center of the svg.
    <svg viewBox="-50 -50 100 100" style={{ width: "15cm", height: "15cm" }}>
      {/* Javascript does not have for i in range, so instead we create an array of size numBubbles, fill it with 0s, then loop over that.  */}
      {new Array(numBubbles).fill(0).map((_, i) => {
        // Divide the circle into numBubble equal angles.
        let theta = ((Math.PI * 2) / numBubbles) * i;

        return (
          <circle
            // When the user clicks on the circle we need to highlight the next circle
            onClick={() => {
              if (i === selectedCircle) {
                const nextCircle =
                  (selectedCircle + Math.floor(numBubbles / 2)) % numBubbles;

                setSelectedCircle(nextCircle);

                if (nextCircle === 0) {
                  setNextState();
                }

                onLog({ theta, id: i });
              }
            }}
            r={width / 2}
            // Use the slice for this circle to determine where the circle goes.
            cx={(Math.cos(theta) * distance) / 2}
            cy={(Math.sin(theta) * distance) / 2}
            // Color the circle based on whether the user should be clicking on it.
            fill={selectedCircle === i ? "red" : "lightgrey"}
          />
        );
      })}
    </svg>
  );
};

export default FittsTask;
