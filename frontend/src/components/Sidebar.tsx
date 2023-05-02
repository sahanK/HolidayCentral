import { useRouter } from 'next/router';
import React, { useState } from 'react';

type Route = {
  label: string;
  path: string;
}

const Sidebar: React.FC = () => {
  const router = useRouter();

  const pages: Route[] = [
    {
      label: 'Flight Reservation',
      path: 'flights',
    },
    {
      label: 'Hotel Reservation',
      path: 'hotels',
    },
    {
      label: 'Package Reservation',
      path: 'packages',
    },
    {
      label: 'Staff',
      path: 'staff',
    },
    {
      label: 'Admin',
      path: 'admin',
    },
  ];

  const [currentPage, setCurrentPage] = useState<Route>(pages[0])

  return (
    <div className='w-1/5 bg-grayscale-80 border-2 border-black p-2'>
      {
        pages.map((page) => (
          <div
            className={`${currentPage.path === page.path && 'bg-grayscale-60'} flex flex-row items-center space-x-2 p-2 mb-2 rounded-lg hover:bg-grayscale-60`}
            onClick={() => {
              setCurrentPage(page);
              router.replace(page.path);
            }}
            key={page.path}
          >
            <h3 className='text-white'>{page.label}</h3>
          </div>
        ))
      }
    </div>
  );
};

export default Sidebar;