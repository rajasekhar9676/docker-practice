import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel
} from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import logopic2 from '../assets/logopic2.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Products', href: '/products', current: false },
  { name: 'About', href: '/about', current: false },
  {name:'Market Prices', href:'market-prices',current:false},
  // { name: 'Contact', href: '/contact', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      {/* --- NAVBAR --- */}
      <Disclosure as="nav" className="bg-[#8fbf21] fixed top-0 w-full z-50 shadow-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex h-20 items-center justify-between">
            {/* Logo + Nav links */}
            <div className="flex flex-1 items-center justify-start">
              <a href="/" className="flex items-center">
                <img src={logopic2} alt="Raithe Raju" className="h-16 w-auto" />
              </a>
              <div className="hidden sm:ml-10 sm:flex sm:space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-[#8fbf21] text-white'
                        : 'text-white hover:bg-[#7aad1e] hover:text-white',
                      'rounded-md px-4 py-2 text-base font-medium'
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile Menu & Profile Icon */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Mobile Hamburger */}
              <div className="flex items-center sm:hidden">
                <DisclosureButton className="group inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <Bars3Icon className="block h-6 w-6 group-data-[open]:hidden" />
                  <XMarkIcon className="hidden h-6 w-6 group-data-[open]:block" />
                </DisclosureButton>
              </div>

              {/* Profile Icon - Sidebar Trigger */}
              <div className="cursor-pointer" onClick={() => setShowSidebar(true)}>
                <UserCircleIcon className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Nav Links */}
        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={item.current ? 'page' : undefined}
                className={classNames(
                  item.current
                    ? 'bg-[#8fbf21] text-white'
                    : 'text-white hover:bg-[#7aad1e] hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium'
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>

      {/* --- SIDEBAR --- */}
      {showSidebar && (
        <div className="fixed top-0 right-0 w-72 h-full bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out">
          <div className="flex justify-between items-center px-4 py-4 border-b">
            <h2 className="text-lg font-semibold">Your Profile</h2>
            <button
              onClick={() => setShowSidebar(false)}
              className="text-gray-500 text-lg"
            >
              ✕
            </button>
          </div>

          <div className="p-4">
            {user ? (
              <>
                <div className="mb-4">
                  <p className="font-semibold">{user.name || 'User'}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>

                <button
                  onClick={() => {
                    logout();
                    setShowSidebar(false);
                    navigate('/');
                  }}
                  className="w-full bg-red-600 hover:bg-red-200 text-white px-4 py-2 rounded text-sm"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <div className="text-xs text-gray-500 uppercase mb-2 tracking-wide">
                  Login As
                </div>
                <button
                  onClick={() => {
                    setShowSidebar(false);
                    navigate('/farmer-login');
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                >
                  Farmer Login
                </button>
                <button
                  onClick={() => {
                    setShowSidebar(false);
                    navigate('/buyer-login');
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded mt-2"
                >
                  Buyer Login
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
