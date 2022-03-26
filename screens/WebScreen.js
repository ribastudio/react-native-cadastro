import React from 'react'
import { StyleSheet } from 'react-native'

import { WebView } from 'react-native-webview';

export default props => {

  return(
    <WebView 
      style={ styles.container }
      source={
        {
          uri: 'https://br.cellep.com/estacao-hack-sp'
        }
      }
    /> 
  )
}

const styles = StyleSheet.create(
  {
    container: {
      flexGrow: 1
    }
  }
)