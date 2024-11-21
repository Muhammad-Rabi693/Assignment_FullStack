import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../store/index'
import { SafeAreaView } from 'react-native-safe-area-context'
import logo from '../assets/ok.jpeg'
import logo2 from '../assets/welcome2.png'
import { router } from 'expo-router'


const index = () => {
  const {count}=useStore()
  return (
    <SafeAreaView className='items-center  bg-[#CAC9C0] flex-1 h-full'>

       <Image source={logo2} className='w-full h-[660] px-3 -mt-[30] mb-5 items-start' /> 
      
    <View className=' bg-[#CAC9C0] w-full h-[20%] -mt-[70] items-center rounded-3xl'>

        <TouchableOpacity className='border w-[300] h-14 mb-[20] ml-2 rounded-xl bg-black  items-center justify-center mt-7' onPress={()=>router.push("./(screens)/Home")}>
          <Text className='text-3xl text-white font-bold'>Get Started</Text>
        </TouchableOpacity>
    </View>
    </SafeAreaView>
  )
}

export default index