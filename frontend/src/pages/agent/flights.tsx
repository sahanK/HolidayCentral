import React, { useEffect, useState } from 'react';
import FlightsTableAgent from '@/components/FlightsTable/FlightsTableAgent';
import BeatLoader from "react-spinners/BeatLoader";
import { searchFlights } from '@/server/flights';
import { useAppSelector } from '@/redux/hooks';

const Flights = () => {
  const token = useAppSelector(state => state.user.token);
  const [flightsData, setFlightsData] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<{ type: 'success' | 'danger', message: string }>();

  const [depCityInput, setDepCityInput] = useState<string>('');
  const [depCountryInput, setDepCountryInput] = useState<string>('');
  const [depDateInput, setDepDateInput] = useState<string>('');
  const [arrCityInput, setArrCityInput] = useState<string>('');
  const [arrCountryInput, setArrCountryInput] = useState<string>('');
  const [arrDateInput, setArrDateInput] = useState<string>('');
  const [cabinClassInput, setCabinClassInput] = useState<string>('');
  const [airlineNameInput, setAirlineNameInput] = useState<string>('');
  const [airlineCountryInput, setAirlineCountryInput] = useState<string>('');

  useEffect(() => {
    if (responseMessage) {
      setTimeout(() => setResponseMessage(undefined), 4000);
    }
  }, [responseMessage]);

  if (isLoading) {
    return (
      <div className='h-full w-full flex flex-col justify-center items-center'>
        <BeatLoader/>
      </div>
    )
  }

  const onSearchClick = async () => {
    if (token) {
      setIsLoading(true);
      const apiResponse = await searchFlights(token, 
        depCityInput, depCountryInput, depDateInput, arrCityInput, arrCountryInput, arrDateInput, cabinClassInput, airlineNameInput, airlineCountryInput);
      if (apiResponse && apiResponse.data) {
        setFlightsData(apiResponse.data);
        setIsLoading(false)
      }
    }
  };

  return (
    <div className='h-full w-full overflow-scroll p-5 space-y-5'>
      <div className="container mx-auto">
        <h2 className='text-2xl font-semibold'>FIND BEST FLIGHTS WITH <b>HOLIDAY CENTRAL</b></h2>
        <p>Learning the ins and outs of the travel industry takes time. Travel agents become true travel experts through investing in education and taking time to do their own research. They also spend time at educational events, like Boot Camp and Destination Success, as well as FAM trips to grow their knowledge and better serve their clients.</p>
        <br/><br/>
        <form>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block text-gray-700 text-sm font-bold mb-2">Departure City</label>
              <input 
                type="text" 
                className="border rounded-lg px-3 py-2 text-sm w-5/6" 
                value={depCityInput}
                onChange={(e) => setDepCityInput(e.target.value)}
                required/>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block text-gray-700 text-sm font-bold mb-2">Departure Country</label>
              <input 
                type="text" 
                className="border rounded-lg px-3 py-2 text-sm w-5/6" 
                value={depCountryInput}
                onChange={(e) => setDepCountryInput(e.target.value)}
                required/>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block text-gray-700 text-sm font-bold mb-2">Departure Date</label>
              <input 
                type="text" 
                className="border rounded-lg px-3 py-2 text-sm w-5/6" 
                value={depDateInput}
                onChange={(e) => setDepDateInput(e.target.value)}
                required/>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block text-gray-700 text-sm font-bold mb-2">Arrival City</label>
              <input 
                type="text" 
                className="border rounded-lg px-3 py-2 text-sm w-5/6" 
                value={arrCityInput}
                onChange={(e) => setArrCityInput(e.target.value)}
                required/>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block text-gray-700 text-sm font-bold mb-2">Arrival Country</label>
              <input 
                type="text" 
                className="border rounded-lg px-3 py-2 text-sm w-5/6" 
                value={arrCountryInput}
                onChange={(e) => setArrCountryInput(e.target.value)}
                required/>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block text-gray-700 text-sm font-bold mb-2">Arrival Date</label>
              <input 
                type="text" 
                className="border rounded-lg px-3 py-2 text-sm w-5/6" 
                value={arrDateInput}
                onChange={(e) => setArrDateInput(e.target.value)}
                required/>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block text-gray-700 text-sm font-bold mb-2">Cabin Class</label>
              <input 
                type="text" 
                className="border rounded-lg px-3 py-2 text-sm w-5/6" 
                value={cabinClassInput}
                onChange={(e) => setCabinClassInput(e.target.value)}
                required/>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block text-gray-700 text-sm font-bold mb-2">Airline Name</label>
              <input 
                type="text" 
                className="border rounded-lg px-3 py-2 text-sm w-5/6" 
                value={airlineNameInput}
                onChange={(e) => setAirlineNameInput(e.target.value)}/>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block text-gray-700 text-sm font-bold mb-2">Airline Country</label>
              <input 
                type="text" 
                className="border rounded-lg px-3 py-2 text-sm w-5/6" 
                value={airlineCountryInput}
                onChange={(e) => setAirlineCountryInput(e.target.value)}/>
            </div>
          </div>
          <br/>
          <button type="submit" className="justify-center itmes-center bg-grayscale-80 rounded-lg py-2 px-4 text-white hover:bg-grayscale-60" 
                  onClick={(e) => {
                    e.preventDefault();
                    onSearchClick();
                  }}>Search</button>
          <br/><br/>
        </form>

        {!isLoading && flightsData.length > 0 && <FlightsTableAgent data={flightsData} />}
      </div>
    </div>
  );
};

export default Flights;
