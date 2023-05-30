import { ISensorConfig } from '../../../../../interfaces/sensor-config.interface';

export const defaultSensorConfig: ISensorConfig = {
    isActive: true,
    isActiveInBackground: false,
    updateInterval: 1000,
    subscription: null,
    cache: [],
};
