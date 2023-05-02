import axios, { AxiosError } from 'axios';

export const addFlights = async (file: any): Promise<AddFlightsAPIResponse | null> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post('https://holidaycentral-production.up.railway.app/api/v1/staff/flights', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NGY4MTRiNTQzOWYzYmQ0ZDVkMTRjZiIsImlhdCI6MTY4MzAzODA4NywiZXhwIjoxNjgzMTI0NDg3fQ.EoiO1GBNrqzUg23lXeTrpk_udOVRfxlAjyTR4QYTAHM'
      }
    });
    const apiResponse: AddFlightsAPIResponse = response.data;
    return apiResponse;
  } catch (error: any | AxiosError) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      const errorResponse: AddFlightsAPIResponse = error.response?.data
      return errorResponse;
    }
    return null;
  }
};

export const getFlights = async (): Promise<GetFlightsAPIResponse | null> => {
  try {
    const response = await axios.get('https://holidaycentral-production.up.railway.app/api/v1/staff/flights', {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NGY4MTRiNTQzOWYzYmQ0ZDVkMTRjZiIsImlhdCI6MTY4MzAzODA4NywiZXhwIjoxNjgzMTI0NDg3fQ.EoiO1GBNrqzUg23lXeTrpk_udOVRfxlAjyTR4QYTAHM'
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
}