import axios from 'axios';

const BASE_URL = 'https://kami-backend-5rs0.onrender.com';

export const api = {
    login: async (phone, password) => {
        const response = await axios.post(`${BASE_URL}/auth`, {
            phone,
            password
        });
        return response.data;
    },

    getServices: async () => {
        const response = await axios.get(`${BASE_URL}/services`);
        console.log(response.data);
        return response.data;
    },

    getService: async (id) => {
        const response = await axios.get(`${BASE_URL}/services/${id}`);
        console.log(response.data);
        return response.data;
    },

    addService: async (name, price, token) => {
        const response = await axios.post(
            `${BASE_URL}/services`,
            { name, price },
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        return response.data;
    },

    updateService: async (id, name, price, token) => {
        const response = await axios.put(
            `${BASE_URL}/services/${id}`,
            { name, price },
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        return response.data;
    },

    deleteService: async (id, token) => {
        const response = await axios.delete(`${BASE_URL}/services/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }
};