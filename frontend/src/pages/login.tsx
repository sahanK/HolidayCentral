import React, { useState } from 'react';
import { useRouter } from 'next/router';
import BeatLoader from "react-spinners/BeatLoader";
import { useAppDispatch } from '@/redux/hooks';
import { setToken, setUser } from '@/redux/sclices/userSlice';
import { authLogin } from '@/server/auth';
import ResponseMessage from '@/components/ResponseMessage';

const Login: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<{ type: "success" | "danger", message: string}>();

  const onLoginClick = async () => {
    if (emailInput !== '' && passwordInput !== '') {
      setIsLoading(true);
      setResponseMessage(undefined);
      const apiResponse = await authLogin(emailInput, passwordInput);
      setIsLoading(false);
      if (apiResponse && apiResponse.token && apiResponse.data && !apiResponse.error) {
        dispatch(setUser(apiResponse.data));
        dispatch(setToken(apiResponse.token));
        if (apiResponse.data.role === 'staff') {
          router.push('/staff');
        } else if (apiResponse.data.role === 'admin') {
          router.push('/admin');
        } else if (apiResponse.data.role === 'agent') {
          router.push('/agent');
        }
      } else if (apiResponse && !apiResponse.success && apiResponse?.error) {
        setResponseMessage({ type: 'danger', message: apiResponse.error });
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5">HolidayCentral</h1>  
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <div className="px-5 py-7">
            <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
            <input
              type="text"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              onChange={(e) => setEmailInput(e.target.value)}
              value={emailInput}
            />
            <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
            <input
              type="password"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              onChange={(e) => setPasswordInput(e.target.value)}
              value={passwordInput}
            />
            <button
              type="button"
              className="bg-grayscale-80 hover:bg-grayscale-60 text-white w-full py-2.5 rounded-lg text-sm font-semibold text-center mb-[16px]"
              onClick={(e) => {
                e.preventDefault();
                onLoginClick();
              }}
              disabled={isLoading}
            >
              {isLoading ? <BeatLoader color='#FFFFFF' size={10} /> : <span className="inline-block mr-2">Login</span>}
            </button>
            {responseMessage && <ResponseMessage type={responseMessage.type} message={responseMessage.message} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;