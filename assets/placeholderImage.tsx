import * as React from "react";
import Svg, { Rect, Text } from "react-native-svg";

export default function PlaceholderImage({ width = 600, height = 400, color = "#E0E0E0", textColor = "#555555" }) {
    return (
        <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
            <Rect width={width} height={height} fill={color} />
            <Text
                x="50%"
                y="50%"
                fill={textColor}
                fontSize={Math.min(width, height) / 10}
                fontWeight="bold"
                textAnchor="middle"
                alignmentBaseline="middle"
            >
                {`${width} × ${height}`}
            </Text>
        </Svg>
    );
}