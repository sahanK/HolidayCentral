import React from 'react'

const FlightTableRow: React.FC = () => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 font-normal text-gray-900">
        <h3 className="text-sm font-medium text-gray-700">Delta Air Lines</h3>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm">
          <div className="font-medium text-gray-700">Los Angeles</div>
          <div className="text-gray-400">2023-04-30</div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm">
          <div className="font-medium text-gray-700">New York</div>
          <div className="text-gray-400">2023-04-28</div>
        </div>
      </td>
      <td className="px-6 py-4">
        <h3 className="text-sm font-medium text-gray-700">5.6h</h3>
      </td>
      <td className="px-6 py-4">
        <div
          className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
        >
          Economy
        </div>
      </td>
      <td className="px-6 py-4">
        <h3 className="text-sm font-medium text-gray-700">350 USD</h3>
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-end gap-4">
          <div className='p-2 rounded-full hover:bg-gray-200'>
            <img src='/delete.svg' className='h-6 w-6' />
          </div>
          <div className='p-2 rounded-full hover:bg-gray-200'>
            <img src='/edit.svg' className='h-6 w-6' />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default FlightTableRow;