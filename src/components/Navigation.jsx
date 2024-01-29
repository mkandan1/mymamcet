import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

export const Navigation = () => {
  // State to manage the expanded/collapsed state of each menu item
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      title: 'Dashboard',
      icon: 'tdesign:dashboard-1',
      subMenuItems: [
        { id: 11, title: 'Dashboard', url: '/web' },
      ],
      isExpanded: false,
    },
    {
      id: 2,
      title: 'Admissions',
      icon: 'fluent:form-multiple-24-regular',
      subMenuItems: [
        { id: 11, title: 'Admission Registry', url: '/web/admissions/registry' },
      ],
      isExpanded: false,
    },
    {
      id: 3,
      title: 'Employees',
      icon: 'clarity:employee-group-line',
      subMenuItems: [
        { id: 11, title: 'Employees Onboarding', url: '/web/employees/onboarding' },
        { id: 12, title: 'Employees List', url: '/web/employees/all' },
      ],
      isExpanded: false,
    },
    {
      id: 4,
      title: 'Courses',
      icon: 'carbon:course',
      subMenuItems: [
        { id: 11, title: 'All courses', url: '/web/courses/all' },
        { id: 12, title: 'Subject Mapping', url: '/web/courses/subject-mapping' },
      ],
      isExpanded: false,
    },
  ]);

  const toggleSubMenu = (itemId) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, isExpanded: !item.isExpanded } : { ...item, isExpanded: false }
      )
    );
  };

  return (
    <div className='col-span-2 col-start-1 row-span-12 row-start-1 z-20 grid grid-cols-1 grid-rows-12 h-screen bg-gray-50'>
      <div className='h-full row-span-1 row-start-1 flex items-center px-8 gap-x-1 border-b border-r border-gray-200 bg-white'>
        <img src='https://firebasestorage.googleapis.com/v0/b/mymamcet.appspot.com/o/mamcet%2Fassets%2Fimage%2Fmamcet%20logo.jpg?alt=media&token=e2cf6795-eb9c-43c4-8e62-0f3bbecee8e4' className='w-5' alt="mamcet logo"/>
        <h6 className='text-gray-600'>MAMCET</h6>
      </div>

      <div className='h-full row-span-11 row-start-2'>
        {menuItems.map((menuItem, index) => (
          <div key={menuItem.id} className='relative block'>
            <div
              className={`w-full h-14 flex items-center justify-between group px-4 border-b border-r border-gray-300 hover:bg-gray-200 hover:text-gray-500 transition-all duration-300 cursor-pointer`}
              onClick={() => toggleSubMenu(menuItem.id)}
            >
              <div className='flex items-center flex-wrap gap-2 text-gray-700'>
                <Icon icon={menuItem.icon}/>
                <span className='font-manrope text-sm'>{menuItem.title}</span>
              </div>

              <Icon
                icon={`line-md:plus`}
                className={`text-lg p-0 transition-all duration-300 group-hover:text-gray-500 cursor-pointer ${menuItem.isExpanded ? 'rotate-90' : ''
                  }`}
              />
            </div>

            {menuItem.isExpanded && (
              <div className='row-start-2 block w-full bg-gray-300 transition-all duration-300 overflow-hidden text-gray-700'>
                {menuItem.subMenuItems.map((subMenuItem) => (
                  <Link
                    to={subMenuItem.url}
                    key={subMenuItem.id}
                    className='w-full block px-8 py-2 text-sm font-manrope hover:bg-gray-400 text-gray-600'
                  >
                    {subMenuItem.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>


  );
};
