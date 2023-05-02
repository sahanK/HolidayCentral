import { useAppSelector } from '@/redux/hooks';
import React from 'react';

const Topbar: React.FC = () => {
  const user = useAppSelector(state => state.user.user);

  return (
    <div className='w-full h-14 flex flex-row justify-end item-center border-b-2 border-gray-100'>
      <h3 className='text-grayscale-100 border-2 border-white'>{user?.first_name} {user?.last_name}</h3>
    </div>
  );
};

export default Topbar;