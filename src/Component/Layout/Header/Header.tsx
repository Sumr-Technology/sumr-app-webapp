import SumrLogo from '../../../assets/images/Sumr.png';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../Helpers/Firebase';

const SIDEBAR_TABS = [
  { name: 'Sumrs', path: '/sumrs' },
  { name: 'Profile', path: '/profile' },
  { name: 'Playlists', path: '/playlists' },
];

const Header = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleLogOut = () => {
    auth.signOut();
    navigate('/login');
    localStorage.clear();
  };

  const handleTabClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };
  return (
    <>
      <nav className="fixed top-0 z-40 text-white w-full bg-transparent">
        <header className="px-36 md:px-12">
          <nav
            className="flex items-center justify-between p-5 lg:px-0"
            aria-label="Global"
          >
            <div className="flex lg:flex-1">
              <a href="#" className="">
                <span className="sr-only">Sumr</span>
                <img src={SumrLogo} alt="Sumr" className="h-8 md:h-14 w-auto" />
              </a>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </nav>
          <Dialog
            as="div"
            className="lg:hidden"
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
          >
            <div className="fixed inset-0 z-10" />
            <Dialog.Panel className="fixed z-50 inset-y-0 right-0 bg-primary w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Sumr</span>
                  <img src={SumrLogo} alt="Sumr" className="h-8 w-auto" />
                </a>
                <button
                  type="button"
                  className="-m-2.5 cursor-pointer rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon
                    className="h-6 w-6 cursor-pointer"
                    aria-hidden="true"
                  />
                </button>
              </div>
              <div className="mt-10 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div>
                    {SIDEBAR_TABS.map((tab) => (
                      <a
                        className="-mx-3 text-white block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-primaryDark cursor-pointer"
                        onClick={() => handleTabClick(tab.path)}
                      >
                        {tab.name}
                      </a>
                    ))}
                  </div>
                  <div className="py-6">
                    <a
                      onClick={handleLogOut}
                      className="cursor-pointer -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover-bg-gray-50"
                    >
                      Log out
                    </a>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
        </header>
      </nav>
    </>
  );
};

export default Header;
