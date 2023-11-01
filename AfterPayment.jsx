import { StyleSheet, Text, View, TextInput, TouchableOpacity, Linking, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import sha256 from 'sha256';
import axios from 'axios';
import { Formik } from 'formik';
const Buffer = require("buffer").Buffer;
import * as Yup from 'yup';
import messaging from '@react-native-firebase/messaging';
import { NativeBaseProvider, Box, Checkbox, HStack } from "native-base";

const useInitialURL = () => {
  const [url, setUrl] = useState(null);
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL();
      // The setTimeout is just for testing purpose
      setInterval(() => {
        setUrl(initialUrl);
        // console.log(initialUrl);
        setProcessing(false);
      }, 1000);
    };

    getUrlAsync();

  }, []);

  return { url, processing };
};
const AfterPayment = () => {
  const saltKey = '892f68a5-f75e-40ce-96cc-0a71a5b2abc7';
  const [paymentUrl, setPaymentUrl] = useState();
  const [paymentValue, setPaymentValue] = useState();
  const [phoneNumbers, setPhoneNumbers] = useState(9732658674);
  const { url: initialUrl, processing } = useInitialURL();
  const [groupValues, setGroupValues] = useState([]);
  useEffect(() => {
    if (paymentUrl) {
      Linking.openURL(paymentUrl);
      console.log("url:", paymentUrl);
    }
  }, [paymentUrl]);

  const payMentHandeler = async () => {
    const payload = {
      "merchantId": "ROADUAT",
      "merchantTransactionId": "MT7850590068188104",
      "merchantUserId": "MUID123",
      "amount": 100 * paymentValue,
      "redirectUrl": "roadserve://.MainActivity",
      "redirectMode": "POST",
      "callbackUrl": "roadserve://.MainActivity",
      "mobileNumber": "9999999999",
      "paymentInstrument": {
        "type": "PAY_PAGE"
      }
    }
    let encodedAuth = new Buffer(JSON.stringify(payload)).toString("base64");
    let shaValue = sha256(encodedAuth + "/pg/v1/pay" + saltKey) + "###" + 1;

    const options = {
      method: 'POST',
      url: 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-VERIFY': shaValue
      },
      data: { request: encodedAuth }
    };

    axios
      .request(options)
      .then((response) => {
        // console.log(response.data.data.instrumentResponse.redirectInfo.url);
        setPaymentUrl(response.data.data.instrumentResponse.redirectInfo.url);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const userSchema = Yup.object().shape({
    email: Yup.string().email().required('Pls, enter your email address..................'),
    phoneNumber: Yup.number().required('Pls, enter your mobile number..................')
  });

  // const getDeviceToken = async () => {
  //   await messaging().registerDeviceForRemoteMessages();
  //   const token = await messaging().getToken();
  //   console.log("token:", token);
  // }

  // useEffect(() => {
  //   getDeviceToken();
  // }, []);

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });
  //   return unsubscribe;
  // }, []);



  return (
    // <View>
    //   <TextInput value={paymentValue} onChangeText={(e) => { setPaymentValue(e) }} keyboardType='number-pad' style={{ marginBottom: 20, borderWidth: 3, borderColor: "violet", padding: 6 }} placeholder='write your amount' />
    //   <TouchableOpacity onPress={payMentHandeler} style={{ marginBottom: 20, alignSelf: "center", borderWidth: 3, borderColor: "violet", padding: 10, height: 50, width: 100, borderRadius: 20, }}>
    //     <Text style={{ textAlign: "center", color: "black" }}>Tap To Pay</Text>
    //   </TouchableOpacity>
    // </View>

    // <Formik
    //   initialValues={{ email: '', phoneNumber: '' }}
    //   onSubmit={(values, { resetForm }) => { console.log("values of input field", values); resetForm({ values: '' }); }}
    //   validationSchema={userSchema}
    // >
    //   {({ handleChange, handleSubmit, errors, touched, values, }) => (
    //     <View>
    //       <TextInput
    //         onChangeText={handleChange('email')}
    //         value={values.email}
    //         style={{ borderWidth: 3, borderColor: "violet", padding: 6 }}
    //         placeholder='write your email'
    //       />
    //       {errors.email && touched.email ? <Text style={{ color: "red", marginBottom: 9 }}>{errors.email}</Text> : null}
    //       <TextInput
    //         onChangeText={handleChange('phoneNumber')}
    //         value={values.phoneNumber}
    //         style={{ borderWidth: 3, borderColor: "violet", padding: 6 }}
    //         placeholder='write your phone number'
    //         keyboardType="number-pad"
    //         maxLength={10}
    //       />
    //       {errors.phoneNumber && touched.phoneNumber ? (<Text style={{ color: "red", marginBottom: 9 }}>{errors.phoneNumber}</Text>) : null}
    //       <TouchableOpacity onPress={handleSubmit} style={{ marginBottom: 20, alignSelf: "center", borderWidth: 3, borderColor: "violet", padding: 10, height: 50, width: 100, borderRadius: 20, }}>
    //         <Text style={{ textAlign: "center", color: "black" }}>Submit</Text>
    //       </TouchableOpacity>
    //     </View>
    //   )}
    // </Formik>
    <Checkbox.Group onChange={setGroupValues} value={groupValues} accessibilityLabel="choose numbers">
      <Checkbox value="one" my={2}>
        UX Research
      </Checkbox>
      <Checkbox value="two">Software Development</Checkbox>
    </Checkbox.Group>
    // <TouchableOpacity onPress={() => Linking.openURL(`tel:${phoneNumbers}`)}>
    //   <Text style={{ color: "black", fontSize: 60 }}>call</Text>
    // </TouchableOpacity>

    // <TouchableOpacity onPress={() => Linking.openURL(`sms:${phoneNumbers}`)}>
    //   <Text style={{ color: "black", fontSize: 60 }}>SMS</Text>
    // </TouchableOpacity>
  )
}


const styles = StyleSheet.create({})
export default AfterPayment