import axios from 'axios';

export const authLogin = async (email: string, password: string): Promise<LoginAPIResponse | null> => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      email,
      password
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const apiResponse: LoginAPIResponse = response.data;
    return apiResponse;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      const errorResponse: LoginAPIResponse = error.response?.data
      return errorResponse;
    }
    return null;
  } 
}