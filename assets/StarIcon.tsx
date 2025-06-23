import * as React from "react";
import Svg, { Path } from "react-native-svg";

export default function StarIcon({ size = 24, color = "#FFC107" }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M12 2L14.85 8.63L22 9.27L16.5 13.97L18.18 21L12 17.27L5.82 21L7.5 13.97L2 9.27L9.15 8.63L12 2Z"
        fill={color}
      />
    </Svg>
  );
}