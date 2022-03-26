import React, {useState} from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Metrics, Colors } from '../values';

export default props => {
  const [security, setSecurity] = useState(true)
  const { style, ... rest } = props;

  return(
    <View style={ [styles.container, style] }> 
      <TextInput 
        secureTextEntry={security}
        style={ styles.input } 
        {...rest }
      />
      <TouchableOpacity
        onPress={() => setSecurity(!security)}
      >
        <Ionicons name={security ? "eye-off-sharp" : "eye-sharp" } size={24} color={Colors.dark} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create(
  {
    container: {
      flexDirection: 'row',
      backgroundColor: Colors.white,
      height: 48,
      borderWidth: 1,
      borderRadius: Metrics.radius.base,
      paddingHorizontal: Metrics.padding.base,
      alignItems: 'center',
    },
    input: {
      flexGrow: 1,
      marginRight: Metrics.margin.small,
      paddingVertical: Metrics.padding.small
    }
  }
)