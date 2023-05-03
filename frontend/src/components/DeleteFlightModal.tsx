import React, { Fragment, useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { deleteFlight } from '@/redux/sclices/flightsSlice';
import { deleteFlight as deleteFlightApi } from '@/server/flights';
import { Transition, Dialog } from '@headlessui/react';
import ResponseMessage from './ResponseMessage';

type DeleteFlightModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  flightData: Flight,
}

const DeleteFlightModal: React.FC<DeleteFlightModalProps> = ({ isOpen, setIsOpen, flightData }) => {
  const token = useAppSelector((state) => state.user.token);
  const dispatch = useAppDispatch();

  const [responseMessage, setResponseMessage] = useState<{ type: "success" | "danger", message: string}>();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const onDeleteClick = async () => {
    if (token) {
      setIsDeleting(true);
      const apiResponse = await deleteFlightApi(flightData, token);
      setIsDeleting(false);
      if (apiResponse && apiResponse.success && apiResponse.message) {
        dispatch(deleteFlight(flightData));
        setResponseMessage({ type: 'success', message: apiResponse.message});
      } else if (apiResponse && apiResponse.error){
        setResponseMessage({ type: 'success', message: apiResponse.error});
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
                  Are you sure want to delete this flight ?
                </Dialog.Title>
                <div className='h-full w-full'>
                  <p className='text-gray-400 mt-[16px]'>{flightData.departure_city} to {flightData.arrival_city} : {flightData.airline_name}</p>
                  <div className='flex flex-row justify-end h-wull w-full space-x-[16px] my-[16px]'>
                    <button
                      className='w-1/3 bg-gray-100 hover:bg-gray-300 text-black py-2.5 rounded-lg text-sm font-semibold text-center'
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className='w-1/3 bg-red-500 hover:bg-red-800 text-white py-2.5 rounded-lg text-sm font-semibold text-center'
                      onClick={onDeleteClick}
                      disabled={isDeleting}
                    >
                      {isDeleting ? <BeatLoader color='#FFFFFF' size={10} /> : <span>Delete</span>}
                    </button>
                  </div>
                  {responseMessage && <ResponseMessage type={responseMessage.type} message={responseMessage.message} />}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DeleteFlightModal;