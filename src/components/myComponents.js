import React, { Component } from 'react';
import { TouchableOpacity, Text } from "react-native";

import Styles from '../Styles';

export const MyButton = ({ title, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity style={{ ...Styles.btnStyle, ...style }} onPress={onPress}>
      <Text style={{ color: 'white', ...textStyle }}>{title}</Text>
    </TouchableOpacity>
  )
}