import { Text, View } from 'react-native';

export const HomeControlView = ({}) => {
    return (
        <View
            style={{
                display: 'flex',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Text>HomeControl</Text>
        </View>
    );
};

export default HomeControlView;
