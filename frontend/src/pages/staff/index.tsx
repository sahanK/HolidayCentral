import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';

const Staff: React.FC = () => {
  const { loading } = useAuth();
  const router = useRouter();

  if (loading) return null;

  return (
    <div className='h-full w-full flex flex-row justify-center items-center space-x-10 p-10'>
      <div
        className='flex h-3/4 flex-col flex-1 justify-center items-center p-5 space-y-5 rounded-xl shadow-2xl hover:scale-110 duration-300'
        onClick={() => router.push('/staff/flights')}
      >
        <img src='/flights.svg' className='h-3/4 w-3/4' />
        <h3 className='text-2xl text-grayscale-80 font-semibold'>Flights</h3>
      </div>
      <div
        className='flex h-3/4  flex-col flex-1 justify-center items-center p-5 space-y-5 rounded-xl shadow-2xl hover:scale-110 duration-300'
        onClick={() => router.push('/staff/hotels')}
      >
        <img src='/hotels.svg' className='h-3/4 w-3/4' />
        <h3 className='text-2xl text-grayscale-80 font-semibold'>Hotels</h3>
      </div>
      <div
        className='flex h-3/4  flex-col flex-1 justify-center items-center p-5 space-y-5 rounded-xl shadow-2xl hover:scale-110 duration-300'
        onClick={() => router.push('/staff/packages')}
      >
        <img src='/packages.svg' className='h-3/4 w-3/4' />
        <h3 className='text-2xl text-grayscale-80 font-semibold'>Packages</h3>
      </div>
    </div>
  );
};

export default Staff;