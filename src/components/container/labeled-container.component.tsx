import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

type Props = {
    label: string;
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
};

export const LabeledContainer = (props: Props) => {
    return (
        <View style={[styles.componentContainer]}>
            <View style={styles.containerHeader}>
                <Text style={styles.labelText}>{props.label}</Text>
                <View style={styles.afterLabelText} />
            </View>
            {props.children && (
                <View style={[props.style && props.style, styles.childWrapper]}>
                    {props.children}
                </View>
            )}
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
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    labelText: {
        color: '#BEBEBE',
        fontSize: 14,
        fontWeight: '600',
        zIndex: 200,
    },
    afterLabelText: {
        display: 'flex',
        height: 1,
        flex: 1,
        backgroundColor: '#E2E2E2',
    },
    childWrapper: {
        position: 'relative',
        gap: 8,
    },
});

export default LabeledContainer;
