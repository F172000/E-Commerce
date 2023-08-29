import React from 'react'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate,Link } from 'react-router-dom';
import logo from '../images/logo.png';
import { useSelector } from 'react-redux';
import { selectItems } from '../cart/cartSlice';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Kharidari', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
]
const userNavigation = [
  { name: 'Your Profile', Link: '/profile' },
  { name: 'My Orders', Link: '/orders' },
  { name: 'Sign out', Link: '/logout' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function Navbar({children}){
  const items=useSelector(selectItems);
    const navigate=useNavigate();
  return (
    <div>
       <div className="min-h-full">
        <Disclosure as="nav" className="bg-pink-950">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Link to={'/home'}>
                      <img
                        // className="h-18 w-18"
                        style={{width:'9.6em',height:'9.6em'}}
                        src={logo}
                        alt="Your Company"
                      />
                      </Link>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? 'bg-pink-950 text-orange-100'
                                : 'text-orange-100 hover:bg-orange-100 hover:text-pink-950',
                              'rounded-md px-3 py-2 text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                      onClick={()=>navigate('/cart')}
                        type="button"
                        className="relative rounded-full bg-pink-950 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-100 focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <ShoppingCartIcon className="h-6 w-6 text-orange-100 bg-pink-950" aria-hidden="true" />
                      </button>
                      {items.length>0 && <span className="inline-flex items-center rounded-md mb-7  bg-orange-100 px-2 py-1 text-xs font-medium text-pink-950 ring-1 ring-inset ring-red-600/10">
        {items.length}
      </span>}

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
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
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white
                           py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <Link
                                  to={item.Link}
                                    className={classNames(
                                      active ? 'bg-orange-100' : '',
                                      'block px-4 py-2 text-sm text-pink-950'
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-orange-100 p-2 text-pink-950 hover:bg-orange-100 hover:text-pink-950 focus:outline-none focus:ring-2 focus:ring-orange-100 focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-orange-100 text-pink-950' : 'text-orange-100 hover:bg-pink-950 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-orange-100 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-orange-100">{user.name}</div>
                      <div className="text-sm font-medium leading-none text-orange-100">{user.email}</div>
                    </div>
                    <button
                    onClick={()=>navigate('/cart')}
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-pink-950 p-1 text-orange-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-100 focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <ShoppingCartIcon className="h-6 w-6  " aria-hidden="true" />
                    </button>
                    {items.length>0 && <span className="inline-flex items-center rounded-md bg-orange-100 mb-7 px-2 py-1 text-xs font-medium text-pink-950 ring-1 ring-inset ring-red-600/10">
        {items.length}
      </span>}
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-orange-100 hover:bg-orange-100 hover:text-pink-950"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-pink-950">Kharidari</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  )
}

