type AddFlightsAPIResponse = {
  success: boolean;
  message?: string;
  error?: string;
  data?: Flight[];
};

type GetFlightsAPIResponse = {
  success: boolean;
  error?: string;
  data?: Flight[];
};

type LoginAPIResponse = {
  success: boolean;
  error?: string;
  data?: User;
  token?: string;
};