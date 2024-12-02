import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import { StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import Divider from '../../components/primitive/AppDivider';
import EditPopUp from '../../components/primitive/Modal/editPopUp';
import { useGetUserQuery } from '../../redux/searchSlice/searchSlice';
import OtherUserProfileModal from '../../components/primitive/Modal/usersProfileModal';


interface UserItemProps {
  item: any
  openModal: (item: any) => void;
}


export default function SearchScreen() {
  const { data } = useGetUserQuery();
  const [updateModalData, setUpdateModalData] = useState(null);
  const [searchTabData,setSearchTabData]=useState<any>([])
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [userProfileData, setUserProfileData] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });


  useEffect(() => {
    if (data) {
      setSearchTabData(data)
    }
  }, [data]);

  const handleButtonPress = (event: any, item: any) => {
   
    const { pageX, pageY } = event.nativeEvent;
    setPopupPosition({ x: pageX, y: pageY });
    setIsPopupVisible(true);
    setUpdateModalData(item);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const handleOtherUser = (item: any) => {
    setUserProfileData(item)
    setModalVisible(true);
    console.log(item);
    

  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const UserItem:React.FC<UserItemProps>= ({ item, openModal })=> {
    return (
      <TouchableOpacity
        style={styles.searchFlatList}
        onPress={() => handleOtherUser(item)}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            style={styles.searchFlatListImage}
            source={{ uri: item.profilePic }}
            alt="Image"
          />
          <View style={{ alignSelf: 'center' }}>
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
            onPress={ (event)=>handleButtonPress(event, item)}
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
          data={searchTabData?.users}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <>
              <UserItem item={item} openModal={handleOtherUser} />
              <Divider />
            </>
          )}
        />
      </ScrollView>
      <OtherUserProfileModal
        isModalVisible={isModalVisible}
        onClose={closeModal}
        userProfileData={userProfileData}
      />
      <EditPopUp
        isPopupVisible={isPopupVisible}
        position={popupPosition}
        onClose={closePopup}
        updateModalData={updateModalData}
        isEditable={true}
        closePopup={closePopup}
        onPopupClose={closePopup}
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
