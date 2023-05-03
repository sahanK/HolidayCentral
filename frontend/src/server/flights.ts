import axios from 'axios';

export const addFlights = async (file: any, token: string): Promise<AddFlightsAPIResponse | null> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/staff/flights`, formData, {
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
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/staff/flights`, {
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
    const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/staff/flights/${flightData._id}`, {
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

export const deleteFlight = async (flightData: Flight, token: string): Promise<DeleteFlightAPIResponse | null> => {
  try {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/staff/flights/${flightData._id}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });
    const apiResponse: DeleteFlightAPIResponse = response.data;
    return apiResponse
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      const errorResponse: DeleteFlightAPIResponse = error.response?.data
      return errorResponse;
    }
    return null;
  }
}