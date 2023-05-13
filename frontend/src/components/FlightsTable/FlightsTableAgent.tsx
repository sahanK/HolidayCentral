import React, { useState } from 'react';
import FlightTableRowAgent from './FlightTableRowAgent';
import ViewFlightModal from '../ViewFlightModal';

type FlightsTableProps = {
  data: Flight[]
}

const FlightsTableAgent: React.FC<FlightsTableProps> = ({ data }) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [selectedFlightData, setSelectedFlightData] = useState<Flight>();

  const onProceedClick = async (flight: Flight) => {
    setIsViewModalOpen(true);
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
            <FlightTableRowAgent
              key={flightData._id}
              flightData={flightData}
              onProceedClick={onProceedClick}
            />
          ))
        }
        </tbody>
      </table>
      {selectedFlightData && <ViewFlightModal isOpen={isViewModalOpen} setIsOpen={setIsViewModalOpen} flightData={selectedFlightData!} />}
    </div>
  );
};

export default FlightsTableAgent;