import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DeleteModal from './deleteModal';
import UpdateModal from './updateModal';

interface PopUpEditProps {
  isPopupVisible: boolean;
  position: { x: number; y: number };
  onClose: () => void;
  isEditable: boolean;
  updateModalData: any;
  onPopupClose: () => void;
  closePopup:() => void
}

const PopUpEdit: React.FC<PopUpEditProps> = ({
  isPopupVisible,
  position,
  onClose,
  isEditable,
  updateModalData,
  onPopupClose,
  
}) => {
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);

  const showEditModal = () => {
    setEditModalVisible(true);
    onPopupClose();
  };

  const hideEditModal = () => {
    setEditModalVisible(false);
  };

  const handleEditConfirm = (newName: string) => {
    hideEditModal();
  };

  const handleDelete = () => {
    setDeleteModalVisible(false);
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
  };

  return (
    <>
      <Modal
        isVisible={isPopupVisible}
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
        <View style={styles.container}>
          {isEditable && (
            <>
              <TouchableOpacity style={styles.option} onPress={showEditModal}>
                <Icon name="edit" size={24} color="#4caf50" />
                <Text style={styles.optionText}>Edit</Text>
              </TouchableOpacity>
              <View style={styles.divider} />
            </>
          )}
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
        onCancel={handleDeleteCancel}
        onDelete={handleDelete}
        onPopupClose={onPopupClose}
        setDeleteModalVisible={setDeleteModalVisible}
        updateModalData={updateModalData}
      />
      <UpdateModal
        isVisible={isEditModalVisible}
        onCancel={hideEditModal}
        onConfirm={handleEditConfirm}
        updateModalData={updateModalData}
        onClose={onPopupClose}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
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
