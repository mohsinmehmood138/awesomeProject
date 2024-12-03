import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Divider from '../../components/primitive/AppDivider';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import settingProfile from '../../assets/images/profile/settingProfile.png';
import { SafeAreaView } from 'react-native-safe-area-context';

const DATA = [
  {
    title: 'Account Settings',
    data: [
      {
        name: 'Personal Information',
        icon: 'person-outline',
        iconType: 'Ionicons',
      },
      {
        name: 'Security',
        icon: 'security',
        iconType: 'MaterialIcons',
      },
    ],
  },
  {
    title: 'Privacy & Security',
    data: [
      {
        name: 'privacy-tip',
        icon: 'lock-outline',
        iconType: 'MaterialIcons',
      },
      {
        name: 'looks-two',
        icon: 'two-factor-authentication',
        iconType: 'MaterialIcons',
      },
      {
        name: 'Manage Devices',
        icon: 'devices',
        iconType: 'MaterialIcons',
      },
    ],
  },
  {
    title: 'Notifications',
    data: [
      {
        name: 'Notification Preferences',
        icon: 'notifications-none',
        iconType: 'MaterialIcons',
      },
      {
        name: 'Communication Settings',
        icon: 'chatbubble-outline',
        iconType: 'Ionicons',
      },
    ],
  },
];

const SettingScreen = () => {
  const renderItem = ({ item }) => {
    const IconComponent = item.iconType === 'Ionicons' ? Icon : MaterialIcon;

    return (
      <TouchableOpacity style={styles.itemContainer}>
        <View style={styles.itemContentContainer}>
          <IconComponent
            name={item.icon}
            size={24}
            color="#333"
            style={styles.itemIcon}
          />
          <Text style={styles.itemText}>{item.name}</Text>
          <Icon
            name="chevron-forward"
            size={24}
            color="#888"
            style={styles.forwardIcon}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.headerContainer}>
        <Icon
          name="chevron-back"
          size={35}
          color="black"
          style={styles.backIcon}
        />
        <Icon name="search" size={30} color="black" style={styles.searchIcon} />
      </View>

      <View style={styles.profileContainer}>
        <Image source={settingProfile} style={styles.profileImage} />
        <Text style={styles.userName}>Jhon Khan</Text>
        <Text style={styles.userEmail}>khan@gmail.com</Text>
      </View>

      <SectionList
        style={styles.listContainer}
        sections={DATA}
        keyExtractor={(item, index) => item.name + index}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        ListEmptyComponent={<Text>No Settings Available</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 10,
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backIcon: {
    marginTop: 20,
  },
  searchIcon: {
    margin: 20,
    marginBottom: 0,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
    bottom: 20,
  },
  profileImage: {
    width: 90,
    height: 90,
    marginBottom: 10,
    borderRadius: 60,
  },
  userName: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 15,
    fontWeight: '400',
    color: '#666',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  itemContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginVertical: 8,
  },
  itemContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  itemIcon: {
    marginRight: 15,
  },
  itemText: {
    fontSize: 18,
    flex: 1,
  },
  forwardIcon: {
    color: '#888',
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
});

export default SettingScreen;
