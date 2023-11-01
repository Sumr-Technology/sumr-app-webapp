import React from "react";
import SumrLogo from '/Users/sburke/Desktop/Development/Sumr/sumr-app-webapp/src/assets/images/Sumr.png'
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../Helpers/Firebase";

const products = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: ArrowPathIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const SIDEBAR_TABS = [
  { name: "Sumrs", path: "/sumrs" },
  { name: "Profile", path: "/profile" },
  { name: "Playlists", path: "/playlists" },
];

const Header = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleLogOut = () => {
    auth.signOut();
    navigate("/login");
    localStorage.clear();
  };

  const handleTabClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };
  return (
    <>
      <nav className="fixed top-0 z-50 text-white w-full bg-primaryDark">
        <header className="px-36">
          <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Sumr</span>
                <img
                  src={SumrLogo} 
                  alt="Sumr"
                  className="h-8 w-auto" 
                />
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
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <a
                className="cursor-pointer text-md font-semibold leading-6 text-white"
                onClick={handleLogOut}
              >
                Log out <span aria-hidden="true">&rarr;</span>
              </a>
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
                  <img
                    src={SumrLogo} 
                    alt="Sumr"
                    className="h-8 w-auto" 
                  />
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
