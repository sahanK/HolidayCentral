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

type UpdateFlightAPIResponse = {
  success: boolean;
  message?: string;
  error?: string;
  data?: Flight;
};

type DeleteFlightAPIResponse = {
  success: boolean;
  message?: string;
  error?: string;
};

type LoginAPIResponse = {
  success: boolean;
  error?: string;
  data?: User;
  token?: string;
};