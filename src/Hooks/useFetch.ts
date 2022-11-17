import { message } from 'antd';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { BASE_URL } from '../Constants/URLs';

function useFetch<T>(url: string, params: {
    [key: string]: string | number;
}, transformer?: (data: any) => T) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<T | null>(null);

    const getData = useCallback(async () => {
        setLoading(true);
        try {
            const result = await axios(`${BASE_URL}/${url}`, {
                params: {
                    ...params,
                    api_key: process.env.API_KEY,
                },
            });
            if (transformer) {
                setData(transformer(result.data));
            } else setData(result.data);
        } catch (error) {
            console.log(error);
            message.error('Error fetching data');
        } finally {
            setLoading(false);
        }
    }, [url, params]);

    return { loading, data, getData };
}

export default useFetch;
