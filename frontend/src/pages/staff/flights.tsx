import React, { useEffect, useState } from 'react';
import FileUploadModal from '@/components/FileUploadModal';
import FlightsTable from '@/components/FlightsTable/FlightsTable';
import BeatLoader from "react-spinners/BeatLoader";
import { addFlights, getFlights } from '@/server/flights';
import { useAppSelector } from '@/redux/hooks';

const flights = () => {
  const token = useAppSelector(state => state.user.token);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [flightsData, setFlightsData] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<{ type: 'success' | 'danger', message: string }>();

  useEffect(() => {
    const fetchFlights = async () => {
      if (token) {
        const apiResponse = await getFlights(token);
        if (apiResponse && apiResponse.data) {
          setFlightsData(apiResponse.data);
          setIsLoading(false)
        }
      }
    }

    fetchFlights();
  }, [getFlights]);

  const uploadFile = async (selectedFile: any) => {
    if (token) {
      setIsUploading(true);
      const apiResponse = await addFlights(selectedFile, token);
      setIsUploading(false);
      if (apiResponse) {
        setResponseMessage({
          type: apiResponse.success ? 'success' : 'danger',
          message: apiResponse.success ? apiResponse.message! : apiResponse.error!
        });
        if (apiResponse.data) {
          setFlightsData((prevValue) => [...prevValue, ...apiResponse.data!])
        }
      }
      setIsOpen(false);
    }
  }

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

  return (
    <div className='h-full w-full overflow-scroll p-5 space-y-5'>
      <div className='flex flex-row justify-between items-center'>
        <h3 className='text-2xl font-semibold'>Flights</h3>
        <button
          className='h-10 flex flex-row justify-center itmes-center bg-grayscale-80 rounded-lg py-2 px-4 text-white hover:bg-grayscale-60'
          onClick={() => setIsOpen(true)}
        >
          <span>
            <img src='/plus.svg' className='h-1/2 w-1/2' />
          </span>
          Add new data
        </button>
      </div>
      {!isLoading && flightsData.length > 0 && <FlightsTable data={flightsData} />}
      <FileUploadModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isUploading={isUploading}
        responseMessage={responseMessage}
        uploadFile={uploadFile}        
      />
    </div>
  );
};

export default flights;