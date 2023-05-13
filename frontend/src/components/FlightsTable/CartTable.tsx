import React, { useState } from 'react';
import CartTableRow from './CartTableRow';
import ViewFlightModal from '../ViewFlightModal';
import DeleteCartModal from '../DeleteCartModal';

type CartTableProps = {
  data: Cart[]
}

const CartTable: React.FC<CartTableProps> = ({ data }) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedCartData, setSelectedCartData] = useState<Cart>();
  
  const onViewClick = (cartItem: Cart) => {
    setIsViewModalOpen(true);
    setSelectedCartData(cartItem);
  };

  const onDeleteClick = (cartItem: Cart) => {
    setIsDeleteModalOpen(true);
    setSelectedCartData(cartItem);
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Cart Item</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Seat Count</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900"/>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
        {
          data.map((cartData) => (
            <CartTableRow
              key={cartData._id}
              cartData={cartData}
              onViewClick={onViewClick}
              onDeleteClick={onDeleteClick}
            />
          ))
        }
        </tbody>
      </table>
      
      {selectedCartData && <DeleteCartModal isOpen={isDeleteModalOpen} setIsOpen={setIsDeleteModalOpen} cartData={selectedCartData} />}
    </div>
  );
};

export default CartTable;