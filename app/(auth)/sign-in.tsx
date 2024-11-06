import React, {useState} from 'react';
import {View, Text, ScrollView, Image, Alert} from 'react-native';
import {Link, router} from 'expo-router';
import {SafeAreaView} from "react-native-safe-area-context";
import {images} from '../../constants'
import FormField from "../../components/FormField";
import CustomButton from "@/components/CustomButton";
import {CreateUser, getCurrentUser, signIn} from "@/lib/appwrite";
import {useGlobalContext} from "@/context/GlobalProvider";

const SignIn = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { setUser, setIsLoggedin } = useGlobalContext();
    const submit = async () => {
        if (form.email === "" || form.password === "") {
            Alert.alert('Please fill all fields');
            return;
        }
        setIsSubmitting(true);
        try {
            await signIn (form.email, form.password);
            const result = await getCurrentUser();
            setUser(result);
            setIsLoggedin(true);
            Alert.alert("Success, User signed in successfuly");
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
                    <Text className="text-2xl text-white text-semibold mt-10 font-psemibold"> Log in to Genie</Text>
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
                    <CustomButton title="Sign-In"
                                  handlePress={submit}
                                  containerStyles="mt-7"
                                  isLoading={isSubmitting}/>
                    <View className="justify-center pt-5 flex-row mt-5 gap-2">
                        <Text className="text-gray-100 font-pregular">Don't have an account?</Text>
                        <Link href="/sign-up">
                        <Text className="font-psemibold text-secondary">Sign Up</Text>
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignIn;