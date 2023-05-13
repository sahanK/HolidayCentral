import React, { useEffect, useState } from 'react';
import FlightsTableAgent from '@/components/FlightsTable/FlightsTableAgent';
import BeatLoader from "react-spinners/BeatLoader";
import { searchFlights, viewCart } from '@/server/flights';
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/router';
import CartTable from '@/components/FlightsTable/CartTable';

const flights = () => {
  const token = useAppSelector(state => state.user.token);
  const router = useRouter();
  const user = useAppSelector(state => state.user.user);

  const [cartData, setCartData] = useState<Cart[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<{ type: 'success' | 'danger', message: string }>();

  useEffect(() => {
    const fetchCartData = async () => {
      if (token) {
        setIsLoading(true);
        let userId: string = user?._id!
        const apiResponse = await viewCart(token, userId);
        if (apiResponse && apiResponse.data) {
          setCartData(apiResponse.data);
          setIsLoading(false)
        }
      }
    }

    fetchCartData();
  }, [viewCart]);

  useEffect(() => {
    if (responseMessage) {
      setTimeout(() => setResponseMessage(undefined), 4000);
    }
  }, [responseMessage]);

  useEffect(() => {
    if (!user || user.role !== 'agent') {
      router.replace('/login');
    }
  }, [router, user]);

  if (isLoading) {
    return (
      <div className='h-full w-full flex flex-col justify-center items-center'>
        <BeatLoader/>
      </div>
    )
  }

  return (
    <div className='h-full w-full overflow-scroll p-5 space-y-5'>
      <div className="container mx-auto">
        <h2 className='text-2xl font-semibold mb-6'>HOLIDAY CENTRAL CART</h2>
        {!isLoading && cartData.length > 0 && <CartTable data={cartData} />}
      </div>
    </div>
  );
};

export default flights;
