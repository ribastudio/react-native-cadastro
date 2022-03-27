import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { Metrics, Colors } from '../values';

export default props => {
  const {style, ...rest} = props;
  return(
    <TextInput style={ [ styles.input, style ] } 
              {...rest}
    >
    </TextInput>
  )
}

const styles = StyleSheet.create(
  {
    input: {
      height: 48,
      borderWidth: 1,
      borderRadius: Metrics.radius.base,
      paddingVertical: Metrics.padding.small,
      paddingHorizontal: Metrics.padding.base,
      backgroundColor: Colors.white
    }
  }
)