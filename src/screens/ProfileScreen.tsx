import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '../shared/theme/ThemeContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function ProfileScreen({route, navigation}: Props) {
  const theme = useTheme();
  const {userId} = route.params;

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Text style={[styles.title, {color: theme.colors.text}]}>
        Profile Screen
      </Text>
      <Text style={[styles.subtitle, {color: theme.colors.textSecondary}]}>
        User ID: {userId}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
});