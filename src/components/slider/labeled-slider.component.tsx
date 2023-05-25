import Slider from '@react-native-community/slider';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppConfig } from '../../config/app.config';

export interface ILabeledSlider {
    label: string;
    minimumValue: number;
    maximumValue: number;
    step: number;
    onValueChange?: (v: number) => void;
}

export const LabeledSlider = ({
    label,
    minimumValue,
    maximumValue,
    step,
    onValueChange,
}: ILabeledSlider) => {
    const [value, setValue] = useState<number>(minimumValue);

    useEffect(() => {
        onValueChange && onValueChange(value);
    }, [value]);

    return (
        <View style={styles.componentContainer}>
            <View style={styles.containerHeader}>
                <Text style={styles.labelText}>{label}</Text>
                <Text style={styles.sliderValueText}>{value ?? '---'}</Text>
            </View>
            <Slider
                style={styles.slider}
                minimumValue={minimumValue}
                maximumValue={maximumValue}
                step={step ? step : maximumValue / 10}
                onValueChange={(value) => setValue(value)}
                minimumTrackTintColor='#BA68F9'
                maximumTrackTintColor='#D1D1D1'
                thumbTintColor={AppConfig.APP_COLOR}
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
        height: 50,
        paddingHorizontal: 8,
    },
});

export default LabeledSlider;
