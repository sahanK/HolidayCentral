import React, { useEffect, useState } from 'react';
import BeatLoader from "react-spinners/BeatLoader";
import FileUploadModal from '@/components/FileUploadModal';
import { useAuth } from '@/hooks/useAuth';
import { addHotels, getHotels } from '@/server/hotels';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setHotels, updateHotels } from '@/redux/sclices/hotelsClice';
import HotelsTable from '@/components/HotelsTable/HotelsTable';

const hotels: React.FC = () => {
  const { token, loading: pageLoading } = useAuth();
  const hotels = useAppSelector((state) => state.hotels.hotels);
  const dispatch = useAppDispatch();
  
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<{ type: 'success' | 'danger', message: string }>();

  useEffect(() => {
    const fetchHotels = async () => {
      if (token && !pageLoading) {
        setIsFetching(true);
        const apiResponse = await getHotels(token);
        if (apiResponse && apiResponse.data) {
          dispatch(setHotels(apiResponse.data));
          setIsFetching(false);
        }
      }
    }

    fetchHotels();
  }, [getHotels, pageLoading]);

  const uploadFile = async (selectedFile: any) => {
    if (token) {
      setIsUploading(true);
      const apiResponse = await addHotels(selectedFile, token);
      setIsUploading(false);
      if (apiResponse) {
        setResponseMessage({
          type: apiResponse.success ? 'success' : 'danger',
          message: apiResponse.success ? apiResponse.message! : apiResponse.error!
        });
        if (apiResponse.data) {
          dispatch(updateHotels(apiResponse.data));
        }
      }
    }
  }

  useEffect(() => {
    if (responseMessage) {
      setTimeout(() => setResponseMessage(undefined), 4000);
    }
  }, [responseMessage]);

  if (isFetching || pageLoading) {
    return (
      <div className='h-full w-full flex flex-col justify-center items-center'>
        <BeatLoader/>
      </div>
    )
  }
  
  return (
    <div className='h-full w-full overflow-scroll p-5 space-y-5'>
      <div className='flex flex-row justify-between items-center'>
        <h3 className='text-2xl font-semibold'>Hotels</h3>
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
      {hotels.length > 0 && <HotelsTable data={hotels} />}
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

export default hotels;