import Slider from '@react-native-community/slider';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
    label: string;
    minimumValue: number;
    maximumValue: number;
    value?: number;
    isDisabled?: boolean;
    step: number;
    onValueChange: (v: number) => void;
    dotSize?: number; // New prop for dot size
};

export const LabeledSlider = (props: Props) => {
    const dotSize = props.dotSize || 20; // Default dot size if not provided

    return (
        <View style={styles.componentContainer}>
            <View style={styles.containerHeader}>
                <Text style={styles.labelText}>{props.label}</Text>
                <Text style={styles.sliderValueText}>{props.value ?? '---'}</Text>
            </View>
            <Slider
                disabled={props.isDisabled}
                style={styles.slider}
                value={props.value}
                minimumValue={props.minimumValue}
                maximumValue={props.maximumValue}
                step={props.step ?? props.maximumValue / 10}
                onValueChange={(v) => props.onValueChange(v)}
                minimumTrackTintColor='#BA68F9'
                maximumTrackTintColor='#D1D1D1'
                thumbTintColor='#FFFFFF'
            />
        </View>
    );
};

const styles = StyleSheet.create({
    componentContainer: {
        position: 'relative',
        zIndex: 100,
    },
    containerHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    labelText: {
        color: '#BEBEBE',
        fontSize: 13,
        fontWeight: '400',
    },
    sliderValueText: {
        color: '#BEBEBE',
        fontSize: 13,
        fontWeight: '400',
    },
    slider: {
        width: '100%',
        height: 40,
        paddingHorizontal: 8,
    },
});

export default LabeledSlider;
