import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ProvidersGate} from './providers.tsx';
import {useTheme} from '../shared/theme/ThemeContext.tsx';

const Content = () => {
  const theme = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <Text style={[styles.text, {color: theme.text}]}>
        🚀 MccSoftRNTemplate
      </Text>
    </View>
  );
};

const App = () => {
  return (
    <ProvidersGate>
      <Content />
    </ProvidersGate>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
    },
});

export default App;
