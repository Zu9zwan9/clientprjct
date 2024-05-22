// src/store/config.ts
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';

if (!apiUrl) {
    console.error("API URL is not defined. Please check your .env file.");
}

export const BASE_URL = apiUrl || '';  // Provide a fallback if necessary
export const actionRequestConfig = {
    headers: {
        'Content-Type': 'application/json',
    }
};
