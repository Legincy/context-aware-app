import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton } from '../components/button/icon-button.component';
import LabeledContainer from '../components/container/labeled-container.component';
import SensorConfig from '../components/drop-down/config/sensor.config';
import DropDown from '../components/drop-down/drop-down.component';
import { LabeledSlider } from '../components/slider/labeled-slider.component';
import { Sensor } from '../features/sensor/sensor.config';
import AccelerometerSensor from '../sensors/accelerometer.sensor';
import GyroscopeSensor from '../sensors/gyroscope.sensor';

type Props = {};

export const SensorView = (props: Props) => {
    const [subscriptionStatus, setSubscriptionStatus] = useState<boolean>(true);
    const [selectedSensor, setSelectedSensor] = useState<string | null>(null);
    const [updateInterval, setUpdateInterval] = useState<number>(500);

    const dynamicSensorComponent = () => {
        switch (selectedSensor) {
            case Sensor.ACCELEROMETER:
                return (
                    <AccelerometerSensor
                        updateInterval={updateInterval}
                        isActive={subscriptionStatus}
                    />
                );
            case Sensor.GYROSCOPE:
                return <GyroscopeSensor updateInterval={updateInterval} />;
            default:
                return null;
        }
    };

    useEffect(() => {
        console.log(selectedSensor);
    }, [selectedSensor]);

    return (
        <View style={styles.componentContainer}>
            {selectedSensor !== null ? (
                <LabeledContainer label='Sensor Data'>{dynamicSensorComponent()}</LabeledContainer>
            ) : null}

            <LabeledContainer style={styles.sensorControlWrapper} label='Sensor Settings'>
                <View style={styles.sensorControl}>
                    <View style={styles.sensorSettings}>
                        <DropDown
                            items={SensorConfig}
                            setValue={(sensor) => setSelectedSensor(sensor)}
                        />
                        <LabeledSlider
                            label={'Update Interval'}
                            minimumValue={500}
                            maximumValue={10000}
                            step={500}
                            onValueChange={setUpdateInterval}
                        />
                    </View>

                    <IconButton
                        label={subscriptionStatus ? 'Deactivate' : 'Activate'}
                        icon='power'
                        color={subscriptionStatus ? '#DC3545' : '#3BA55C'}
                        onPress={() => setSubscriptionStatus(!subscriptionStatus)}
                    />
                </View>
            </LabeledContainer>
        </View>
    );
};

const styles = StyleSheet.create({
    componentContainer: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 16,
        paddingTop: 16,
        justifyContent: 'space-between',
        gap: 32,
    },
    sensorControlWrapper: {
        marginTop: 'auto',
    },
    sensorControl: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 48,
    },
    sensorSettings: {
        display: 'flex',
        gap: 12,
    },
});

export default SensorView;
