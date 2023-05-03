import axios from 'axios';

export const addFlights = async (file: any, token: string): Promise<AddFlightsAPIResponse | null> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post('https://holidaycentral-production.up.railway.app/api/v1/staff/flights', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });
    const apiResponse: AddFlightsAPIResponse = response.data;
    return apiResponse;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      const errorResponse: AddFlightsAPIResponse = error.response?.data
      return errorResponse;
    }
    return null;
  }
};

export const getFlights = async (token: string): Promise<GetFlightsAPIResponse | null> => {
  try {
    const response = await axios.get('https://holidaycentral-production.up.railway.app/api/v1/staff/flights', {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });
    const apiResponse: GetFlightsAPIResponse = response.data;
    return apiResponse;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      const errorResponse: GetFlightsAPIResponse = error.response?.data
      return errorResponse;
    }
    return null;
  }
};

export const updateFlight = async (flightData: Flight, token: string): Promise<UpdateFlightAPIResponse | null> => {
  try {
    const response = await axios.put(`https://holidaycentral-production.up.railway.app/api/v1/staff/flights/${flightData._id}`, {
      ...flightData,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const apiResponse: UpdateFlightAPIResponse = response.data;
    return apiResponse
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      const errorResponse: UpdateFlightAPIResponse = error.response?.data
      return errorResponse;
    }
    return null;
  }
};