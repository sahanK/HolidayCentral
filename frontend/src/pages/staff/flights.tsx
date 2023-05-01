import React from 'react';
import FlightTableRow from '@/components/FlightTableRow';

const flights = () => {
  return (
    <div className='h-full w-full overflow-scroll p-5 space-y-5'>
      <div className='flex flex-row justify-between items-center'>
        <h3 className='text-2xl font-semibold'>Flights</h3>
        <button className='h-10 flex flex-row justify-center itmes-center bg-grayscale-80 rounded-lg py-2 px-4 text-white hover:bg-grayscale-60'>
          <span>
            <img src='/plus.svg' className='h-1/2 w-1/2' />
          </span>
          Add new data
        </button>
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Airline</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Arrival</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Departure</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Duration</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Cabin class</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Price</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900"/>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {
            Array(10).fill(0).map((row) => <FlightTableRow />)
          }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default flights;
