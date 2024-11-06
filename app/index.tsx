import { useState } from "react";
import {Animated, Text, TouchableOpacity, View, Image, StatusBar} from "react-native"
import {Link, Redirect, router} from "expo-router"
import "../global.css";
import {SafeAreaView} from "react-native-safe-area-context";
import ScrollView = Animated.ScrollView;
import {images} from "../constants"
import CustomButton from "../components/CustomButton";

export default function Index() {
  return (
      <SafeAreaView className="bg-primary h-full">
        <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}} >
          <View className="w-full justify-center items-center px-4">
              <Image source={images.logo} className="w-[130px] h-[84px]" resizeMode="contain"></Image>
              <Image source={images.cards} className="max-w-[380px] w-full h-[300px]"
                     resizeMode="contain" />
              <View className="relative mt-5">
                  <Text className="text-3xl text-white font-bold text-center"> Discover Endless Creative Possibilities with{' '}<Text className="text-secondary"> Genie </Text></Text>
                  <Image source={images.path} className="w-[136px] h-[15px] absolute -bottom-2 -right-5" resizeMode="contain" ></Image>
              </View>
              <Text className="mt-5 text-sm text-gray-100 font-pregular text-center"> Where creativity meets innovation: Embark on a journey of limitless possibilities </Text>
          <CustomButton title="Continue with Email"
                        handlePress={()=> router.push('/sign-in')}
                        containerStyles="w-full mt-7"/>
          </View>

        </ScrollView>
          <StatusBar backgroundColor="#161622" style='light' />
      </SafeAreaView>
  );
 5
}