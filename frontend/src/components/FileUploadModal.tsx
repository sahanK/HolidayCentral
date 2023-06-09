
import React, { Fragment, useCallback, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDropzone } from 'react-dropzone'
import BeatLoader from "react-spinners/BeatLoader";
import ResponseMessage from './ResponseMessage';

type FileUploadModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isUploading: boolean;
  responseMessage: { type: 'success' | 'danger', message: string } | undefined;
  uploadFile: (file: any) => void;
};

const FileUploadModal: React.FC<FileUploadModalProps> = ({ isOpen, setIsOpen, isUploading, responseMessage, uploadFile }) => {
  const [selectedFile, setSelectedFile] = useState();

  // @ts-ignore
  const onDrop = useCallback(acceptedFiles => {
    setSelectedFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({onDrop})

  function closeModal() {
    setIsOpen(false)
  }

  const onUploadClick = async () => {
    if (selectedFile) {
      await uploadFile(selectedFile);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Upload File
                </Dialog.Title>
                <div className="mx-auto w-full max-w-[550px] bg-white">
                  <form className="py-6 px-9">
                    <div className="mb-6 pt-4">
                      <div className="mb-8" {...getRootProps()}>
                        <input type="file" name="file" id="file" className="sr-only" {...getInputProps()}/>
                        <label className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center">
                          <div>
                            <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                              Drop files here
                            </span>
                            <span className="mb-2 block text-base font-medium text-[#6B7280]">
                              Or
                            </span>
                            <span
                              className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]"
                            >
                              Browse
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>
                    <button
                      className={`w-full ${ isUploading ? 'bg-grayscale-60' :'bg-grayscale-80'} rounded-lg py-2 px-4 hover:bg-grayscale-60 text-white outline-none mb-[16px]`}
                      onClick={(e) => {
                        e.preventDefault();
                        onUploadClick();
                      }}
                      disabled={isUploading}
                    >
                      {isUploading ? <BeatLoader color='#FFFFFF' size={10} /> : <span>Upload</span>}
                    </button>
                    { responseMessage && <ResponseMessage type={responseMessage.type} message={responseMessage.message} />}
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default FileUploadModal;
