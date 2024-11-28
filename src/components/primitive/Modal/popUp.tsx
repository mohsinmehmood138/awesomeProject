import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DeleteModal from './deleteModal';
import EditModal from './updateUserModal';

interface DeleteInfo {
  isDeleteEditModalVisible: boolean;
  position: {x: number; y: number};
  onClose: () => void;
  editableModa: boolean;
  modalData: any;
  closePopup: () => any;
}

const PopUpEdit: React.FC<DeleteInfo> = ({
  isDeleteEditModalVisible,
  position,
  onClose,
  editableModa,
  modalData,
  closePopup,
}) => {
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
    closePopup();
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const handleConfirm = (newName: string) => {
    hideModal();
  };

  const handleDelete = () => {
    setDeleteModalVisible(false);
  };

  const handleCancel = () => {
    setDeleteModalVisible(false);
  };

  return (
    <>
      <Modal
        isVisible={isDeleteEditModalVisible}
        onBackdropPress={onClose}
        backdropOpacity={0}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        backdropTransitionInTiming={300}
        backdropTransitionOutTiming={300}
        style={{
          margin: 0,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          top: position.y - 50,
          left: position.x - 120,
        }}>
        <View style={styles.popupContainer}>
          {editableModa ? (
            <>
              <TouchableOpacity style={styles.option} onPress={showModal}>
                <Icon name="edit" size={24} color="#4caf50" />
                <Text style={styles.optionText}>Edit</Text>
              </TouchableOpacity>
              <View style={styles.divider} />
            </>
          ) : null}

          <TouchableOpacity
            style={styles.option}
            onPress={() => setDeleteModalVisible(true)}>
            <Icon name="delete" size={24} color="#f44336" />
            <Text style={styles.optionText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <DeleteModal
        isVisible={isDeleteModalVisible}
        onCancel={handleCancel}
        onDelete={handleDelete}
        modalData={modalData}
        closePopup={closePopup}
        setDeleteModalVisible={setDeleteModalVisible}
      />
      <EditModal
        isVisible={isModalVisible}
        onCancel={hideModal}
        onConfirm={handleConfirm}
        modalData={modalData}
        closePopup={closePopup}
      />
    </>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: 150,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 5,
  },
});

export default PopUpEdit;
