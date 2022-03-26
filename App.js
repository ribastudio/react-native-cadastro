import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import Stack from './routes/Stack'

export default () => (
  <>
    <StatusBar barStyle='light-content'/>
    <NavigationContainer>
      <Stack />
    </NavigationContainer>
  </>
)
