import axios from 'axios';

export const addHotels = async (file: any, token: string): Promise<AddHotelsAPIResponse | null> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/staff/hotels`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });
    const apiResponse: AddHotelsAPIResponse = response.data;
    return apiResponse;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      const errorResponse: AddHotelsAPIResponse = error.response?.data
      return errorResponse;
    }
    return null;
  }
};

export const getHotels = async (token: string): Promise<GetHotelsAPIResponse | null> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/staff/hotels`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });
    const apiResponse: GetHotelsAPIResponse = response.data;
    return apiResponse;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      const errorResponse: GetHotelsAPIResponse = error.response?.data
      return errorResponse;
    }
    return null;
  }
};