import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../values';

export default props => {
  const { style, ...rest } = props;
  return(
    <TouchableOpacity
      style={ [styles.button, style, {backgroundColor: props.color || Colors.primary}] }
      {...rest}
    >
      <Text style={ styles.text }>
        { props.title }
      </Text>
    </TouchableOpacity>
  
  )
}

const styles = StyleSheet.create(
  {
    button: {
      height: 48,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: Metrics.radius.base
    },
    text: {
      fontSize: Fonts.buttonText,
      color: Colors.white,
      textTransform: 'uppercase',
      letterSpacing: 1
    
    },

  }
)