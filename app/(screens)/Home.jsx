import { View, Text, TouchableOpacity, TextInput, Pressable, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Picker } from '@react-native-picker/picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { router } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import icon from '../../assets/favicon.png'


const Home = () => {
  const db = useSQLiteContext();

  const [task, setTask] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Not Specified");
  const [date, setDate] = useState("")
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    let formattedDate = date.toDateString().split(" ")
    formattedDate = `${formattedDate[2]} ${formattedDate[1]} ${formattedDate[3]}`
    setDate(formattedDate)
    hideDatePicker();
  };

  const handleInsertion = async () => {
    let result = await db.execAsync(`PRAGMA journal_mode = 'wal';
      INSERT INTO tasks (taskValue,category,date) VALUES ('${task}','${selectedCategory}','${date}');`)
    setTask("")
    setSelectedCategory("Not Specified")
    setDate("")
  }


  return (
    <SafeAreaView className='bg-[#CAC9C0]'>
      <View className='bg-black h-[10%] flex items-center justify-center'>
        <Text className='text-center text-white text-3xl  font-bold'>Tech Task Manager</Text>
      </View>
      

      
      <View className='h-[80%] flex items-center justify-center px-4'>
      <Image source={icon} className='mb-7'/>
        <View className='bg-white border-gray-300 border w-full px-4 h-15 rounded-lg mt-2 mb-2 ml-2 mr-4'>
          <TextInput placeholder='Enter Task' onChangeText={(e) => setTask(e)} value={task} className='text-xl' />
        </View>
        <View className='bg-white border-gray-300 border w-full px-4 h-15 rounded-lg mt-2 mb-2 ml-2 mr-4'>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedCategory(itemValue)
            }>
            <Picker.Item label="Not Specified" value="not-specified" />
            <Picker.Item label="Office" value="office" />
            <Picker.Item label="Meeting" value="meeting" />
            <Picker.Item label="Appointment" value="appointment" />
          </Picker>
        </View>
        <Pressable onPress={showDatePicker} className='bg-white border-gray-300 border w-full px-4 py-5 h-15 rounded-lg mt-2 mb-2 ml-2 mr-4'>
          <View className='flex flex-row'>
            <Text className='flex-1'>{(date == "" ? "Select Due Date" : date)}</Text>
            <View className=''>
              <Ionicons name="calendar-outline" size={24} color="black" />
            </View>
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </Pressable>
      </View>
      <View className='flex flex-row items-center justify-center h-[10%] bg-[#CAC9C0] mb-4'>
        <TouchableOpacity onPress={() => router.push("./List")} className='w-[45%] p-4 bg-black mx-2 rounded-lg'>
          <Text className='text-white text-center'>List</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleInsertion} className='w-[45%] p-4 bg-black mx-2 rounded-lg'>
          <Text className='text-white text-center'>Create</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

export default Home