import React from 'react';
import HotelTableRow from './HotelTableRow';

type HotelsTableProps = {
  data: Hotel[]
}

const FlightsTable: React.FC<HotelsTableProps> = ({ data }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Name</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Destination</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Rating</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Price</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Facilities</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Rooms</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Board Basis</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900"/>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
        {
          data.map((hotelData) => (
            <HotelTableRow
              key={hotelData._id}
              hotelData={hotelData}
              onUpdateClick={() => {}}
              onDeleteClick={() => {}}
            />
          ))
        }
        </tbody>
      </table>
    </div>
  );
};

export default FlightsTable;