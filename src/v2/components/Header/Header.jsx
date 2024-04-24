import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { Dashboard } from '../../pages/Dashboard/Dashboard';
import { useState } from 'react';

export const Header = ({children}) => {
    const user = useSelector((state) => (state.user));
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = (menuAction) => {
        console.log(menuAction);
        if (menuAction == 'open') {
            setIsMenuOpen(true)
        }
        else {
            setIsMenuOpen(false)
        }
        console.log(isMenuOpen);
    }
    return (
        <div className='flex flex-col w-full'>
            <header className='w-screen h-20 shadow-md p-5 flex items-center md:w-full justify-between bg-white md:rounded-t-xl'>
                <div className='flex items-center gap-2'>
                    {isMenuOpen ?
                        <Icon icon={`material-symbols-light:close`} className='text-2xl cursor-pointer md:hidden' onClick={() => handleMenuToggle('close')} /> :
                        <Icon icon={`material-symbols-light:menu`} className='text-2xl cursor-pointer md:hidden' onClick={() => handleMenuToggle('open')} />}
                    <p className='md:font-medium md:text-violet-950'>M.A.M. COLLEGE OF ENGINEERING & TECHNOLOGY</p>
                </div>
                <div className='flex gap-2'>
                    <img src={user.photo} alt='user profile' className='w-9 md:w-8 rounded-full border border-gray-300' />
                    <div className='hidden md:flex items-center gap-4'>
                        <span className='uppercase text-sm font-semibold'>{user.firstName} {user.lastName}</span>
                        <Icon icon={'fe:arrow-down'} className='text-lg' />
                    </div>
                </div>

                <div className={`${isMenuOpen ? '' : 'hidden md:block'} z-10 absolute top-20 bottom-0 bg-white w-full md:w-1/6 md:border md:border-r-gray-200 left-0 md:left-[80px] md:mt-[1px] p-5 text-slate-500 text-sm`}>
                    <div className='w-full flex justify-center border-b border-gray-100 py-5'>
                        <img src='https://www.mycamu.co.in/camu_attachment/get/61823908c3e5c6fcf0bfd264' className='w-3/4'></img>
                    </div>
                    <ul>
                        <NavLink text={"Dashboard"} link={'/dashboard'} />
                        <NavLink text={"Courses"} link={'/courses'} />
                        <NavLink text={"Subjects"} link={'/subjects'} />
                        <NavLink text={"Subject Mapping"} link={'/subject-mapping'} />
                        <NavLink text={"Exam"} link={'/exam/all'} />
                    </ul>
                </div>
            </header>

            <div className='hidden md:flex absolute top-[81px] ml-1 bg-white right-0 left-80 h-max-screen overflow-auto items-center p-5'>
                {children}
            </div>
        </div>
    );
}

function NavLink({ text, link }) {
    const handleRoute = () => {
        return window.location.pathname = link
    }
    return (
        <li className='hover:bg-blue-200 border border-white transition-all duration-200 hover:border-blue-400 border-b border-b-slate-200 md:border-b-white md:hover:text-blue-600 md:hover:bg-blue-100 md:rounded-md md:my-2 cursor-pointer p-2' onClick={() => handleRoute()}>{text}</li>
    )
}