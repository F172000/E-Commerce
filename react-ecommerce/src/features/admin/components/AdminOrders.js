import React from 'react'
import { ITEMS_PER_PAGE, discountedPrice } from "../../../app/constants";
import { useEffect,useState } from 'react';
import { fetchProductsByFiltersAsync } from '../../Product-list/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrdersAsync, fetchallordersAsync, selectorders, selectotalOrders, updateOrderAsync } from '../../Orders/orderSlice';
import { ArrowDownIcon, ArrowUpIcon, EyeIcon, PencilIcon } from '@heroicons/react/24/solid';
import Pagination from '../../Common/Pagination';
export default function AdminOrders() {
    const dispatch=useDispatch();
    const [page,setpage]=useState(1);
    const Orders=useSelector(selectorders);
    const [editableOrderId,setEditableOrderId]=useState(-1);
    const [sort, setSort] = useState({});
    console.log(Orders);
    const totalorders=useSelector(selectotalOrders);
    useEffect(()=>{
        const pagination={_page:page,_limit:ITEMS_PER_PAGE};
        dispatch(fetchAllOrdersAsync({pagination}));
      },[dispatch,page]);
      const handleShow=()=>{
        console.log("show");
      }
      const handleEdit=(order)=>{
      setEditableOrderId(order.id);
      }
      const handleUpdate=(e,order)=>{
        const updateOrder={...order,status:e.target.value};
        dispatch(updateOrderAsync(updateOrder));
        setEditableOrderId(-1);
      }
      const chooseColor=(status)=>{
        switch(status){
          case 'pending':
            return `bg-purple-200 text-purple-800`;
          case 'dispatched':
            return `bg-orange-200 text-gray-600`;
          case 'delivered':
            return `bg-green-200 text-green-800`;
            case 'cancelled':
              return `bg-red-200 text-red-800`;
        }
        
      }
      const handlePage=(page)=>{
        setpage(page);
      }
      const handleSort = (sortOption) => {
        const sort = { _sort: sortOption.sort, _order: sortOption.order };
        console.log({ sort });
        setSort(sort);
      };
      useEffect(() => {
        const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
        dispatch(fetchAllOrdersAsync({ sort, pagination }));
      }, [dispatch, page, sort]);
  return (
    <div>
      <div className="overflow-x-auto">
  <div className=" flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
    <div className="w-full ">
      <div className="bg-white shadow-md rounded my-6">
        <table className="min-w-max w-full table-auto">
          <thead>
            <tr className="bg-pink-950 cursor-pointer text-orange-100 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left"  onClick={(e)=>handleSort({
                        sort: 'id',
                        order: sort?._order === 'asc' ? 'desc' : 'asc',
                      })
                    }>Order#
                    {sort._sort==='id' && (sort._order==='asc'? <ArrowUpIcon className='w-4 h-4 inline'/>
                    :<ArrowDownIcon className='w-4 h-4 inline'/>)}</th>
              <th className="py-3 px-20 text-left">Items</th>
              <th className="py-3 px-6 text-center" onClick={(e)=>handleSort({
                        sort: 'id',
                        order: sort?._order === 'asc' ? 'desc' : 'asc',
                      })
                    } >Total Amount
                     {sort._sort==='id' && (sort._order==='asc'? <ArrowUpIcon className='w-4 h-4 inline'/>
                    :<ArrowDownIcon className='w-4 h-4 inline'/>)}</th>
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
                  <span>{item.title}-{item.quantity}-${discountedPrice(item)}</span>
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
                {order.id===editableOrderId? (
                   <select onChange={e=>handleUpdate(e,order)}>
                   <option value='pending'>Pending</option>
                   <option value='dispatched'>Dispatched</option>
                   <option value='delivered'>Delivered</option>
                   <option value='cancelled'>Cancelled</option>
                 </select>
):(
  <span className={`${chooseColor(order.status)} bg-rose-100 text-pink-950 py-1 px-3 rounded-full text-xs`}>
                  {order.status}
                </span>
                )}
              </td>
              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                  <div className="w-6 mr-4 transform cursor-pointer hover:text-purple-500 hover:scale-120">
                  <EyeIcon className='w-8 h-8' onClick={(e)=>handleShow(order)}/>
                  </div>
                  <div className="w-6 mr-2 transform cursor-pointer hover:text-purple-500 hover:scale-120">
                   <PencilIcon className='w-8 h-8' onClick={(e)=>handleEdit(order)}/>
                  </div>
                </div>
              </td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <Pagination 
              page={page} setpage={setpage} 
              handlePage={handlePage} totalITems={totalorders}/>
</div>

    </div>
  )
}

