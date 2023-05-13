import React from 'react';

type CartTableRowProps = {
  cartData: Cart;
  onViewClick: (data: Cart) => void;
  onDeleteClick: (data: Cart) => void;
}

const CartTableRow: React.FC<CartTableRowProps> = ({ cartData, onViewClick, onDeleteClick }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 font-normal text-gray-900">
        <h3 className="text-sm font-medium text-gray-700">{cartData.flightId}</h3>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm">
          <div className="font-medium text-gray-700">{cartData.seatCount}</div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-end gap-4">
          <div className='h-10 w-10 p-2 rounded-full hover:bg-gray-200' onClick={() => onViewClick(cartData)}>
            <img src='/info.svg' className='h-5 w-5 mt-1.5' />
          </div>
          <div className='h-10 w-10 p-2 rounded-full hover:bg-gray-200' onClick={() => onDeleteClick(cartData)}>
            <img src='/delete.svg' className='h-6 w-6' />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default CartTableRow;