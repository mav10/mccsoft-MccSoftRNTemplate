import {View, Text, Button, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootNavigator';
import {setInitialized} from '../store/slices/appSlice.ts';
import {useAppDispatch, useAppSelector} from '../store/hooks.ts';
import {useTheme} from '../shared/theme/ThemeContext.tsx';
import Config from 'react-native-config';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({navigation}: Props) {
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
                    API: {Config.API_URL}
                </Text>
                <Text style={[styles.text, {color: theme.text}]}>
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
            l
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
    },
});
