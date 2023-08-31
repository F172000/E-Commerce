import React from 'react'
import { ITEMS_PER_PAGE } from "../../../app/constants";
import { useEffect,useState } from 'react';
import { fetchProductsByFiltersAsync } from '../../Product-list/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrdersAsync, fetchallordersAsync, selectorders, selectotalOrders } from '../../Orders/orderSlice';
import { EyeIcon, PencilIcon } from '@heroicons/react/24/solid';
export default function AdminOrders() {
    const dispatch=useDispatch();
    const [page,setpage]=useState(1);
    const Orders=useSelector(selectorders);
    console.log(Orders);
    const totalorders=useSelector(selectotalOrders);
    useEffect(()=>{
        const pagination={_page:page,_limit:ITEMS_PER_PAGE};
        dispatch(fetchAllOrdersAsync({pagination}));
      },[dispatch,page]);
  return (
    <div>
      <div className="overflow-x-auto">
  <div className=" flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
    <div className="w-full ">
      <div className="bg-white shadow-md rounded my-6">
        <table className="min-w-max w-full table-auto">
          <thead>
            <tr className="bg-pink-950 text-orange-100 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Order#</th>
              <th className="py-3 px-20 text-left">Items</th>
              <th className="py-3 px-6 text-center">Total Amount</th>
              <th className="py-3 px-6 text-center">Shipping Address</th>
              <th className="py-3 px-6 text-center">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {Orders.map(order=>
            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <div className="flex items-center">
                  <div className="mr-2">
                  </div>
                  <span className="font-medium">{order.id}</span>
                </div>
              </td>
              <td className="py-3 px-6 text-left">
                {order.items.map(item=><div className="flex items-center">
                  <div className="mr-2">
                    <img
                      className="w-20 h-20 rounded-full"
                      src={item.thumbnail}
                    />
                  </div>
                  <span>{item.title}-{item.quantity}-{item.price}</span>
                </div>
                )}
              </td>
              <td className="py-3 px-6 text-center">
                <span className="bg-rose-100 text-pink-950 py-1 px-3 rounded-full text-xs">
                  ${order.totalAmount}
                </span>
              </td>
              <td className="py-3 px-6 text-center">
                <span className= " py-1 px-3 text-xs">
                  <div><strong>{order.selectaddress.name}</strong></div>
                  <div>{order.selectaddress.street}</div>
                  <div>{order.selectaddress.city}</div>
                 <div>{order.selectaddress.state}</div> 
                  <div>{order.selectaddress.pinCode}</div>
                  <div>{order.selectaddress.Phone}</div>
                </span>
              </td>
              <td className="py-3 px-6 text-center">
                <span className="bg-rose-100 text-pink-950 py-1 px-3 rounded-full text-xs">
                  {order.status}
                </span>
              </td>
              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                  <div className="w-6 mr-4 transform cursor-pointer hover:text-purple-500 hover:scale-120">
                  <EyeIcon className='w-8 h-8'/>
                  </div>
                  <div className="w-6 mr-2 transform cursor-pointer hover:text-purple-500 hover:scale-120">
                   <PencilIcon className='w-8 h-8'/>
                  </div>
                </div>
              </td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

