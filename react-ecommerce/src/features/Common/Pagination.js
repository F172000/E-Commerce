import { ITEMS_PER_PAGE } from "../../app/constants";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
export default function Pagination({page,setpage,handlePage,totalITems}) {
    const totalPages=Math.ceil(totalITems/ITEMS_PER_PAGE);
    return (
      <div>
         <div className="flex items-center justify-between border-t border-rose-100 bg-white px-4 py-3 sm:px-6">
                  <div className="flex flex-1 justify-between sm:hidden">
                    <div
                       onClick={(e)=>handlePage(page>1?page-1:page)}
                      className="relative inline-flex items-center rounded-md border border-rose-200 bg-orange-100 px-4 py-2 text-sm font-medium text-pink-950 hover:bg-orange-100"
                    >
                      Previous
                    </div>
                    <div
                       onClick={(e)=>handlePage(page<totalPages?page+1:page)}
                      className="relative ml-3 inline-flex items-center rounded-md border border-rose-200 bg-orange-100 px-4 py-2 text-sm font-medium text-pink-950 hover:bg-orange-100"
                    >
                      Next
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-pink-950">
                        Showing <span className="font-medium">{(page-1)*ITEMS_PER_PAGE+1}</span> to{" "}
                        <span className="font-medium">{page*ITEMS_PER_PAGE}</span> of{" "}
                        <span className="font-medium">{totalITems}</span> results
                      </p>
                    </div>
                    <div>
                      <nav
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination"
                      >
                        <div
                          onClick={(e)=>handlePage(page>1?page-1:page)}
                          className="relative inline-flex items-center rounded-l-md px-2 py-2 bg-orange-100 text-pink-950 ring-1 ring-inset ring-rose-200 hover:bg-orange-100 focus:z-20 focus:outline-offset-0"
                        >
                          <span className="sr-only">Previous</span>
                          <ChevronLeftIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </div>
                        {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                        {Array.from({length:totalPages}).map((el,index)=>(
                         <div
                         onClick={(e)=>handlePage(index+1)}
                         aria-current="page"
                         className={`relative cursor-pointer z-10 inline-flex items-center ${
                          index + 1 === page
                            ? 'bg-pink-950 text-orange-100'
                            : 'text-pink-950'
                        } px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-950`}
                       >
                         {index+1}
                       </div>
                       )
                        )
                        }
  
                        <div
                         onClick={(e)=>handlePage(page<totalPages?page+1:page)}
                          className="relative inline-flex items-center rounded-r-md px-2 py-2 bg-orange-100 text-pink-950 ring-1 ring-inset ring-rose-200 hover:bg-orange-100 focus:z-20 focus:outline-offset-0"
                        >
                          <span className="sr-only">Next</span>
                          <ChevronRightIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </div>
                      </nav>
                    </div>
                  </div>
                </div>
      </div>
    )
  }