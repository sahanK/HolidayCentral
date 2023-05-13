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

type GetCartAPIResponse = {
  success: boolean;
  error?: string;
  data?: Cart[];
};

type AddHotelsAPIResponse = {
  success: boolean;
  message?: string;
  error?: string;
  data?: Hotel[];
};

type GetHotelsAPIResponse = {
  success: boolean;
  error?: string;
  data?: Hotel[];
};

type LoginAPIResponse = {
  success: boolean;
  error?: string;
  data?: User;
  token?: string;
};