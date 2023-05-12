import React, { useState } from 'react';
import FlightTableRow from './FlightTableRow';
import UpdateFlightModal from '../UpdateFlightModal';
import DeleteFlightModal from '../DeleteFlightModal';

type FlightsTableProps = {
  data: Flight[]
}

const FlightsTable: React.FC<FlightsTableProps> = ({ data }) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedFlightData, setSelectedFlightData] = useState<Flight>();

  const onUpdateClick = (flight: Flight) => {
    setIsUpdateModalOpen(true);
    setSelectedFlightData(flight);
  };

  const onDeleteClick = (flight: Flight) => {
    setIsDeleteModalOpen(true);
    setSelectedFlightData(flight);
  };
  
  return (
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
          data.map((flightData) => (
            <FlightTableRow
              key={flightData._id}
              flightData={flightData}
              onUpdateClick={onUpdateClick}
              onDeleteClick={onDeleteClick}
            />
          ))
        }
        </tbody>
      </table>
      {selectedFlightData && <UpdateFlightModal isOpen={isUpdateModalOpen} setIsOpen={setIsUpdateModalOpen} flightData={selectedFlightData} />}
      {selectedFlightData && <DeleteFlightModal isOpen={isDeleteModalOpen} setIsOpen={setIsDeleteModalOpen} flightData={selectedFlightData} />}
    </div>
  );
};

export default FlightsTable;