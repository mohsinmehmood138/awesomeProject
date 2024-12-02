import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';

interface UpdateModalProps {
  isVisible: boolean;
  onCancel: () => void;
  onConfirm: (newName: string) => void;
  updateModalData: any;
  onClose: () => void;
}

const UpdateModal: React.FC<UpdateModalProps> = ({
  isVisible,
  onCancel,
  onConfirm,
  updateModalData,
  onClose,
}) => {
  const [updatedName, setUpdatedName] = useState(updateModalData?.realName || '');

  useEffect(() => {
    setUpdatedName(updateModalData?.realName || '');
  }, [updateModalData]);

  const handleUpdate = () => {
    if (updatedName.trim()) {
      onConfirm(updatedName);
      onClose();
    }
  };

  const updateUserValue = (newValue: string) => {
    setUpdatedName(newValue);
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onCancel}
      onBackButtonPress={onCancel}
      style={styles.modal}>
      <View style={styles.modalContent}>
        <Text style={styles.headerText}>Update Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your new name"
          placeholderTextColor="#7f8c8d"
          value={updatedName}
          onChangeText={updateUserValue}
        />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmButton} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10,
    width: '85%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  headerText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#bdc3c7',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 15,
    fontSize: 16,
    marginBottom: 30,
    backgroundColor: '#ecf0f1',
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  cancelButton: {
    borderColor: 'black',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  cancelText: {
    color: '#7f8c8d',
    fontSize: 16,
  },
});

export default UpdateModal;
