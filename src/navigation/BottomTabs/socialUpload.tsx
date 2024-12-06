import React, { useEffect, useState } from 'react';
import CameraModal from '../../components/primitive/Modal/cameraModal';

const VideoUploadScreen = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  useEffect(() => {
    setIsCameraOpen(true);
    
    
  }, [!isCameraOpen]);

  const closeCameraModal = () => {
    setIsCameraOpen(false);
  };

  return <CameraModal onPress={closeCameraModal} isCameraOpen={isCameraOpen} setIsCameraOpen={setIsCameraOpen}/>;
};

export default VideoUploadScreen;
