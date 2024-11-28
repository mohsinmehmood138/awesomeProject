import React, { useReducer } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import colors from '../../../shared/theme/colors';
import { useNavigation } from '@react-navigation/native';
import { useRedux } from '../../../hooks/UseRedux';
import { hideAlert } from '../../../redux/authSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/Types';

interface AlertProps {
  onClose?: (option: string) => void;
  image: any;
}

type AuthStackNavigationProp = StackNavigationProp<
  RootStackParamList,
  'UserInfo'
>;

const CustomAlert: React.FC<AlertProps> = ({ onClose, image }) => {
  const { storeState, dispatch } = useRedux();

  const isVisible = storeState?.authSlice?.isAlertOpen;

  const navigation = useNavigation<AuthStackNavigationProp>();

  const onCreateAccount = () => {
    dispatch(hideAlert({}));
    navigation.navigate('UserInfo');
  };

  const closeModal = () => {
    dispatch(hideAlert({}));
  };

  return (
    <Modal
      transparent
      animationType="slide"
      visible={isVisible}
      onRequestClose={() => onClose}>
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          <Text style={styles.title}>Create Account</Text>
          <Image source={image} style={styles.image} />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.createButton}
              onPress={onCreateAccount}>
              <Text style={styles.createButtonText}>Create Account</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  createButton: {
    backgroundColor: colors.backgroundColor,
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },
  closeButton: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 10,
    flex: 1,
  },
  createButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  closeButtonText: {
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  image: {
    width: 150,
    height: 150,
    objectFit: 'contain',
    position: 'relative',
    top: -10,
  },
});

export default CustomAlert;
