import { Ionicons } from '@expo/vector-icons';
import {
    StyleProp,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableHighlightProps,
    View,
    ViewStyle,
} from 'react-native';
import { AppConfig } from '../../config/app.config';

type Props = {
    label: string;
    color?: string;
    icon?: any;
    style?: StyleProp<ViewStyle>;
    isDisabled?: boolean;
    onPress?: () => void;
};

export const IconButton = (props: Props & TouchableHighlightProps) => {
    const { isDisabled = false } = props;

    const buttonStyle = [
        styles.componentContainer,
        { backgroundColor: props.color ?? AppConfig.APP_COLOR },
        props.style,
        isDisabled && styles.btnDisabled,
    ];

    return (
        <TouchableHighlight
            activeOpacity={0.6}
            underlayColor={props.color}
            style={buttonStyle}
            disabled={isDisabled}
            onPress={props.onPress && !isDisabled ? props.onPress : null}
        >
            <View style={styles.buttonWrapper}>
                {props.icon && <Ionicons style={styles.buttonIcon} name={props.icon} size={16} />}
                <Text style={styles.buttonText}>{props.label}</Text>
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    componentContainer: {
        borderRadius: 100,
        height: 50,
        position: 'relative',
        width: '100%',
    },
    buttonWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
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
    btnDisabled: {
        backgroundColor: '#E2E2E2',
        borderWidth: 1,
        borderColor: '#BEBEBE',
    },
});

export default IconButton;
