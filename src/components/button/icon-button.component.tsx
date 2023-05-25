import { Ionicons } from '@expo/vector-icons';
import { Button, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { AppConfig } from '../../config/app.config';

export interface IIconButton {
    label: string;
    color?: string;
    icon: any;
    onPress: () => {} | any;
}

export const IconButton = ({ label, color, icon, onPress }: IIconButton) => {
    return (
        <TouchableHighlight
            activeOpacity={0.6}
            underlayColor={color}
            style={{
                ...styles.componentContainer,
                ...{ backgroundColor: color ?? AppConfig.APP_COLOR },
            }}
            onPress={onPress}
        >
            <View style={styles.buttonWrapper}>
                {icon && <Ionicons style={styles.buttonIcon} name={icon} size={16} />}
                <Text style={styles.buttonText}>{label}</Text>
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    componentContainer: {
        borderRadius: 100,
        height: 50,
        position: 'relative',
    },
    buttonWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        width: '100%',
    },
    buttonIcon: {
        color: 'white',
        fontSize: 20,
    },
    buttonText: {
        color: 'white',
        letterSpacing: 0.3,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
});

export default Button;
