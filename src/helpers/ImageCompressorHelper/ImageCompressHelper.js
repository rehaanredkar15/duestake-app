   

import imageCompression from 'browser-image-compression';
import { handleSnackbar } from '../SnackbarHelper/SnackbarHelper';

    const ImageCompression = async (selectedImage) =>  {
        const imageFile = selectedImage;
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true
        }
        try {
          const compressedFile = await imageCompression(imageFile, options);

          return compressedFile
          
        } catch (error) {
            handleSnackbar(true,"warning","Failed to Compress the Uploaded Image:Try again")
        }
      };
  
      export default ImageCompression;

