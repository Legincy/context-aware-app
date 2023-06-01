import axios from 'axios';
import { AppConfig } from '../config/app.config';
import IApiResponse from '../interfaces/api-response.interface';

const apiService = axios.create({
    baseURL: AppConfig.BACKEND_URL,
});

export const postSensorData = async (data: any): Promise<IApiResponse> => {
    try {
        const response = await apiService.post('', data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Fehler beim Senden der Sensordaten');
    }
};
