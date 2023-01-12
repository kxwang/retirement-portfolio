import React, { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import * as Device from 'expo-device';
import { FloatingLabelInput } from 'react-native-floating-label-input';

const config = {
 fontSize: 18,
}

export function NumericInput(props) {
  return (
    <FloatingLabelInput
      label={props.label}
      staticLabel
      mask={props.mask}
      containerStyles={styles.textInput_containerStyles}
      customLabelStyles={styles.textInput_customLabelStyles}
      labelStyles={styles.textInput_labelStyles}
      inputStyles={styles.textInput_inputStyles}
      onChangeText={ props.onChangeText }
      value={props.value}
      keyboardType={Device.isAndroid ? "numeric" : "decimal-pad"}
    />
  );
}

const styles = StyleSheet.create({
  textInput_containerStyles: {
    borderWidth: 2,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderColor: 'darkgray',
    borderRadius: 8,
    height: 50,
    marginTop: 20,
    minWidth: "45%",
    marginHorizontal: 10,
  },
  textInput_customLabelStyles: {
    colorFocused: 'black',
    fontSizeFocused: 12,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  textInput_labelStyles: {
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    marginTop: 15,
    fontSize: config.fontSize,
  },
  textInput_inputStyles: {
    color: 'blue',
    padding: 10,
    textAlign: "right",
    fontSize: config.fontSize,
  },
});
