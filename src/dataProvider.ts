import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/';

const dataProvider = {
    // Function to fetch data from the API
    async fetchData(endpoint: string) {
        try {
            const response = await axios.get(API_BASE_URL + endpoint);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    },

    // Function to create data via the API
    async createData(endpoint: string, data: any) {
        try {
            const response = await axios.post(API_BASE_URL + endpoint, data);
            return response.data;
        } catch (error) {
            console.error('Error creating data:', error);
            throw error;
        }
    },

    // Function to update data via the API
    async updateData(endpoint: string, data: any) {
        try {
            const response = await axios.put(API_BASE_URL + endpoint, data);
            return response.data;
        } catch (error) {
            console.error('Error updating data:', error);
            throw error;
        }
    },

    // Function to delete data via the API
    async deleteData(endpoint: string) {
        try {
            const response = await axios.delete(API_BASE_URL + endpoint);
            return response.data;
        } catch (error) {
            console.error('Error deleting data:', error);
            throw error;
        }
    },
};

export default dataProvider;