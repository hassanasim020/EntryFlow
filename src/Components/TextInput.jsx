import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { useTheme } from "../Themes/ThemeContext";

const Textinput = ({ placeholder, ...props }) => {
    const { theme } = useTheme();

    return(
        <TextInput
            placeholder={placeholder}
            placeholderTextColor={theme.placeholder}
            style = {[ styles.input, { backgroundColor: theme.input, color: theme.text }]}
            {...props}
        />
    );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
});

export default Textinput;