import React, {useState} from 'react';
import {View, Text, ScrollView, Image, Alert} from 'react-native';
import {Link, router} from 'expo-router';
import {SafeAreaView} from "react-native-safe-area-context";
import {images} from '@/constants'
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import {CreateUser} from "@/lib/appwrite";
const SignUp = () => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const submit = async () => {
        if (!form.username || !form.email || !form.password) {
            Alert.alert('Please fill all fields');
            return;
        }
        setIsSubmitting(true);
        try {
            const result = await CreateUser(form.email, form.password, form.username);
            router.replace('/home');
        } catch (error) {
            console.error('Error during registration:', error);
            Alert.alert('An error occurred: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className="w-full justify-center flex-1 px-4 my-6">
                    <Image source={images.logo}
                           resizeMode='contain'
                           className="w-[115px] h-[35px]"></Image>
                    <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Join Genie Today!</Text>
                    <FormField
                        title="Username"
                        value={form.username}
                        handleChangeText={(e) => setForm({...form, username: e})}
                        otherStyles="mt-10"
                    />
                    <FormField
                        title="Email"
                        value={form.email}
                        handleChangeText={(e) => setForm({...form, email: e})}
                        otherStyles="mt-7"
                        keyboardType="email-address" //autofill
                    />
                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={(e) => setForm({...form, password: e})}
                        otherStyles="mt-7"
                    />
                    <CustomButton title="Register"
                                  handlePress={submit}
                                  containerStyles="mt-7"
                                  isLoading={isSubmitting}/>
                    <View className="justify-center pt-5 flex-row mt-5 gap-2">
                        <Text className="text-gray-100 font-pregular">Have an account already?</Text>
                        <Link href="/sign-in">
                            <Text className="font-psemibold text-secondary">Sign In</Text>
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUp;