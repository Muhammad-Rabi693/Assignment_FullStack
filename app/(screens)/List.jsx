import { View, Text, ScrollView, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSQLiteContext } from 'expo-sqlite';
import Ionicons from '@expo/vector-icons/Ionicons';
const List = () => {
    const [tasks, setTask] = useState([])
    const [uniqueCat, setUniqueCat] = useState([])
    const [currentTab,setCurrentTab] = useState("All")
    const db = useSQLiteContext();
    const getDate = async () => {
        const result = await db.getAllAsync(`SELECT * from tasks`)
        setTask(result)
    }
    const getUniqueCategory = async () => {
        const result = await db.getAllAsync(`SELECT DISTINCT(category) from tasks`)
        setUniqueCat(result)
    }
    useEffect(() => {
        getDate()
        getUniqueCategory()
    }, [])

    const handleTaskStatus = async (id, currentStatus) => {
        await db.execAsync(`PRAGMA journal_mode = 'wal';
            UPDATE tasks set status = ${currentStatus ? 0 : 1} where id = ${id}`)
        
        getDate()
    }

    const handleTab = async (selectedTab) =>{
        setCurrentTab(selectedTab)
        if(selectedTab=="All"){
            const res = await db.getAllAsync(`select * from tasks`)
            setTask(res)
        }else if (selectedTab == "Pending"){
            const res = await db.getAllAsync(`select * from tasks where status = 0`)
            setTask(res)
        }else if (selectedTab == "Completed"){
            const res = await db.getAllAsync(`select * from tasks where status = 1`)
            setTask(res)
        }else{
            const res = await db.getAllAsync(`select * from tasks where category = '${selectedTab}'`)
            setTask(res)
        }
       
    }

    return (
        <View>
            <View className='p-6 bg-[#CAC9C0]'>
                <ScrollView className='bg-[#CAC9C0] p-4 flex flex-row rounded-lg' horizontal showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity onPress={()=>handleTab("All")} className={`${currentTab=="All"?"bg-black":"border border-black"} px-4 rounded-2xl mx-2`}>
                        <Text className={`${currentTab=="All"?"text-white":"text-black"}`}>All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handleTab("Pending")} className={`${currentTab=="Pending"?"bg-black":"border border-black"} px-4 rounded-2xl mx-2`}>
                        <Text className={`${currentTab=="Pending"?"text-white":"text-black"}`}>Pending</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handleTab("Completed")} className={`${currentTab=="Completed"?"bg-black":"border border-black"} px-4 rounded-2xl mx-2`}>
                        <Text className={`${currentTab=="Completed"?"text-white":"text-black"}`}>Completed</Text>
                    </TouchableOpacity>
                    {
                        uniqueCat.map((item) => {
                            return <TouchableOpacity key={item.id} onPress={()=>handleTab(item.category)} className={`${currentTab==item.category?"bg-black":"border border-black"} px-4 rounded-2xl mx-2 mr-6`}>
                                <Text className={`${currentTab==item.category?"text-white":"text-black"}`}>{item.category}</Text>
                            </TouchableOpacity>
                        })
                    }
                </ScrollView>
            </View>
            <View className='p-6'>
                <ScrollView className='h-[85%]' showsVerticalScrollIndicator={false}>
                    {
                        tasks.map((task) => {
                            return <Pressable onPress={() => handleTaskStatus(task.id, task.status)} key={task.id} className={`${task.status ? "bg-green-800" : "bg-black"} p-4 rounded-2xl mx-2 mt-2`}>
                                <View className='flex flex-row'>
                                    <Text className='text-white font-bold pb-3 flex-1'>{task.taskValue}</Text>
                                    {
                                        task.status ? <Ionicons name="checkmark-circle" size={24} color="white" />
                                            : <Ionicons name="alert-circle" size={24} color="red"/>
                                
                                    }
                                </View>
                                <View className='flex flex-row justify-between'>
                                    <Text className='text-white font-bold'>{task.date}</Text>
                                    <Text className='text-white font-bold'>{task.category}</Text>
                                </View>
                            </Pressable>
                        })
                    }
                </ScrollView>
            </View>
        </View>
    )
}

export default List