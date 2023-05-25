import { Accelerometer } from 'expo-sensors';
import { Subscription } from 'expo-sensors/build/Pedometer';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import LineChartTile from '../components/charts/line-chart.chart';
import ColoredDataBox from '../features/sensor/components/colored-data-box/colored-data-box.component';

type Props = {
    updateInterval: number;
    isActive: boolean;
};

export const AccelerometerSensor = ({ updateInterval, isActive }: Props) => {
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [dataCache, setDataCache] = useState<{ x: number[]; y: number[]; z: number[] }>({
        x: [],
        y: [],
        z: [],
    });

    const [accelerometerData, setAccelerometerData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });

    const _subscribe = useCallback(() => {
        console.log('sub');
        setSubscription(Accelerometer.addListener(setAccelerometerData));
    }, []);

    const _unsubscribe = useCallback(() => {
        console.log('unsub');
        subscription?.remove();
        setSubscription(null);
    }, [subscription]);

    useEffect(() => {
        console.log(isActive);
        isActive ? _subscribe() : _unsubscribe();
    }, [isActive]);

    useEffect(() => {
        Accelerometer.setUpdateInterval(updateInterval);
    }, [updateInterval]);

    useEffect(() => {
        _subscribe();
        Accelerometer.setUpdateInterval(updateInterval);
        return () => _unsubscribe();
    }, []);

    useEffect(() => {
        setDataCache({
            x: [...dataCache.x, accelerometerData.x],
            y: [...dataCache.y, accelerometerData.y],
            z: [...dataCache.z, accelerometerData.z],
        });
    }, [accelerometerData]);

    return (
        <View style={styles.componentContainer}>
            <ColoredDataBox
                data={[
                    { label: 'X-Axis', value: accelerometerData.x },
                    { label: 'Y-Axis', value: accelerometerData.y },
                    { label: 'Z-Axis', value: accelerometerData.z },
                ]}
            />
            <LineChartTile />
        </View>
    );
};

const styles = StyleSheet.create({
    componentContainer: {
        display: 'flex',
        gap: 16,
    },
});

export default AccelerometerSensor;
