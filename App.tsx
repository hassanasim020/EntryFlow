// App.js
import React from 'react';
import { ThemeProvider } from './src/Themes/ThemeContext';
import {NavigationContainer} from '@react-navigation/native';

import MyStack from '././src/Navigation/StackNavigator';

export default function App() {
  return (
    <ThemeProvider>
      <MyStack/>
    </ThemeProvider>
  );
}
