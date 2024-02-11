import React, { useEffect, useRef, useState } from 'react';
import { Layout } from '../../components/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { savePhotoInFirebase } from '../../services/storeImages';
import { Auth } from '../../apis/auth/Auth';
import { showNotification } from '../../redux/actions/notification';
import { Icon } from '@iconify/react';

export const MyProfile = () => {
  const dispatch = useDispatch();
  const user = useState(useSelector((state) => (state.auth.user).user))[0];
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      title: "Profile",
      url: "/web/user/profile"
    },
    {
      id: 2,
      title: "Settings",
      url: "/web/user/settings"
    },
    {
      id: 3,
      title: "Advanced settings",
      url: "/web/user/settings/advanced"
    }
  ]);

  useEffect(() => {
    setSelectedImage(user.photo)
  }, [])

  const handleFileInputChange = (event) => {
    setIsLoading(true);
    dispatch(showNotification({ type: "success", message: "Uploading in-progress" }))
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onloadend = async () => {
      setSelectedImage(reader.result);
      const type = reader.result.split(';')[0].split(':')[1];
      const url = await savePhotoInFirebase(file, user.email, type);
      console.log(url);
      const result = await Auth.changeProfilePhoto( url);
      if (result.success) {
        dispatch(showNotification({ type: "success", message: "Profile photo updated successfully" }))
        setIsLoading(false);
      }
      else {
        dispatch(showNotification({ type: "error", message: "Error while updating photo" }))
        setIsLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };


  const handleLogOut = () => {
    logOutUser(dispatch, navigate)
  };

  return (
    <Layout>
      <div className='row-start-1 row-span-11 col-span-2 grid grid-cols-3 grid-rows-11 bg-white border border-gray-200 rounded-sm'>
        <h3 className='font-manrope tracking-nornmal col-span-3 flex items-center font-bold text-lg text-gray-800 tracking-tight px-4'>My Account</h3>
        <div className='grid grid-rows-4 grid-cols-3 row-span-3 col-span-3'>
            { menuItems.map((item)=> (
              <Link to={item.url} key={item.id} className='row-span-1 col-span-3 font-manrope text-sm flex justify-between items-center px-4 hover:bg-gray-200 border'>
                {item.title}
                <Icon
                icon={`fluent:ios-arrow-24-filled`}
                className={`text-base p-0 transition-all duration-300 group-hover:text-gray-500 cursor-pointer rotate-180
                  }`}
              />
              </Link>
            ))}
        </div>
      </div>
      <div className='row-start-1 row-span-12 col-span-12 grid grid-cols-12 grid-rows-6 bg-white px-8 py-8'>
        <div className='col-span-3 col-start-1 grid grid-cols-3'>
          <div className='col-span-2'>
            <img src={selectedImage} className='w-full rounded-md' alt='User Profile' />
            <button
              className={`w-full px-4 text-sm font-manrope font-regular rounded-sm text-white mt-4 ${isLoading ? 'bg-blue-200' : 'bg-blue-700'}`}
              onClick={() => fileInputRef.current.click()}
            >
              {isLoading ? 'Uploading' : 'Change photo'}
            </button>
            <input
              type='file'
              accept='image/*'
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleFileInputChange}
            />
          </div>
        </div>
        <div className='col-span-8 col-start-4 grid-cols-8 row-span-8 grid grid-rows-8 h-full gap-y-2'>
          <div className='row-start-1 row-span-1 col-span-12 grid grid-cols-12'>
            <h4 className='font-manrope font-medium text-blue-500 tracking-tighter col-span-12'>Your Details</h4>
          </div>
          <div className='row-start-2 row-span-8 col-span-6 grid grid-rows-10'>
            <div className='col-span-1 flex justify-between'>
              <p className='text-gray-400'>First Name</p>
              <span>{user.firstName}</span>
            </div>
            <div className='col-span-1 flex justify-between'>
              <p className='text-gray-400'>Last Name</p>
              <span>{user.lastName}</span>
            </div>
            <div className='col-span-1 flex justify-between'>
              <p className='text-gray-400'>Phone number</p>
              <span>{user.phone}</span>
            </div>
            <div className='col-span-1 flex justify-between'>
              <p className='text-gray-400'>Email</p>
              <span>{user.email}</span>
            </div>
            <div className='col-span-1 flex justify-between'>
              <p className='text-gray-400'>Address</p>
              <span>{user.address}</span>
            </div>
            <div className='col-span-1 flex justify-between'>
              <p className='text-gray-400'>Job Title</p>
              <span>{user.jobTitle}</span>
            </div>
            <div className='col-span-1 flex justify-between'>
              <p className='text-gray-400'>Department</p>
              <span>{user.department}</span>
            </div>

            <div className='row-span-1 mt-4 col-span-1 gap'>
              <button className='bg-red-500 text-white w-full rounded-sm' onClick={handleLogOut}>Log out</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
