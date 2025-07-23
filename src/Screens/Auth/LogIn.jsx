import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Alert } from 'react-native';
import Textinput from '../../Components/TextInput';
import { useTheme } from '../../Themes/ThemeContext';
import auth from '@react-native-firebase/auth';
import Spinner from 'react-native-loading-spinner-overlay';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';

const LoginScreen = ({ navigation }) => {
  const { theme, toggleTheme } = useTheme();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setloading] = useState(false);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Missing Fields', 'Email and password are required.');
      return;
    }
    setloading(true);

    try {
      await auth().signInWithEmailAndPassword(form.email, form.password);
      Alert.alert('Success', 'Logged in successfully!');
      // navigation.navigate('HomeScreen'); // add when navigation is set
    } catch (error) {
      console.log('Login Error:', error.code);
      let msg = 'Something went wrong';
      if (error.code === 'auth/user-not-found') {
        msg = 'No user found with this email';
      } else if (error.code === 'auth/wrong-password') {
        msg = 'Incorrect password';
      } else if (error.code === 'auth/invalid-email') {
        msg = 'Invalid email address';
      }
      Alert.alert('Login Failed', msg);
    }finally {
    setLoading(false);
  }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={theme.mode === 'light' ? 'dark-content' : 'light-content'} />
      <Text style={[styles.title, { color: theme.text }]}>Log In To Scale</Text>
      <Text style={[styles.title1, { color: theme.text}]} >Email</Text>
      <Textinput
        placeholder="hello@company.com"
        keyboardType="email-address"
        onChangeText={(text) => handleChange('email', text)}
      />
      <Text style={[styles.title1, { color: theme.text}]} >Password</Text>
      <Textinput
        placeholder="Your Password"
        secureTextEntry
        onChangeText={(text) => handleChange('password', text)}
      />
      <TouchableOpacity>
      <Text style={[styles.forgotPasswordText, { color: theme.ForgotPassword }]}>
         Forgot Password?
      </Text>
      </TouchableOpacity>
            <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.button }]}
        onPress={handleLogin}
      >
        <Text style={[styles.buttonText, { color: theme.buttonText }]}>Log In</Text>
      </TouchableOpacity>
      <Text style={[styles.ORText, {color: theme.text}]}>OR</Text>
      <GoogleSigninButton
  style={{ width: 313, height: 50, marginTop: 20 }}
  size={GoogleSigninButton.Size.Wide}
  color={GoogleSigninButton.Color.Light}
  // onPress={handleGoogleLogin}
/>
      {/* <View style={styles.sign}>
  <TouchableOpacity onPress={() => navigation?.navigate?.('SignUp')}>
    <Text style={[styles.signUp, { color: theme.text }]}>
      Don’t have an account?{' '}
      <Text style={{ color: theme.SignUpText, fontWeight: 'bold' }}>Sign up</Text>
    </Text>
  </TouchableOpacity>

</View> */}

      <TouchableOpacity onPress={toggleTheme}>
        <Text style={{ color: theme.text, marginTop: 20 }}>
          Toggle to {theme.mode === 'light' ? 'Dark' : 'Light'} Mode
        </Text>
      </TouchableOpacity>

      {loading && (
        <View style={styles.overlay}>
          <Spinner
            visible={true}
            textContent={'Logging in...'}
            textStyle={{ color: '#fff' }}
            color={theme.button}
             overlayColor="rgba(0, 0, 0, 0.5)"
          />
        </View>
      )}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'left',
  },
  title1: {
    // fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
    marginLeft: 6,
  },
  sign:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: 20,
    // marginBottom: 30,
  },
  signUp:{
    alignSelf: 'flex-start',
  },
  forgotPassword: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    // color: theme.SignUpText,
    // fontSize: 10,
    fontWeight: '500',
    textAlign: 'Left',
  },
  button: {
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  ORText: {
    justifyContent: 'center',
    marginLeft: 140,
    marginTop: 20,
    fontSize: 15,
  },
});
