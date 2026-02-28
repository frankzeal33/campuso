import AuthHeader from '@/components/AuthHeader'
import CountDown from '@/components/CountDown'
import CustomButton from '@/components/CustomButton'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { OtpInput } from 'react-native-otp-entry'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const RegisterOTP = () => {

  const { bottom } = useSafeAreaInsets();

  const [otp, setOtp] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [resend, setResend] = useState(false)
  const [emailKey, setEmailKey] = useState(0);

  const submit = async () => {
    router.push("/(protected)/(drawer)/(tabs)/home")

  }

  const resendOtp = async () => {

  }

  return (
    <View className="flex-1 bg-green">
      <AuthHeader/>
      <View className='flex-1 bg-white px-5 rounded-t-3xl'>
        <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 0}>
          <ScrollView showsVerticalScrollIndicator={false} className='flex-1'>
            <View className="w-full justify-center my-6">
              <Text className="text-2xl text-center text-green font-msbold">Verify your email</Text>
              <Text className="text-sm text-center font-mregular mb-8">Enter <Text className='text-gray-300 font-mbold'>6 (Six)-digit</Text> OTP code sent to <Text className='text-gray-300 font-mbold'>userid@gmail.com</Text></Text>
              <View className='mt-5'>
                <Text className="text-base text-green font-msbold mb-2">Enter Code</Text>
                <OtpInput
                  key={emailKey}
                  numberOfDigits={6}
                  onTextChange={(text) => setOtp(text)}
                  theme={{
                    containerStyle: styles.container,
                    pinCodeContainerStyle: styles.pinCodeContainer,
                    pinCodeTextStyle: styles.pinCodeText,
                    focusStickStyle: styles.focusStick,
                    focusedPinCodeContainerStyle: styles.activePinCodeContainer,
                    placeholderTextStyle: styles.placeholderText,
                    filledPinCodeContainerStyle: styles.filledPinCodeContainer,
                    disabledPinCodeContainerStyle: styles.disabledPinCodeContainer,
                  }}
                />
                <View className="pt-8 flex-row items-center gap-1">
                  {resendLoading ? ( 
                    <FontAwesome5 name="circle-notch" size={20} color="#FF6600" className='animate-spin'/>
                  ) : !resend ? (
                    <View className='flex-row items-center gap-1'>
                      <Text className="text-base font-rregular">Resend code in</Text>
                      <CountDown
                        initialSeconds={300}
                        onFinish={() => setResend(true)}
                      />
                    </View>
                    
                  ) : ""}
                  {(resend && !resendLoading) &&
                    <TouchableOpacity onPress={resendOtp}>
                      <Text className='text-base text-green font-rbold'>Resend Code</Text>
                    </TouchableOpacity>
                  }
                </View>
              </View>
            </View>
            <View className='w-full justify-center mt-3' style={{ paddingBottom: bottom + 20 }}>
              <CustomButton title="Continue" handlePress={submit} containerStyles="w-full" isLoading={isSubmitting} textStyles='text-white'/>
              <View className="mt-6 flex-row gap-1 items-center justify-center">
                <Text className="text-sm text-center font-msbold">Already have an account?</Text>
                <TouchableOpacity onPress={() => router.push("/(auth)/Login")}>
                  <Text className="text-green font-msbold">Login</Text>
                </TouchableOpacity >
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      <StatusBar style='light'/>
    </View>
  )
}

export default RegisterOTP

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    width: 280
  },
  pinCodeContainer: {
    backgroundColor: "#F3F3F3",
    borderColor: "#218225",
    borderWidth: 1,
    borderRadius: 6,
    width: 40,
    height: 40,
    color: "#000",
    fontSize: 16,
    textAlign: "center"
  },
  pinCodeText: {
    color: '#111625',
    fontSize: 18,
    fontWeight: 'bold',
  },
  focusStick: {
    backgroundColor: '#FFAE4D',
  },
  activePinCodeContainer: {
    borderColor: '#FFAE4D',
    borderWidth: 1,
  },
  placeholderText: {
    color: '#ffffff',
  },
  filledPinCodeContainer: {
    backgroundColor: '#ffffff',
    borderColor: '#FFAE4D',
  },
  disabledPinCodeContainer: {
    backgroundColor: '#e0e0e0',
  },
});

  