import React, { Fragment, useEffect, useState } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import { BeatLoader } from 'react-spinners';
import ResponseMessage from './ResponseMessage';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateFlight as updateFlightApi } from '@/server/flights';
import { updateFlight } from '@/redux/sclices/flightsSlice';

type UpdateFlightModal = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  flightData: Flight,
};

const UpdateFlightModal: React.FC<UpdateFlightModal> = ({ isOpen, setIsOpen, flightData }) => {
  const token = useAppSelector((state) => state.user.token);
  const dispatch = useAppDispatch();

  const [arrivalDateInput, setArrivalDateInput] = useState<string>(flightData.arrival_date);
  const [departureDateInput, setDepartureDateInput] = useState<string>(flightData.departure_date);
  const [ticketPriceInput, setTicketPriceInput] = useState<string>(flightData.ticket_price_usd.toString());
  const [cabinClassInput, setCabinClassInput] = useState<string>(flightData.cabin_class);
  const [responseMessage, setResponseMessage] = useState<{ type: "success" | "danger", message: string}>();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const onUpdateClick = async () => {
    if (token) {
      setIsUpdating(true);
      const requestBody: Flight = {
        ...flightData,
        arrival_date: arrivalDateInput,
        departure_date: departureDateInput,
        ticket_price_usd: Number(ticketPriceInput),
        cabin_class: cabinClassInput,
      };
      const apiResponse = await updateFlightApi(requestBody, token);
      setIsUpdating(false);
      if (apiResponse && apiResponse.success && apiResponse.data && apiResponse.message) {
        dispatch(updateFlight(apiResponse.data));
        setResponseMessage({ type: 'success', message: apiResponse.message});
      } else if (apiResponse && apiResponse.error) {
        setResponseMessage({ type: 'danger', message: apiResponse.error});
      }
    }
  };

  useEffect(() => {
    if (responseMessage) {
      setTimeout(() => setResponseMessage(undefined), 4000);
    }
  }, [responseMessage]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {flightData.departure_city} to {flightData.arrival_city} : {flightData.airline_name}
                </Dialog.Title>
                <form className='w-full h-full flex flex-col justify-center items-center mt-[32px]'>
                  <div className='w-full flex flex-1 flex-row justify-center items-center space-x-[32px] mb-[16px]'>
                    <div className='h-full w-full flex-1 flex flex-col'>
                      <div className='flex flex-row justify-between items-center space-x-[8px] mb-[8px]'>
                        <p>Arrival date</p>
                        <input
                          type="text"
                          className="border rounded-lg px-3 py-2 text-sm w-2/3"
                          value={arrivalDateInput}
                          onChange={(e) => setArrivalDateInput(e.target.value)}
                        />
                      </div>
                      <div className='flex flex-row justify-between items-center space-x-[8px] mb-[8px]'>
                        <p>Departure date</p>
                        <input
                          type="text"
                          className="border rounded-lg px-3 py-2 text-sm w-2/3"
                          value={departureDateInput}
                          onChange={(e) => setDepartureDateInput(e.target.value)}
                        />
                      </div>
                      <div className='flex flex-row justify-between items-center space-x-[8px] mb-[8px]'>
                        <p>Ticket price</p>
                        <input
                          type="text"
                          className="border rounded-lg px-3 py-2 text-sm w-2/3"
                          value={ticketPriceInput}
                          onChange={(e) => setTicketPriceInput(e.target.value)}
                        />
                      </div>
                      <div className='flex flex-row justify-between items-center space-x-[8px] mb-[8px]'>
                        <p>Cabin class</p>
                        <input
                          type="text"
                          className="border rounded-lg px-3 py-2 text-sm w-2/3"
                          value={cabinClassInput}
                          onChange={(e) => setCabinClassInput(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="bg-grayscale-80 hover:bg-grayscale-60 text-white w-full py-2.5 rounded-lg text-sm font-semibold text-center mb-[16px]"
                    onClick={onUpdateClick}
                    disabled={isUpdating}
                  >
                    {isUpdating ? <BeatLoader color='#FFFFFF' size={10} /> : <span>Update</span>}
                  </button>
                  {responseMessage && <ResponseMessage type={responseMessage.type} message={responseMessage.message} />}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UpdateFlightModal;