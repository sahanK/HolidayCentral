import React from 'react';

type FlightTableRowProps = {
  flightData: Flight;
  onUpdateClick: (data: Flight) => void;
  onDeleteClick: () => void;
}

const FlightTableRow: React.FC<FlightTableRowProps> = ({ flightData, onUpdateClick, onDeleteClick }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 font-normal text-gray-900">
        <h3 className="text-sm font-medium text-gray-700">{flightData.airline_name}</h3>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm">
          <div className="font-medium text-gray-700">{flightData.arrival_city}</div>
          <div className="text-gray-400">{flightData.arrival_date}</div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm">
          <div className="font-medium text-gray-700">{flightData.departure_city}</div>
          <div className="text-gray-400">{flightData.departure_date}</div>
        </div>
      </td>
      <td className="px-6 py-4">
        <h3 className="text-sm font-medium text-gray-700">{flightData.duration}h</h3>
      </td>
      <td className="px-6 py-4">
        <div
          className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1
          text-xs font-semibold text-blue-600"
        >
          {flightData.cabin_class}
        </div>
      </td>
      <td className="px-6 py-4">
        <h3 className="text-sm font-medium text-gray-700">{flightData.ticket_price_usd} USD</h3>
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-end gap-4">
          <div className='p-2 rounded-full hover:bg-gray-200' onClick={onDeleteClick}>
            <img src='/delete.svg' className='h-6 w-6' />
          </div>
          <div className='p-2 rounded-full hover:bg-gray-200' onClick={() => onUpdateClick(flightData)}>
            <img src='/edit.svg' className='h-6 w-6' />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default FlightTableRow;