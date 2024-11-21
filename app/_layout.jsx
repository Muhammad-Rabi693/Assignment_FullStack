import { SQLiteProvider } from 'expo-sqlite';
import { View, Text } from 'react-native'
import React from 'react'
import "../global.css"
import { Stack } from 'expo-router'


const _layout = () => {
  return (
    <SQLiteProvider databaseName="taskApp.db" onInit={initializeDb}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='index' />
        <Stack.Screen name='(screens)' />
      </Stack>
    </SQLiteProvider>
  )
}

async function initializeDb(db) {
  await db.execAsync(`PRAGMA journal_mode = 'wal';
    CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT, 
    taskValue TEXT NOT NULL, 
    category TEXT NOT NULL, 
    status INT NOT NULL DEFAULT 0,
    date TEXT NOT NULL);`);
}


export default _layout