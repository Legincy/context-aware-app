import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

type Props = {
    label: string;
    children: JSX.Element | null;
    style?: StyleProp<ViewStyle>;
};

export const LabeledContainer = ({ label, children, style }: Props) => {
    return (
        <View style={[style && style, styles.componentContainer]}>
            <View style={styles.containerHeader}>
                <Text style={styles.labelText}>{label}</Text>
            </View>
            {children ?? null}
        </View>
    );
};

const styles = StyleSheet.create({
    componentContainer: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: 8,
    },
    containerHeader: {
        display: 'flex',
        flexDirection: 'row',
    },
    labelText: {
        color: '#BEBEBE',
        fontSize: 14,
        fontWeight: '600',
        zIndex: 200,
    },
    sliderValueText: {},
});

export default LabeledContainer;
