import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import Textinput from '../../Components/TextInput';
import { useTheme } from '../../Themes/ThemeContext';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';

const SignUpScreen = ({ navigation }) => {
  const { theme, toggleTheme } = useTheme();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSignUp = () => {
    if(!form.email || !form.password){
        alert('Missing Fields!');
        return;
    }
    alert('Signed Up!');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={theme.mode === 'light' ? 'dark-content' : 'light-content'} />
      <Text style={[styles.title, { color: theme.text }]}>Get Your Free Account</Text>
      <GoogleSigninButton style={{ width: 313, height: 50, marginBottom: 20 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}/>
      <Text style={[styles.ORText, {color: theme.text}]}>OR</Text>
      <Text style={[styles.title1, { color: theme.text}]} > `Work Email</Text>
      <Textinput placeholder="hello@company.com" onChangeText={(text) => handleChange('email', text)} />
      <Text style={[styles.title1, { color: theme.text}]} >Enter Your Password</Text>
      <Textinput placeholder="Create New Password" secureTextEntry onChangeText={(text) => handleChange('password', text)} />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.button }]}
        onPress={handleSignUp}
      >
        <Text style={[styles.buttonText, { color: theme.buttonText }]}>Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.sign}>
        <TouchableOpacity onPress={() => navigation?.navigate?.('Login')}>
           <Text style={[styles.signUp, { color: theme.text }]}>
              Already have an account?{' '}
            <Text style={{ color: theme.ForgotPassword, fontWeight: 'bold' }}>Log In</Text>
           </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={toggleTheme}>
        <Text style={{ color: theme.text, marginTop: 20 }}>
          Toggle to {theme.mode === 'light' ? 'Dark' : 'Light'} Mode
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 110,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 30,
    // textAlign: 'center',
  },
  ORText: {
    justifyContent: 'center',
    marginLeft: 140,
    marginTop: 20,
    fontSize: 15,
    marginBottom: 20,
  },
  title1: {
    // fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
    marginLeft: 6,
  },
  sign:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    // marginBottom: 30,
  },
  signUp:{
    alignSelf: 'flex-start',
  },
  button: {
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
