import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {ProvidersGate} from './providers.tsx';
import {useTheme} from '../shared/theme/ThemeContext.tsx';
import {useAppDispatch, useAppSelector} from '../store/hooks.ts';
import {setInitialized} from '../store/slices/appSlice.ts';

const Content = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector(state => state.app.isInitialized);

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <Text style={[styles.text, {color: theme.text}]}>
        🚀 MccSoftRNTemplate
      </Text>

      <View>
        <Text style={[styles.text, {color: theme.text}]}>
          Initialized: {isInitialized ? '✅' : '❌'}
        </Text>
        <Button
          title="Toggle Init"
          onPress={() => dispatch(setInitialized(!isInitialized))}
        />
      </View>
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
    gap: 20,
  },
  text: {
    fontSize: 20,
  },
});

export default App;
