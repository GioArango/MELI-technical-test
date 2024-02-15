import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useState } from "react";

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL    

export const useAxiosFetch = <T>(params: AxiosRequestConfig) => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<unknown | string | null | AxiosError>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async (): Promise<void> => {
        try {
            setLoading(true);
            const response = await axios.request(params);
            setData(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(`Axios Error: ${error.message}`);
            } else {
                setError(error);
            }
        } finally {
            setLoading(false);
        }
    };

    return [data, error, loading, fetchData] as const;
};