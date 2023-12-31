import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ITEMS_PER_PAGE, discountedPrice } from "../../../app/constants";
import Pagination from "../../Common/Pagination";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { fetchProductsByFiltersAsync,fetchAllProductsAsync,selectAllProducts, selecttotalItems, selectAllBrands, selectAllCategories, fetchBrandsAsync, fetchCategoriesAsync } from "../productSlice";

const items = [
  {
    id: 1,
    title: "Back End Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
  },
  {
    id: 2,
    title: "Front End Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
  },
  {
    id: 3,
    title: "User Interface Designer",
    department: "Design",
    type: "Full-time",
    location: "Remote",
  },
];
const sortOptions = [

  { name: "Best Rating", sort: 'rating',order:'desc', current: false },
  { name: "Price: Low to High", sort: 'price',order:'asc', current: false },
  { name: "Price: High to Low", sort: 'price',order:'desc', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductList() {
  const dispatch = useDispatch();
     const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filter,setfilter]=useState({});
  const [sort,setsort]=useState({});
  const brands=useSelector(selectAllBrands);
  const categories=useSelector(selectAllCategories);
  const [page,setpage]=useState(1);
  const handlefilters=(e,section,option)=>{
    //:TODO:on server it will support multiple categories
    console.log(e.target.checked);
    const newFilter={...filter};
    if(e.target.checked){
      if(newFilter[section.id]){
        newFilter[section.id].push(option.value);
      }else{
        newFilter[section.id]=[option.value];
      }
    }
    else{
    const index=newFilter[section.id].findIndex(el=>el===option.value);
    newFilter[section.id].splice(index,1);
    }
    console.log({newFilter});
    setfilter(newFilter);
      }
      const handleSort=(e,option)=>{
        const sort={_sort:option.sort,_order:option.order,};
        setsort(sort);
      }
      const handlePage=(page)=>{
        console.log({page});
        setpage(page);
      }
  useEffect(()=>{
dispatch(fetchAllProductsAsync());
  },[dispatch]);
  useEffect(()=>{
    const pagination={_page:page,_limit:ITEMS_PER_PAGE};
    dispatch(fetchProductsByFiltersAsync({filter,sort,pagination}));
    //TODO: server will filter all deleted products
  },[dispatch,filter,sort,page]);
  const products = useSelector(selectAllProducts);
  const totalITems=useSelector(selecttotalItems);
  useEffect(()=>{
    setpage(1);
  },[totalITems,sort])
  useEffect(()=>{
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync());
  },[])
  const filters = [
    {
      id: "category",
      name: "Category",
      options: categories,
    },
    {
      id: "brand",
      name: "Brands",
      options: brands,
    },
  ];
  console.log('brands:',brands);
  console.log('categories',categories);
  console.log('Products:', products);
  console.log(filters);
  return (
    <div>
      <div>
        <div className="bg-white">
          <div>
            {/* Mobile filter dialog */}
          <MobileFilter handlefilters={handlefilters} mobileFiltersOpen={mobileFiltersOpen} setMobileFiltersOpen={setMobileFiltersOpen} filters={filters}/>

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-baseline justify-between border-b border-rose-100 pb-6 pt-24">
                <h1 className="lg:text-4xl font-bold tracking-tight text-pink-950">
                  All Products
                </h1>

                <div className="flex items-center">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="group inline-flex justify-center text-sm font-medium text-pink-950 hover:text-pink-950">
                        Sort
                        <ChevronDownIcon
                          className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-pink-950 group-hover:text-pink-950"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {sortOptions.map((option) => (
                            <Menu.Item key={option.name}>
                              {({ active }) => (
                                <p
                                  href={option.href}
                                  onClick={e=>handleSort(e,option)}
                                  className={classNames(
                                    option.current
                                      ? "font-medium text-pink-950"
                                      : "text-pink-950",
                                    active ? "bg-orange-100" : "",
                                    "block px-4 py-2 text-sm"
                                  )}
                                >
                                  {option.name}
                                </p>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  <button
                    type="button"
                    className="-m-2 ml-5 p-2 text-pink-950 hover:text-pink-950 sm:ml-7"
                  >
                    <span className="sr-only">View grid</span>
                    <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="-m-2 ml-4 p-2 text-pink-950 hover:text-pink-950 sm:ml-6 lg:hidden"
                    onClick={() => setMobileFiltersOpen(true)}
                  >
                    <span className="sr-only">Filters</span>
                    <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <section
                aria-labelledby="products-heading"
                className="pb-24 pt-6"
              >
                <h2 id="products-heading" className="sr-only">
                  Products
                </h2>

                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                  {/* Filters */}
                 <DesktopFilter  handlefilters={handlefilters} filters={filters}/>
                  {/* Product grid */}
                  <div className="lg:col-span-3">
                    {" "}
                   <ProductGrid products={products}/>
                  </div>
                </div>
                {/**Product grid end */}
              </section>
              {/**section of product and filters end here */}
             <Pagination 
              page={page} setpage={setpage} 
              handlePage={handlePage} totalITems={totalITems}/>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}


function MobileFilter({handlefilters,mobileFiltersOpen,setMobileFiltersOpen,filters}) {

  return (
    <div>
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-40 lg:hidden"
                onClose={setMobileFiltersOpen}
              >
                <Transition.Child
                  as={Fragment}
                  enter="transition-opacity ease-linear duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 z-40 flex">
                  <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                      <div className="flex items-center justify-between px-4">
                        <h2 className="text-lg font-medium text-pink-950">
                          Filters
                        </h2>
                        <button
                          type="button"
                          className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-orange-100 p-2 text-pink-450"
                          onClick={() => setMobileFiltersOpen(false)}
                        >
                          <span className="sr-only">Close menu</span>
                          <XMarkIcon className="h-6 w-6 text-pink-950" aria-hidden="true" />
                        </button>
                      </div>

                      {/* Filters */}
                      <form className="mt-4 border-t border-rose-100">
                        {filters.map((section) => (
                          <Disclosure
                            as="div"
                            key={section.id}
                            className="border-t border-rose-100 px-4 py-6"
                          >
                            {({ open }) => (
                              <>
                                <h3 className="-mx-2 -my-3 flow-root">
                                  <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-pink-950 hover:text-pink-950">
                                    <span className="font-medium text-pink-950">
                                      {section.name}
                                    </span>
                                    <span className="ml-6 flex items-center">
                                      {open ? (
                                        <MinusIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <PlusIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      )}
                                    </span>
                                  </Disclosure.Button>
                                </h3>
                                <Disclosure.Panel className="pt-6">
                                  <div className="space-y-6">
                                    {section.options.map(
                                      (option, optionIdx) => (
                                        <div
                                          key={option.value}
                                          className="flex items-center"
                                        >
                                          <input
                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                            name={`${section.id}[]`}
                                            defaultValue={option.value}
                                            type="checkbox"
                                            defaultChecked={option.checked}
                                            onChange={e=>handlefilters(e,section,option)}
                                            className="h-4 w-4 rounded border-gray-300 text-pink-950 focus:ring-pink-950"
                                          />
                                          <label
                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                            className="ml-3 min-w-0 flex-1 text-pink-950"
                                          >
                                            {option.label}
                                          </label>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        ))}
                      </form>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition.Root>
    </div>
  )
}
function DesktopFilter({handlefilters,filters}) {
  return (
    <div>
       <form className="hidden lg:block">
                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-b border-rose-100 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-pink-950 hover:text-pink-950">
                                <span className="font-medium text-pink-950">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-4">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      onChange={e=>handlefilters(e,section,option)}
                                      className="h-4 w-4 rounded border-pink-950 text-pink-950 focus:ring-pink-950"
                                    />
                                    <label
                                      htmlFor={`filter-${section.id}-${optionIdx}`}
                                      className="ml-3 text-sm text-pink-950"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>

    </div>
  )
}

function ProductGrid({products}) {
  return (
    <div>
       <div className="bg-white">
                      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                        {products.length > 0 ? (
  products.map((product) => (
                            <Link to={`/productdetail/${product.id}`} key={product.id}>
                              <div  className="group relative p-2 border-solid border-2 border-rose-100 bg-orange-100">
                                <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-pink-950 lg:aspect-none group-hover:opacity-75 lg:h-60">
                                  <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                  />
                                </div>
                                <div className="mt-4 flex justify-between">
                                  <div>
                                    <h3 className="text-sm text-pink-950">
                                      <div href={product.thumbnail}>
                                        <span
                                          aria-hidden="true"
                                          className="absolute inset-0"
                                        />
                                        {product.title}
                                      </div>
                                    </h3>
                                    <p className="mt-1 text-sm text-pink-950">
                                      <StarIcon className="inline w-5 h-5 text-yellow-500"></StarIcon>
                                      <span className="align-bottom"> {product.rating}</span>
                                    </p>
                                  </div>
                                  <div>
                                  <p className="text-sm block font-medium text-pink-950">
                                   $ {discountedPrice(product)}
                                  </p>
                                  <p className="text-sm block line-through font-medium text-gray-600">
                                    $ {product.price}
                                  </p>
                                  </div>
                                </div>
                                {product.deleted && <div>
                              <p className="text-sm text-red-400">product deleted</p>
                              </div>}
                              {product.stock<=0 && <div>
                              <p className="text-sm text-red-400">out of stock</p>
                              </div>}
                              </div> 
                            </Link>
                          ))): (
                            <p className="font-medium text-pink-950">Data is not loaded</p>
                            // Loading or no products available message
                          )}
                        </div>
                      </div>
                    </div>
    </div>
  )
}

