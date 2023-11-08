import { StyleSheet, Text, TouchableOpacity, View, Linking, TextInput, Alert } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import New from './New';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AfterPayment from './AfterPayment';
import { Button as RegButton } from 'native-base';
import { NativeBaseProvider, Box, extendTheme, Button, HStack, Checkbox, Input, VStack, IconButton } from "native-base";
import Clipboard, { useClipboard } from '@react-native-community/clipboard';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import RandomFunc from './Components/RandomFunc';



// const linking = {
//   prefixes: ['https://roadserve.in/', 'NewPractice_App://afterPayment'],
//   config,
// };
const Stack = createNativeStackNavigator();
const App = () => {
  const [data, setString] = useClipboard();
  const [selected, setSelected] = useState('');
  const readFromClipboard = async () => {
    //To get the text from clipboard
    let clipboardContent = await Clipboard.getString();
    Alert.alert('Text from Clipboard: ' + clipboardContent);
  };

  const focusPoint = useRef(null);
  const onClickHandler = () => {
    // console.log(focusPoint.current)
    focusPoint.current.focus();
  }
  return (
    <NativeBaseProvider>
      {/* <NavigationContainer linking={linking}>
        <Stack.Navigator initialRouteName="AfterPayment">
          <Stack.Screen name="AfterPayment" component={AfterPayment} />
          <Stack.Screen name="New" component={New} />
        </Stack.Navigator>
      </NavigationContainer> */}
      {/* <HStack space={6} style={styles.hStack}>
        <Checkbox value="test" accessibilityLabel="This is a dummy checkbox" style={styles.checkbox} colorScheme={"blue"} onChange={(e) => console.log("checked", e)} shadow={2} />
      </HStack> */}
      {/* <Checkbox value="one" my={2} style={styles.hStack} onChange={(e) => {
        console.log("check :", e);
      }} colorScheme={"blue"} size="lg" _disabled={true}>
        <Text style={{ color: "#007AFF" }}>UX Research</Text>
      </Checkbox> */}
      {/* <TouchableOpacity onPress={readFromClipboard}>
        <Text>copy from clipboard</Text>
      </TouchableOpacity> */}

      {/* <Calendar
        style={{ borderWidth: 1, borderColor: "#EFF1F6", borderRadius: 12, backgroundColor: "#FFF", elevation: 19 }}
        onDayPress={day => {
          setSelected(day.dateString);
          console.log("date : ", day.dateString)
        }}
        markedDates={{
          [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
        }}
      /> */}

      <TextInput ref={focusPoint} />
      <TouchableOpacity onPress={onClickHandler}>
        <Text>Action</Text>
      </TouchableOpacity>
      <RandomFunc />
    </NativeBaseProvider>
  )
}


export default App
const styles = StyleSheet.create({
  hStack: {
    // borderWidth: 1,
    // borderColor: "red",
    justifyContent: "center",
    alignItems: "center"
  },
  checkbox: {
    color: "#0000FF",
  }
})