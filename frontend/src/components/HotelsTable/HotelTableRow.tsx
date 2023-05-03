import React from 'react';

type FlightTableRowProps = {
  hotelData: Hotel;
  onUpdateClick: (data: Hotel) => void;
  onDeleteClick: (data: Hotel) => void;
}

const FlightTableRow: React.FC<FlightTableRowProps> = ({ hotelData, onUpdateClick, onDeleteClick }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 font-normal text-gray-900">
        <h3 className="text-sm font-medium text-gray-700">{hotelData.hotel_name}</h3>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm">
          <div className="font-medium text-gray-700">{hotelData.destination_country}</div>
          <div className="text-gray-400">{hotelData.destination_city}</div>
        </div>
      </td>
      <td className="px-6 py-4">
        <h3 className="text-sm font-medium text-gray-700">{hotelData.star_rating} / 5</h3>
      </td>
      <td className="px-6 py-4">
        <h3 className="text-sm font-medium text-gray-700">{hotelData.price_per_night} USD</h3>
      </td>
      <td className="px-6 py-4">
        {
          hotelData.facilities.map((facility) => (
            <div
              className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1
              text-xs font-semibold text-blue-600"
            >
              {facility}
            </div>
          ))
        }
      </td>
      <td className="px-6 py-4">
      {
          hotelData.available_room_types.map((roomType) => (
            <div
              className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2 py-1
              text-xs font-semibold text-purple-600"
            >
              {roomType}
            </div>
          ))
        }
      </td>
      <td className="px-6 py-4">
      {
          hotelData.board_basis.map((basis) => (
            <div
              className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-2 py-1
              text-xs font-semibold text-yellow-600"
            >
              {basis}
            </div>
          ))
        }
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-end gap-4">
          <div className='h-10 w-10 p-2 rounded-full hover:bg-gray-200' onClick={() => onDeleteClick(hotelData)}>
            <img src='/delete.svg' className='h-6 w-6' />
          </div>
          <div className='h-10 w-10 p-2 rounded-full hover:bg-gray-200' onClick={() => onUpdateClick(hotelData)}>
            <img src='/edit.svg' className='h-6 w-6' />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default FlightTableRow;