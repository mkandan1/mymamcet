import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleRight,
  faChartSimple,
  faClipboardUser,
  faClose,
  faFilePen,
  faReceipt,
  faBell,
  faBars
} from '@fortawesome/free-solid-svg-icons';
import user from '/user.png'
import { useSelector, useDispatch } from 'react-redux';
import { TOGGLE_MENU_OPEN, TOGGLE_MENU_CLOSE } from '../actionTypes/actionTypes';

const asideStyles = {
  open: {
    opacity: 1,
    transform: 'translateX(0)',
    'z-index': '1000',
    transition: 'transform 0.6s ease-in-out, opacity 0.6s ease-in-out',

  },
  closed: {
    // opacity: 0,
    transform: 'translateX(-58rem)',
    transition: 'transform 0.6s ease-in-out, opacity 0.6s ease-in-out',
    'z-index': '1000',
  },
};

const getScreenWidth = () => {
  const { innerWidth: width } = window;

  return {
    width,
  };
};

export const NavBar = () => {
  const dispatch = useDispatch();
  const toggle = useSelector((state) => state.toggle.status);
  const [screenWidth, setScreenWidth] = useState(getScreenWidth());

  const path = useLocation().pathname;

  useLayoutEffect(() => {
    if (screenWidth.width > 768 && !toggle) {
      dispatch(TOGGLE_MENU_OPEN());
      console.log('triggered');
    }
  }, [screenWidth]);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setScreenWidth({ width: newWidth });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleToggleMenu = () => {
    if (toggle) {
      dispatch(TOGGLE_MENU_CLOSE());
    } else {
      dispatch(TOGGLE_MENU_OPEN());
    }
  };

  return (
    <aside
      style={toggle ? asideStyles.open : (asideStyles.closed)}
      className="w-full sm:w-80 md:w-80 lg:w-96 xl:w-80 min-h-screen max-h-full md:inline-block bg-[#313A46]"
      id="aside-nav"
    >
      <div className="h-16 grid grid-cols-1 grid-rows-1 items-center justify-items-center border-b-[1px] border-[#4A4A4A] relative">
        <Link to="/" className="text-[#E7E7E7] font-inter font-normal">
          my<span className="font-bold">MAMCET</span>
        </Link>
        <FontAwesomeIcon
          icon={faClose}
          className="absolute md:hidden right-10 text-[#E7E7E7] cursor-pointer"
          onClick={handleToggleMenu}
        />
      </div>
      <div>
        <div className="pt-10">
          <h3 className="text-[#9CA3AF] font-poppins text-xs pl-10">Main Menu</h3>
          <nav className="text-gray-300 mt-5 grid gap-y-1">
            <Link to="/">
              <li className="list-none font-inter font-normal pl-10 hover:bg-[#CFEBFC] hover:bg-opacity-20 text-[#9AB4C3] mr-3 p-2 rounded-r-full text-xs sm:text-sm" id={(path === '/') ? 'active' : ''}>
                <FontAwesomeIcon icon={faChartSimple} className="mr-2" /> Dashboard
              </li>
            </Link>
            <Link to="/">
              <li className="list-none font-inter font-normal pl-10 hover:bg-[#CFEBFC] hover:bg-opacity-20 text-[#9AB4C3] mr-3 p-2 rounded-r-full text-xs sm:text-sm relative" id={(path === '/attendance') ? 'active' : ''}>
                <FontAwesomeIcon icon={faClipboardUser} className="mr-2" /> Attendance{' '}
                <FontAwesomeIcon icon={faAngleRight} className="absolute right-10 top-3" />
              </li>
            </Link>
            <Link to="/">
              <li className="list-none font-inter font-normal pl-10 hover:bg-[#CFEBFC] hover:bg-opacity-20 text-[#9AB4C3] mr-3 p-2 rounded-r-full text-xs sm:text-sm relative" id={(path === '/billing') ? 'active' : ''}>
                <FontAwesomeIcon icon={faReceipt} className="mr-2" /> Billing{' '}
                <FontAwesomeIcon icon={faAngleRight} className="absolute right-10 top-3" />
              </li>
            </Link>
          </nav>
        </div>
        <div className="pt-10">
          <h3 className="text-[#9CA3AF] font-poppins text-xs pl-10">Management</h3>
          <nav className="text-gray-300 mt-5 grid gap-y-1">
            <Link to="/management/exam">
              <li className="list-none font-inter font-normal pl-10 hover:bg-[#CFEBFC] hover:bg-opacity-20 text-[#9AB4C3] mr-3 p-2 rounded-r-full text-xs sm:text-sm relative" id={(path === '/management/exam') ? 'active' : ''}>
                <FontAwesomeIcon icon={faFilePen} className="mr-2" /> Exam Management{' '}
                <FontAwesomeIcon icon={faAngleRight} className="absolute right-10 top-3" />
              </li>
            </Link>
          </nav>
        </div>
      </div>

    </aside>

  );
};
