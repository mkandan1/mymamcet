import React, { useEffect, useRef, useState } from 'react';
import { Layout } from '../../components/Layout';
import { useSelector, useDispatch } from 'react-redux';// Import your Redux action
import { logOutUser } from '../../apis/auth/authorization';
import { useNavigate } from 'react-router-dom';
import { savePhotoInFirebase } from '../../services/storeImages';
import { changeProfilePhoto } from '../../apis/auth/accounts';
import { showNotification } from '../../redux/actions/notification';

export const MyProfile = () => {
  const dispatch = useDispatch();
  const user = useState(useSelector((state) => (state.auth.user).user))[0];
  const fileInputRef = useRef(null);
  const [photoType, setPhotoType] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const navigate = useNavigate();

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
      const result = await changeProfilePhoto(url);
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
      <div className='row-start-1 row-span-1 col-span-12 flex items-center bg-white border-b px-4'>
        <h3 className='font-sen font-medium tracking-tighter text-gray-600'>My Account</h3>
      </div>
      <div className='row-start-3 row-span-5 col-span-12 grid grid-cols-12 grid-rows-5 bg-white border px-4 py-4 mx-4'>
        <div className='col-span-3 grid grid-cols-3'>
          <div className='col-span-2'>
            <img src={selectedImage} className='w-full' alt='User Profile' />
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
        <div className='col-span-9 grid-cols-9 row-span-5 grid grid-rows-5 h-full gap-y-2'>
          <div className='row-start-1 row-span-1 col-span-12 grid grid-cols-12'>
            <h4 className='font-manrope font-medium text-gray-700 tracking-tighter col-span-12'>Your Details</h4>
          </div>
          <div className='row-start-2 row-span-1 col-span-9 grid grid-cols-9 gap-2'>
            <div className='col-span-2'>
              <p className='text-gray-400'>First Name</p>
              <span>{user.firstName}</span>
            </div>
            <div className='col-span-2'>
              <p className='text-gray-400'>Last Name</p>
              <span>{user.lastName}</span>
            </div>
            <div className='col-span-2'>
              <p className='text-gray-400'>Phone number</p>
              <span>{user.phone}</span>
            </div>
            <div className='col-span-2'>
              <p className='text-gray-400'>Email</p>
              <span>{user.email}</span>
            </div>
          </div>
          <div className='row-start-3 row-span-1 col-span-9 grid grid-cols-9 gap-2'>
            <div className='col-span-2'>
              <p className='text-gray-400'>Address</p>
              <span>{user.address}</span>
            </div>
            <div className='col-span-2'>
              <p className='text-gray-400'>Job Title</p>
              <span>{user.jobTitle}</span>
            </div>
            <div className='col-span-2'>
              <p className='text-gray-400'>Department</p>
              <span>{user.department}</span>
            </div>
          </div>

          <div className='row-start-5 row-span-1 col-span-9 grid grid-cols-9 gap-2'>
            <button className='bg-red-500 text-white rounded-sm' onClick={handleLogOut}>Log out</button>
          </div>

        </div>
      </div>
    </Layout>
  );
};
