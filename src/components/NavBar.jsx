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
  faBars,
  faRightFromBracket,
  faPeopleGroup,
  faUserAlt,
  faGraduationCap,
  faBook
} from '@fortawesome/free-solid-svg-icons';
import user from '/user.png'
import { useSelector, useDispatch } from 'react-redux';
import { TOGGLE_MENU_OPEN, TOGGLE_MENU_CLOSE, LOGOUT } from '../actionTypes/actionTypes';
import { signOut } from 'firebase/auth';
import { auth } from '../FirebaseConfig';
import { Header } from './Header';

const asideStyles = {
  open: {
    opacity: 1,
    transform: 'translateX(0)',
    'zIndex': '1000',
    transition: 'transform 0.6s ease-in-out, opacity 0.6s ease-in-out',

  },
  closed: {
    opacity: 0,
    transform: 'translateX(-58rem)',
    transition: 'transform 0.6s ease-in-out, opacity 0.6s ease-in-out',
    'zIndex': '-10',
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
  const [showSubPath, setShowSubPath] = useState([{ exam_management: false, students: false }]);

  const path = useLocation().pathname;

  useLayoutEffect(() => {
    if (screenWidth.width > 768 && !toggle) {
      dispatch(TOGGLE_MENU_OPEN());
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
      console.log('Closing');
      dispatch(TOGGLE_MENU_CLOSE());
      console.log(toggle);
    } else {
      dispatch(TOGGLE_MENU_OPEN());
    }
  };


  const handleLogout = () => {
    signOut(auth).then(() => {
      dispatch(LOGOUT())
    })
      .catch((err) => {
        console.error(err);
      })
  }

  const handleSubPathShowing = (field) => {
    const newData = [...showSubPath];
    newData[0][field] = !showSubPath[0][field];
    setShowSubPath(newData);
  }

  return (
    <>
      <aside
        style={toggle ? (asideStyles.open) : (asideStyles.closed)}
        className="w-80 sm:w-80 md:w-80 lg:w-80 xl:w-74 min-h-full fixed md:inline-block bg-[#313A46]"
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
                <li className="list-none font-inter font-normal pl-10 hover:bg-[#CFEBFC] hover:bg-opacity-20 text-[#9AB4C3] mr-3 p-2 rounded-r-sm text-xs sm:text-sm" id={(path === '/') ? 'active' : ''}>
                  <FontAwesomeIcon icon={faChartSimple} className="mr-2" /> Dashboard
                </li>
              </Link>
              <Link to="/main/batches">
                <li className="list-none font-inter font-normal pl-10 hover:bg-[#CFEBFC] transition-all duration-150 hover:bg-opacity-20 text-[#9AB4C3] mr-3 p-2 rounded-r-sm text-xs sm:text-sm relative" id={(path === '/main/batches') ? 'active' : ''}>
                  <FontAwesomeIcon icon={faPeopleGroup} className="mr-2" /> Batches
                  <FontAwesomeIcon icon={faAngleRight} className={`absolute right-10 top-3 transition-all duration-300`} />
                </li>
              </Link>
              <Link to="/main/subjects">
                <li className="list-none font-inter font-normal pl-10 hover:bg-[#CFEBFC] transition-all duration-150 hover:bg-opacity-20 text-[#9AB4C3] mr-3 p-2 rounded-r-sm text-xs sm:text-sm relative" id={(path === '/main/subjects') ? 'active' : ''}>
                  <FontAwesomeIcon icon={faBook} className="mr-2" /> Subjects
                  <FontAwesomeIcon icon={faAngleRight} className={`absolute right-10 top-3 transition-all duration-300`} />
                </li>
              </Link>
              <div className='hover:bg-[#CFEBFC] hover:bg-opacity-20 mr-3 rounded-r-sm cursor-pointer' onClick={() => handleSubPathShowing('students')}>
                <nav>
                  <li className="list-none font-inter font-normal pl-10 text-[#9AB4C3] p-2 text-xs sm:text-sm relative" id={(path === '/main/students/list') ? 'active' : ''}>
                    <FontAwesomeIcon icon={faClipboardUser} className="mr-2" /> Students
                    <FontAwesomeIcon icon={faAngleRight} className={`absolute transition-all duration-200 right-10 top-3 ${showSubPath[0].students ? '-rotate-90' : ''}`} />
                  </li>
                </nav>
                {
                  showSubPath[0].students ? (
                    <ul className='ml-10 mt-2 py-1 pb-4 pl-5'>
                      <li className='text-sm font-inter text-[#9AB4C3]'><Link to={'/main/students/list'}><FontAwesomeIcon icon={faPeopleGroup} className="mr-2" />Students List</Link></li>
                    </ul>
                  ) : <></>
                }
              </div>
              {/* <Link to="/_s/attendance">
                <li className="list-none font-inter font-normal pl-10 hover:bg-[#CFEBFC] hover:bg-opacity-20 text-[#9AB4C3] mr-3 p-2 rounded-r-sm text-xs sm:text-sm relative" id={(path === '/attendance') ? 'active' : ''}>
                  <FontAwesomeIcon icon={faClipboardUser} className="mr-2" /> Attendance
                  <FontAwesomeIcon icon={faAngleRight} className="absolute right-10 top-3" />
                </li>
              </Link>
              <Link to="/_s/billing">
                <li className="list-none font-inter font-normal pl-10 hover:bg-[#CFEBFC] hover:bg-opacity-20 text-[#9AB4C3] mr-3 p-2 rounded-r-sm text-xs sm:text-sm relative" id={(path === '/billing') ? 'active' : ''}>
                  <FontAwesomeIcon icon={faReceipt} className="mr-2" /> Billing{' '}
                  <FontAwesomeIcon icon={faAngleRight} className="absolute right-10 top-3" />
                </li>
              </Link> */}
            </nav>
          </div>
          <div className="pt-10">
            <h3 className="text-[#9CA3AF] font-poppins text-xs pl-10">Management</h3>
            <nav className="text-gray-300 mt-5 grid gap-y-1">
              <Link to="/management/exam">
                <li className="list-none font-inter font-normal pl-10 hover:bg-[#CFEBFC] transition-all duration-150 hover:bg-opacity-20 text-[#9AB4C3] mr-3 p-2 rounded-r-sm text-xs sm:text-sm relative" id={(path === '/management/exam') ? 'active' : ''}>
                  <FontAwesomeIcon icon={faFilePen} className="mr-2" /> Exam Management{' '}
                  <FontAwesomeIcon icon={faAngleRight} className={`absolute right-10 top-3 transition-all duration-300`} />
                </li>
              </Link>
            </nav>
          </div>
          <div className="pt-10">
            <h3 className="text-[#9CA3AF] font-poppins text-xs pl-10">User Management</h3>
            <nav className="text-gray-300 mt-5 grid gap-y-1">
              <Link to="/management/users">
                <li className="list-none font-inter font-normal pl-10 hover:bg-[#CFEBFC] transition-all duration-150 hover:bg-opacity-20 text-[#9AB4C3] mr-3 p-2 rounded-r-sm text-xs sm:text-sm relative" id={(path === '/management/users') ? 'active' : ''}>
                  <FontAwesomeIcon icon={faUserAlt} className="mr-2" />Manage Users
                  {/* <FontAwesomeIcon icon={faAngleRight} className={`absolute right-10 top-3 transition-all duration-300`} onClick={() => handleSubPathShowing('exam_management')} /> */}
                </li>
              </Link>
            </nav>
          </div>
        </div>

        <div className='w-full absolute bottom-10 pl-10 pr-10'>
          <button className=' text-[#9CA3AF] text-sm font-inter grid grid-cols-2 items-center' onClick={handleLogout}>
            <FontAwesomeIcon icon={faRightFromBracket} /> Logout
          </button>
        </div>

      </aside>

      <Header />
    </>
  );
};
