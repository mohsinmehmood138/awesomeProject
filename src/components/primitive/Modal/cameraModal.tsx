import React, { useEffect, useState, useRef } from 'react';
import Modal from 'react-native-modal';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import Divider from '../AppDivider';
import Video from 'react-native-video';
import { RadioButton } from 'react-native-paper';
import colors from '../../../shared/theme/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

interface CameraProps {
  isCameraOpen: boolean;
  onPress: () => void;
  setIsCameraOpen: any;
}

const CameraModal: React.FC<CameraProps> = ({
  isCameraOpen,
  onPress,
  setIsCameraOpen,
}) => {
  const [caption, setCaption] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [frontCamera, setFrontCamera] = useState(false);
  const [visibility, setVisibility] = useState('public');
  const [userId, setUserId] = useState('viralsquare138');
  const [userName, setUserName] = useState('Viral Sqaure');
  const [showNextButton, setShowNextButton] = useState(false);
  const [showRadioButton, setShowRadioButton] = useState(false);
  const [uploadFinalVideo, setUploadFinalVideo] = useState(false);
  const [showRecordedVideo, setShowRecordedVideo] = useState(false);
  const [location, setLocation] = useState('Lahore,Punjab ,Pakistan');

  const camera = useRef<Camera>(null);

  const device = useCameraDevice(frontCamera ? 'front' : 'back');
  const { hasPermission } = useCameraPermission();
  const navigation = useNavigation();

  if (!hasPermission || device == null) return null;

  const toggleCamera = () => {
    setFrontCamera(!frontCamera);
  };

  const uploadVideo = () => {
    if (caption == '') {
      Alert.alert('Please Write The Caption');

      return;
    } else {
      if (caption?.length > 10) {
        Alert.alert('Caption Is Too Long');
        return;
      }
      const finalVlaue = {
        userId: userId,
        caption: caption,
        location: location,
        userName: userName,
        videoUrl: videoUrl,
      };
     
    }
  };

  const closeVideoPopUp = () => {
    navigation.goBack();
    setIsCameraOpen(false);
  };

  const startVideoRecord = () => {
    if (camera.current) {
      if (isRecording) {
        camera.current.stopRecording();
        setIsRecording(false);
      } else {
        setIsRecording(true);
        camera.current.startRecording({
          onRecordingFinished: video => {
          
            setShowNextButton(true);
            setVideoUrl(video.path);
          },
          onRecordingError: error => console.error(error),
        });

        setTimeout(() => {
          if (camera.current) {
            camera.current.stopRecording();
            setIsRecording(false);
          }
        }, 5000);
      }
    }
  };

  return (
    <Modal
      isVisible={isCameraOpen}
      onBackdropPress={onPress}
      style={styles.modalStyle}>
      <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
        {uploadFinalVideo ? (
          <>
            <View style={styles.videoAndCaption}>
              <Video
                source={{ uri: videoUrl }}
                resizeMode="cover"
                repeat={true}
                paused={false}
                style={styles.finalUploadVideo}
              />
              <View style={styles.captionContainer}>
                <Text style={styles.titleText}>Title</Text>
                <TextInput
                  placeholder="Caption Your Short"
                  placeholderTextColor="black"
                  value={caption}
                  onChangeText={setCaption}
                  style={styles.captionInput}
                  multiline={true}
                />
              </View>
            </View>
            <ScrollView style={styles.finalUploadContainer}>
              <Divider />
              <View style={styles.userSection}>
                <View style={styles.userInfo}>
                  <Icon name="person-circle" size={40} color="black" />
                  <View>
                    <Text style={[styles.userName, { fontWeight: 'bold' }]}>
                      {userName}
                    </Text>
                    <Text style={[styles.userName, { fontSize: 13 }]}>
                      {userId}
                    </Text>
                  </View>
                </View>
                <View style={styles.locationSection}>
                  <Icon name="location-outline" size={40} color="black" />
                  <Text style={styles.locationText}>{location}</Text>
                </View>
              </View>

              <View style={styles.visibilitySection}>
                <TouchableOpacity
                  style={styles.visibilityContainer}
                  onPress={() => setShowRadioButton(!showRadioButton)}>
                  <Icon name="eye-outline" size={24} color="black" />
                  <Text style={styles.visibilityText}>Public</Text>
                  <Icon
                    name={!showRadioButton ? 'chevron-forward' : 'chevron-down'}
                    size={20}
                    color="black"
                  />
                </TouchableOpacity>
                {showRadioButton && (
                  <>
                    <View style={styles.radioButtonContainer}>
                      <RadioButton
                        value="first"
                        status={
                          visibility === 'visibility' ? 'checked' : 'unchecked'
                        }
                        onPress={() => setVisibility('checked')}
                      />
                      <Text>Public</Text>
                    </View>
                    <View style={styles.radioButtonContainer}>
                      <RadioButton
                        value="first"
                        status={
                          visibility === 'private' ? 'checked' : 'unchecked'
                        }
                        onPress={() => setVisibility('visibility')}
                      />
                      <Text>Private</Text>
                    </View>
                  </>
                )}
              </View>

              <View style={styles.audienceCommentsSection}>
                <View style={styles.audienceContainer}>
                  <Icon name="people-outline" size={24} color="black" />
                  <Text style={styles.audienceText}>Everyone can reply</Text>
                  <Icon name="chevron-forward" size={20} color="black" />
                </View>
                <View style={styles.commentsContainer}>
                  <Icon name="chatbubble-outline" size={24} color="black" />
                  <Text style={styles.commentsText}>Comments on</Text>
                  <Icon name="chevron-forward" size={20} color="black" />
                </View>
              </View>
            </ScrollView>
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.saveDraftButton}
                onPress={() => {}}>
                <Text style={[styles.buttonText, { color: 'black' }]}>
                  Save Draft
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.uploadButton,
                  { backgroundColor: colors.backgroundColor },
                ]}
                onPress={uploadVideo}>
                <Text style={styles.buttonText}>Upload</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            {showRecordedVideo ? (
              <>
                <View style={styles.preViewVideoContainer}>
                  <View style={styles.videoWrapper}>
                    <Video
                      source={{ uri: videoUrl }}
                      style={styles.previewVideo}
                      resizeMode="cover"
                      repeat={true}
                      paused={false}
                    />
                  </View>
                </View>
                <View style={styles.previewButton}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => {}}>
                    <Text style={[styles.buttonText, { color: 'black' }]}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.nextButton, { backgroundColor: 'red' }]}
                    onPress={() => {
                      setUploadFinalVideo(true);
                      setShowNextButton(false);
                    }}>
                    <Text style={styles.buttonText}>Next</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <View style={styles.modalContent}>
                  <TouchableOpacity
                    style={styles.crossButton}
                    onPress={closeVideoPopUp}>
                    <Text style={styles.crossText}>×</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={() => setShowRecordedVideo(true)}
                  style={[
                    styles.nextButtonContainer,
                    {
                      display: showNextButton && !isRecording ? 'flex' : 'none',
                    },
                  ]}>
                  <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>

                <Camera
                  ref={camera}
                  style={StyleSheet.absoluteFill}
                  device={device}
                  isActive={true}
                  video={true}
                />

                <View style={styles.content}>
                  <View style={styles.container}></View>
                  <TouchableOpacity
                    style={[
                      styles.recordButton,
                      {
                        backgroundColor: isRecording ? 'red' : 'transparent',
                        borderColor: isRecording ? 'red' : 'white',
                      },
                    ]}
                    onPress={startVideoRecord}></TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.cameraPosition}
                  onPress={toggleCamera}>
                  <Icon name="camera-reverse" size={30} color="black" />
                </TouchableOpacity>
              </>
            )}
          </>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // Modal Styles
  modalStyle: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    flex: 1,
    padding: 20,
    position: 'relative',
  },
  crossButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 50,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossText: {
    color: 'black',
    fontSize: 40,
    position: 'relative',
    top: -8,
  },

  // Camera Content Styles
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButton: {
    width: 70,
    height: 70,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    position: 'absolute',
    bottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  cameraPosition: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 50,
    position: 'absolute',
    bottom: 20,
    right: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    zIndex: 222,
  },
  nextButtonContainer: {
    width: 60,
    height: 40,
    position: 'absolute',
    right: 30,
    top: 25,
    zIndex: 1,
  },
  nextButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 25,
  },

  // Video Preview Styles
  videoWrapper: {
    borderRadius: 15,
    overflow: 'hidden',
    width: '100%',
    height: '100%',
  },
  previewVideo: {
    width: '100%',
    height: '100%',
  },
  preViewVideoContainer: {
    height: '88%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    position: 'absolute',
    top: 10,
  },

  nextButton: {
    backgroundColor: colors.backgroundColor,
    width: '45%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    width: '45%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'red',
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  previewButton: {
    position: 'absolute',
    bottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
  },

  // Final Upload Container Styles

  videoAndCaption: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 40,
  },
  captionContainer: {
    flex: 1,
    marginLeft: 20,
  },
  titleText: {
    color: 'black',
    marginBottom: 10,
  },
  finalUploadVideo: {
    width: 90,
    height: 150,
    borderRadius: 12,
    marginLeft: 10,
  },
  captionInput: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    color: 'black',
    padding: 10,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    marginRight: 10,
  },

  // User Section Styles
  userSection: {
    marginTop: 20,
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 20,
  },
  userName: {
    color: 'black',
    marginLeft: 10,
    fontSize: 16,
  },
  locationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  locationText: {
    color: 'black',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '600',
  },
  locationIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
  arrowIcon: {
    color: 'white',
    fontSize: 18,
    marginRight: 5,
  },

  // Visibility Section Styles
  visibilitySection: {
    marginTop: 20,
  },
  visibilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  visibilityText: {
    color: 'black',
    marginLeft: 10,
    flex: 1,
    fontWeight: 'bold',
    fontSize: 18,
  },

  // Audience and Comments Styles
  audienceCommentsSection: {
    marginTop: 20,
  },
  audienceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 10,
  },
  audienceText: {
    color: 'black',
    marginLeft: 10,
    flex: 1,
    fontWeight: 'bold',
    fontSize: 18,
  },
  commentsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  commentsText: {
    color: 'black',
    marginLeft: 10,
    flex: 1,
    fontWeight: 'bold',
    fontSize: 18,
  },

  finalUploadContainer: {
    flex: 1,
    padding: 10,
  },

  // Action Buttons Styles
  actionButtons: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',

    bottom: 10,
    alignSelf: 'center',
  },
  uploadButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
    marginLeft: 10,
  },
  saveDraftButton: {
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },

  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 28,
  },
});

export default CameraModal;
