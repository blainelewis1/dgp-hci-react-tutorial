import React from "react";

const FittsTask: React.FC = () => {
  const numBubbles: number = 9;
  const width = 15;
  const distance = 75;

  return (
    // To make things easy we place 0,0 in the center of the svg.
    <svg viewBox="-50 -50 100 100" style={{ width: "15cm", height: "15cm" }}>
      {/* Javascript does not have for i in range, so instead we create an array of size numBubbles, fill it with 0s, then loop over that.  */}
      {new Array(numBubbles).fill(0).map((_, i) => {
        // Divide the circle into numBubble equal angles.
        let theta = ((Math.PI * 2) / numBubbles) * i;

        return (
          <circle
            r={width / 2}
            // Use the slice for this circle to determine where the circle goes.
            cx={(Math.cos(theta) * distance) / 2}
            cy={(Math.sin(theta) * distance) / 2}
            fill={"red"}
          />
        );
      })}
    </svg>
  );
};

export default FittsTask;
