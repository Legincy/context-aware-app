import axios, { AxiosResponse } from 'axios';
import { AppConfig } from '../config/app.config';
import IApiResponse from '../interfaces/api-response.interface';

const apiService = axios.create({
    baseURL: AppConfig.BACKEND_URL,
});

export const postSensorData = async (data: any): Promise<IApiResponse> => {
    try {
        const response: AxiosResponse<IApiResponse> = await axios.post(AppConfig.BACKEND_URL, data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
