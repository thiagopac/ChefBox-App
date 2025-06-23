import React from "react";
import { Text, TextProps } from "react-native";
import { fontFamily } from "@/constants/Styles";

export default function AppText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[{ fontFamily: fontFamily.regular }, props.style]}
    >
      {props.children}
    </Text>
  );
}
