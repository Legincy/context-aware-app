import { Subscription } from 'expo-sensors/build/Pedometer';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import uuid from 'react-native-uuid';
import LabeledContainer from '../components/container/labeled-container.component';
import dropDownSensorConfig from '../components/drop-down/config/sensor.config';
import DropDown from '../components/drop-down/drop-down.component';
import CheckBox from '../components/form/checkbox.form';
import { IconButton } from '../components/form/icon-button.form';
import LabeledSlider from '../components/slider/labeled-slider.component';
import { AppConfig } from '../config/app.config';
import { defaultSensorConfig } from '../features/sensor/components/colored-data-box/config/default-sensor.config';
import { Sensor } from '../features/sensor/sensor.config';
import ICacheData from '../interfaces/cache-data.interface';
import { IRegisteredSensor as ISensorRegister } from '../interfaces/sensor-config.interface';
import ISensorData from '../interfaces/sensor-data.interface';
import AccelerometerSensor from '../sensors/accelerometer.sensor';
import GyroscopeSensor from '../sensors/gyroscope.sensor';
import { postSensorData } from '../shared/api.shared';

type Props = {};

export const SensorView = (props: Props) => {
    const [sessionId, setSessionId] = useState<string | number[]>(uuid.v4);
    const [sensorRegister, setSensorRegister] = useState<ISensorRegister>({});
    const [selectedSensor, setSelectedSensor] = useState<string | null>(null);

    const updateSensorTask = (subscription: Subscription | null) => {
        if (selectedSensor === null) return;
        setSensorRegister({
            ...sensorRegister,
            [selectedSensor]: { ...sensorRegister[selectedSensor], subscription },
        });
    };

    const onSensorTaskEvent = (sensorData: ISensorData) => {
        if (!sensorRegister.hasOwnProperty(sensorData.sensor)) return;
        const extractedPayload = Object.keys(sensorData.payload).map((key: string): ICacheData => {
            return {
                measurementId: sessionId,
                timestamp: sensorData.timestamp,
                value: sensorData.payload[key],
                sensor: key,
            };
        });

        setSensorRegister((prevState) => ({
            ...prevState,
            [sensorData.sensor]: {
                ...prevState[sensorData.sensor],
                cache: [...prevState[sensorData.sensor].cache, ...extractedPayload],
            },
        }));
    };

    const setUpdateInterval = (updateInterval: number) => {
        if (selectedSensor === null) return;
        setSensorRegister({
            ...sensorRegister,
            [selectedSensor]: { ...sensorRegister[selectedSensor], updateInterval },
        });
    };

    const toggleIsActive = () => {
        if (selectedSensor === null) return;
        setSensorRegister({
            ...sensorRegister,
            [selectedSensor]: {
                ...sensorRegister[selectedSensor],
                isActive: !sensorRegister[selectedSensor].isActive,
            },
        });
    };

    const setIsActiveInBackground = (isActiveInBackground: boolean) => {
        console.log('FUNCTION::setIsActiveInBackground::' + isActiveInBackground);
        if (selectedSensor === null) return;
        setSensorRegister({
            ...sensorRegister,
            [selectedSensor]: {
                ...sensorRegister[selectedSensor],
                isActiveInBackground: isActiveInBackground,
            },
        });
    };

    const sensorComponents = () => {
        if (selectedSensor === null || !sensorRegister.hasOwnProperty(selectedSensor)) return;

        const componentMap: {
            [key in string]?: JSX.Element;
        } = {
            [Sensor.ACCELEROMETER]: (
                <AccelerometerSensor
                    config={sensorRegister[selectedSensor]}
                    onTaskUpdate={updateSensorTask}
                    onSensorEvent={onSensorTaskEvent}
                />
            ),
            [Sensor.GYROSCOPE]: (
                <GyroscopeSensor
                    config={sensorRegister[selectedSensor]}
                    onTaskUpdate={updateSensorTask}
                    onSensorEvent={onSensorTaskEvent}
                />
            ),
        };

        return componentMap[selectedSensor];
    };

    const handleDataSending = async (data: any[]) => {
        try {
            const response = await postSensorData(data);
            console.log(`sent ${data.length} items`);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    useEffect(() => {
        console.log('USE_EFFECT::selectedSensor');
        if (selectedSensor === null || sensorRegister.hasOwnProperty(selectedSensor)) return;

        const newSensorConfig = { ...defaultSensorConfig, type: selectedSensor };
        setSensorRegister((prevRegister) => ({
            ...prevRegister,
            [selectedSensor]: newSensorConfig,
        }));
    }, [selectedSensor]);

    useEffect(() => {
        if (Object.keys(sensorRegister).length === 0) return;
        Object.keys(sensorRegister).forEach(async (sensor) => {
            if (sensorRegister[sensor].cache.length >= AppConfig.CACHE_SIZE) {
                if (await handleDataSending(sensorRegister[sensor].cache)) {
                    setSensorRegister((prevState) => ({
                        ...sensorRegister,
                        [sensor]: { ...sensorRegister[sensor], cache: [] },
                    }));
                }
            }
        });
    }, [sensorRegister]);

    useEffect(() => {
        if (selectedSensor === null) return;
        handleDataSending(sensorRegister[selectedSensor].cache);
        setSensorRegister((prevState) => ({
            ...prevState,
            [selectedSensor]: { ...prevState[selectedSensor], cache: [] },
        }));
    }, [sessionId]);

    return (
        <View style={styles.componentContainer}>
            {selectedSensor !== null && (
                <View style={styles.sensorViewWrapper}>
                    <View style={styles.sensorContainer}>{sensorComponents()}</View>
                    <LabeledContainer label='Sensor Settings'>
                        <View>
                            <LabeledSlider
                                label={'Update Interval'}
                                minimumValue={200}
                                maximumValue={10000}
                                step={100}
                                value={sensorRegister[selectedSensor]?.updateInterval}
                                onValueChange={setUpdateInterval}
                            />
                            <CheckBox
                                value={sensorRegister[selectedSensor]?.isActiveInBackground}
                                onChange={setIsActiveInBackground}
                                label='Stay active in background'
                            />
                        </View>
                    </LabeledContainer>
                </View>
            )}

            <LabeledContainer label='Session Settings'>
                <DropDown
                    items={dropDownSensorConfig}
                    setValue={(sensor: string) => setSelectedSensor(sensor)}
                />
                <IconButton
                    label={
                        selectedSensor !== null && sensorRegister[selectedSensor]?.isActive === true
                            ? 'Deactivate'
                            : 'Activate'
                    }
                    icon='power'
                    isDisabled={selectedSensor === null}
                    color={
                        selectedSensor !== null && sensorRegister[selectedSensor]?.isActive
                            ? '#DC3545'
                            : '#3BA55C'
                    }
                    style={styles.sensorControlBtn}
                    onPress={toggleIsActive}
                />
                <View style={styles.sessionCtrlWrapper}>
                    <IconButton label={'New Session'} onPress={() => setSessionId(uuid.v4())} />
                    <Text style={styles.sessionLabel}>{sessionId}</Text>
                </View>
            </LabeledContainer>
        </View>
    );
};

const styles = StyleSheet.create({
    componentContainer: {
        position: 'relative',
        display: 'flex',
        paddingHorizontal: 16,
        paddingBottom: 16,
        paddingTop: 16,
        justifyContent: 'flex-end',
        flex: 1,
        gap: 8,
    },
    sensorViewWrapper: {
        position: 'relative',
        display: 'flex',
        gap: 16,
        width: '100%',
    },
    sensorContainer: {
        position: 'relative',
    },
    sensorControlBtn: {},
    sessionCtrlWrapper: { display: 'flex', alignItems: 'center', width: '100%', gap: 4 },
    newSessionBtn: {},
    sessionLabel: {
        color: '#BEBEBE',
        fontSize: 13,
        fontWeight: '400',
    },
});

export default SensorView;
