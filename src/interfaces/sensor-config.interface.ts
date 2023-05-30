import { Subscription } from 'expo-sensors/build/Pedometer';

export interface ISensorConfig {
    isActive: boolean;
    isActiveInBackground: boolean;
    updateInterval: number;
    subscription: Subscription | null;
    cache: any[];
    readonly type: string;
}

export interface IRegisteredSensor {
    [sensor: string]: ISensorConfig;
}
