import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../config/Firebase';

export const savePhotoInFirebase = async (selectedFile, file, type) => {
  try {
    const storage = getStorage(app);
    console.log("type "+type, "file "+file, "selected "+selectedFile);
    const imageType = type.split('/')[1];
    const fileName = `mamcet/users/${file}/${file}.${imageType}`;
    const storageRef = ref(storage, fileName);
    const metadata = {
        contentType: type,
      };
    const uploadTask = uploadBytesResumable(storageRef, selectedFile, metadata);

    uploadTask.on('state_changed',
      () => {},
      (error) => {
        console.error('Error uploading file to Firebase Storage:', error);
      },
      async () => {
        console.log('File uploaded successfully');
      }
    );

    const snapshot = await uploadTask;
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;

  } catch (error) {
    console.error('Error in savePhotoInFirebase:', error);
    throw error;
  }
};