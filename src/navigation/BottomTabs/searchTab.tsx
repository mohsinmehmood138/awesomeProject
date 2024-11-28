import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import {StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';
import UserSearchModal from '../../components/primitive/Modal/otherUserProfile';
import {fetchData} from '../../redux/authSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useRedux} from '../../hooks/UseRedux';
import Divider from '../../components/primitive/AppDivider';
import PopUpEdit from '../../components/primitive/Modal/popUp';

export default function SearchScreen() {
  const {storeState, dispatch} = useRedux();
  const [isModalVisible, setModalVisible] = useState(false);

  const [modalData, setModalData] = useState();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState({x: 0, y: 0});

  const handleButtonPress = (event: any, item: any) => {
    const {pageX, pageY} = event.nativeEvent;
    setPopupPosition({x: pageX, y: pageY});
    setPopupVisible(true);
    setModalData(item);
    
    
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  useEffect(() => {
    dispatch(fetchData('https://dummyjson.com/c/343b-beae-4fd5-a859'));
  }, []);

  const openModal = (item: any) => {
    setModalVisible(true);
    setModalData(item);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const UserItem = ({item, openModal}) => {
    return (
      <TouchableOpacity
        style={styles.searchFlatList}
        onPress={() => openModal(item)}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={styles.searchFlatListImage}
            source={{uri: item.profilePic}}
            alt="Image"
          />
          <View style={{alignSelf: 'center'}}>
            <Text style={styles.searchFlatListText}>{item.realName}</Text>
            <Text style={styles.searchFlatListTextUserId}>
              @{item.username}
            </Text>
          </View>
        </View>
        <View>
          <IconButton
            icon="dots-vertical"
            size={20}
            onPress={event => handleButtonPress(event, item)}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <FlatList
          data={storeState?.authSlice?.data?.users}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <>
              <UserItem item={item} openModal={openModal} />
              <Divider />
            </>
          )}
        />
      </ScrollView>
      <UserSearchModal
        isModalVisible={isModalVisible}
        onClose={closeModal}
        modalData={modalData}
       
      />
      <PopUpEdit
        isDeleteEditModalVisible={isPopupVisible}
        position={popupPosition}
        onClose={closePopup}
        modalData={modalData}
        editableModa={true}
        closePopup={closePopup}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchFlatList: {
    width: '100%',
    height: 70,
    borderRadius: 8,

    marginTop: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  searchFlatListImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },

  searchFlatListText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 15,
  },
  searchFlatListTextUserId: {
    fontSize: 13,
    fontWeight: 600,
    marginLeft: 15,
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 20,
  },
});
