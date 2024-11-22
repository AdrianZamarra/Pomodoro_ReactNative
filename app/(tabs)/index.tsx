import {Image, StyleSheet, Text, Platform, Button, TouchableOpacity, BackHandler } from 'react-native';
import { useEffect, useState } from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Header from '@/src/components/Header';
import Timer from '@/src/components/Timer';
import { SafeAreaView } from 'react-native-safe-area-context';

const colors = ["#F7DC6F", "#a2d9ce", "#D7BDE2"];

export default function HomeScreen() {
  const[isWorking, setIsWorking] = useState(false);
  const[time, setTime] = useState(25 * 60);
  const[currentTime, setCurrentTime] = useState("POMO");
  const[isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if(isActive){
      interval = setInterval(() => {
        setTime(time - 1);
      }, 10);
    }else{
      // Linea 30 con error, funciona pero muestra error.
      clearInterval(interval);
    }

    if(time === 0){
      setIsActive(false);
      setIsWorking((prev) => !prev);
      setTime(isWorking ? 300 : 1500);
    }
    return() => clearInterval(interval);
  }, [isActive, time])
  
  function handleStartStop(){
    setIsActive(!isActive);
  }

  return (
    
    <SafeAreaView style={[styles.container, {backgroundColor: colors[currentTime]}]}>
      <View style={{ 
         flex: 1,
         paddingHorizontal: 15,
         }}>
        <Text style={styles.text}>POMODORO</Text>
        <Header 
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        setTime={setTime}/>
        <Timer time={time}/>
      <TouchableOpacity 
        onPress={handleStartStop}
        style={styles.button}>
        <Text style={{color: "white", fontWeight:"bold"}}>{isActive ? "STOP" : "START"}</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 32,
    fontWeight:'bold',
  },
  button: {
    alignItems: "center",
    backgroundColor:"#333333",
    padding: 15,
    margin: 15,
    borderRadius: 10,
  }
});
