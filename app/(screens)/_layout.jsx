import { View, Text } from 'react-native'
import React from 'react'
import "../../global.css"
import { Stack } from 'expo-router'


const _layout = () => {
  return (
    <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name='Home'/>
        <Stack.Screen name='List'/>
    </Stack>
  )
}

export default _layout