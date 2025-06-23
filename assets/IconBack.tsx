import * as React from "react";
import Svg, { G, Rect, Defs, Use } from "react-native-svg";

export default function IconBack({ size = 32, color = "#DD2628" }) {
    return (
        <Svg
            width={size * 0.64} // Mantém proporção do SVG original (19.84/31.17 ≈ 0.64)
            height={size}
            viewBox="28.41436242144362 88.70543882624092 19.848023276696622 31.172215641760303"
            preserveAspectRatio="none"
        >
            <Defs>
                <Rect
                    x="27.566545680826227"
                    y="95.34619897585112"
                    width="21.543656757925497"
                    height="5.999999999999972"
                    rx="2.999999999999943"
                    ry="2.999999999999943"
                    id="rect1"
                />
                <Rect
                    x="27.566545680829247"
                    y="107.33722407381642"
                    width="21.54365675792537"
                    height="6.000000000000085"
                    rx="2.999999999999943"
                    ry="2.999999999999943"
                    id="rect2"
                />
            </Defs>
            <G transform="rotate(136 38.338374059788976 98.34619897585111)">
                <Use href="#rect1" fill={color} fillOpacity="1.0" />
            </G>
            <G transform="rotate(223 38.33837405979193 110.33722407381646)">
                <Use href="#rect2" fill={color} fillOpacity="1.0" />
            </G>
        </Svg>
    );
}