import { Text, View } from 'react-native';

export const SettingsView = ({}) => {
    return (
        <View
            style={{
                display: 'flex',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Text>SettingsView</Text>
        </View>
    );
};

export default SettingsView;
