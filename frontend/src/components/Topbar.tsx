import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/router';
import React from 'react';

const Topbar: React.FC = () => {
  const user = useAppSelector(state => state.user.user);
  const router = useRouter();

  return (
    <div className="container mx-auto my-3">
      <div className='w-full h-14 flex flex-row justify-end item-center border-b-2 border-gray-100'>
        <div className='text-grayscale-100 border-2 border-white' onClick={() => router.push('/agent')}>
          <img src='/home.svg' className='h-5 w-5 mt-0.5 mr-1' />
        </div>
        <div className='text-grayscale-100 border-2 border-white' onClick={() => router.push('/agent/cart')}>
          <img src='/cart.svg' className='h-6 w-6' />
        </div>
        <h3 className='text-grayscale-100 border-2 border-white'>&nbsp;&nbsp;&nbsp; | &nbsp;{user?.first_name} {user?.last_name}</h3>
      </div>
    </div>
  );
};

export default Topbar;