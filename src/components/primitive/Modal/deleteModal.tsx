import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useDeleteUserMutation } from '../../../redux/searchSlice/searchSlice';
import { useCreateUserMutation } from '../../../redux/searchSlice/searchSlice';

interface DeleteModalProps {
  isVisible: boolean;
  onCancel: () => void;
  updateModalData: any;

  setDeleteModalVisible: (item: any) => any;
  onDelete: () => void;
  onPopupClose: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isVisible,
  onCancel,
  onPopupClose,
  setDeleteModalVisible,
  updateModalData,
}) => {
  const [deleteUser] = useDeleteUserMutation();

  const onDelete = async () => {
    try {
      const response = await deleteUser(updateModalData?.id).unwrap();
      // console.log('Delete response:', response);
      deleteUser(updateModalData?.userId);
      onPopupClose();
      setDeleteModalVisible(false);
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isVisible}
      onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Delete this item?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={[styles.buttonText, styles.cancelButtonText]}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
              <Text style={styles.buttonText}>Delete</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  cancelButtonText: {
    color: 'black',
  },

  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DeleteModal;
