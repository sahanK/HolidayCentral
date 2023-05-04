import React, { useEffect, useState } from 'react';
import FlightsTableAgent from '@/components/FlightsTable/FlightsTableAgent';
import BeatLoader from "react-spinners/BeatLoader";
import { searchFlights } from '@/server/flights';
import { useAppSelector } from '@/redux/hooks';

const flights = () => {
  const token = useAppSelector(state => state.user.token);
  const [flightsData, setFlightsData] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<{ type: 'success' | 'danger', message: string }>();

  useEffect(() => {
    const fetchFlights = async () => {
      if (token) {
        setIsLoading(true);
        const apiResponse = await searchFlights(token);
        if (apiResponse && apiResponse.data) {
          setFlightsData(apiResponse.data);
          setIsLoading(false)
        }
      }
    }

    fetchFlights();
  }, [searchFlights]);

  useEffect(() => {
    if (responseMessage) {
      setTimeout(() => setResponseMessage(undefined), 4000);
    }
  }, [responseMessage]);

  if (isLoading) {
    return (
      <div className='h-full w-full flex flex-col justify-center items-center'>
        <BeatLoader/>
      </div>
    )
  }

  const onSearchClick = async () => {
    // await uploadFile();
  };

  return (
    <div className='h-full w-full overflow-scroll p-5 space-y-5'>
      <div className='flex flex-row justify-between items-center'>
        <h3 className='text-2xl font-semibold'>Find flights with your best match!</h3>
        <br/>
        <button
          className='justify-center itmes-center bg-grayscale-80 rounded-lg py-2 px-4 text-white hover:bg-grayscale-60'
          onClick={(e) => {
            e.preventDefault();
            onSearchClick();
          }}>
          Search
        </button>
      </div>
      {!isLoading && flightsData.length > 0 && <FlightsTableAgent data={flightsData} />}
    </div>
  );
};

export default flights;
