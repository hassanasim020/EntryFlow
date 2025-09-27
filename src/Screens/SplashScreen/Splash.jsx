import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { useTheme } from '../../Themes/ThemeContext';

const SplashScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);
  const rotateAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('SignUp');
    }, 2500);

    return () => clearTimeout(timer);
  }, [fadeAnim, slideAnim, rotateAnim, navigation]);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Animated.View 
        style={[
          styles.content,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }] 
          }
        ]}
      >
        <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
          <View style={[styles.logoCircle, { borderColor: theme.primary }]}>
            <Text style={[styles.logoText, { color: theme.primary }]}>A</Text>
          </View>
        </Animated.View>
        
        <Text style={[styles.appName, { color: theme.text }]}>YourApp</Text>
        <Text style={[styles.tagline, { color: theme.text, opacity: 0.7 }]}>
          Building Amazing Experiences
        </Text>
      </Animated.View>
      
      <View style={styles.loadingContainer}>
        <Animated.View 
          style={[
            styles.loadingDot, 
            { backgroundColor: theme.primary },
            { opacity: fadeAnim }
          ]} 
        />
        <Animated.View 
          style={[
            styles.loadingDot, 
            { backgroundColor: theme.primary },
            { 
              opacity: fadeAnim,
              animationDelay: '200ms'
            }
          ]} 
        />
        <Animated.View 
          style={[
            styles.loadingDot, 
            { backgroundColor: theme.primary },
            { 
              opacity: fadeAnim,
              animationDelay: '400ms'
            }
          ]} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
  },
  loadingContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  loadingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default SplashScreen;