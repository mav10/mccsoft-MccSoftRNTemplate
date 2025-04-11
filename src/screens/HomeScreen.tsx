import { View, Text, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { setInitialized } from '../store/slices/appSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useStyles } from '../shared/theme/useStyles';
import Config from 'react-native-config';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector(state => state.app.isInitialized);

  const styles = useStyles(theme => ({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: theme.spacing.lg,
      backgroundColor: theme.colors.background,
    },
    text: {
      textAlign: 'center',
      fontSize: theme.fontSizes.lg,
      color: theme.colors.text,
    },
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.text}>🚀 MccSoftRNTemplate</Text>
      <View>
        <Text style={styles.text}>API: {Config.API_URL}</Text>
        <Text style={styles.text}>
          Initialized: {isInitialized ? '✅' : '❌'}
        </Text>
        <Button
          title="Toggle Init"
          onPress={() => dispatch(setInitialized(!isInitialized))}
        />
      </View>
      <Button
        title="Go to another page"
        onPress={() => navigation.navigate('NotFound')}
      />
    </View>
  );
}