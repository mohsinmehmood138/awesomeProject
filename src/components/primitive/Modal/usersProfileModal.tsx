import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import colors from '../../../shared/theme/colors';
import { Card, IconButton } from 'react-native-paper';

interface UserInfoProps {
  isModalVisible: boolean;
  onClose: () => void;
  userProfileData: any;
}

const OtherUserProfileModal: React.FC<UserInfoProps> = ({
  isModalVisible,
  userProfileData,
  onClose,
}) => {
  useEffect(() => {
    console.log(userProfileData);
  }, [userProfileData]);

  return (
    <View>
      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1 }}>
          <Card style={styles.card}>
            <View>
              <IconButton
                icon="arrow-left"
                size={24}
                style={styles.backIcon}
                onPress={onClose}
              />

              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: userProfileData?.profilePic }}
                  style={styles.image}
                />
              </View>

              <IconButton
                icon="heart-outline"
                size={24}
                style={styles.heartIcon}
                onPress={() => console.log('Favorite pressed!')}
              />
            </View>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 20,
                fontWeight: '600',
                marginVertical: 8,
              }}>
              @{userProfileData?.username}
            </Text>
            <View style={styles.container}>
              <View style={styles.statsContainer}>
                <Text style={styles.statNumber}>
                  {userProfileData?.followers}
                </Text>
                <Text style={styles.statLabel}>Following</Text>
              </View>
              <View style={styles.statsContainer}>
                <Text style={styles.statNumber}>
                  {userProfileData?.following}
                </Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
              <View style={styles.statsContainer}>
                <Text style={styles.statNumber}>{userProfileData?.likes}</Text>
                <Text style={styles.statLabel}>Likes</Text>
              </View>
            </View>

            <View style={styles.containerButton}>
              <TouchableOpacity style={styles.followButton}>
                <Text style={styles.buttonText}>Follow</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.messageButton}>
                <Text style={styles.buttonText}>Message</Text>
              </TouchableOpacity>
            </View>
            <View>
              <View style={styles.sliderContainer}>
                <FlatList
                  data={userProfileData?.streakImages}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) => (
                    <View style={[styles.slide]}>
                      <Image
                        source={{ uri: item }}
                        style={styles.streakImages}
                      />
                    </View>
                  )}
                />
              </View>
            </View>

            <ScrollView>
              <View style={styles.wrapContainer}>
                {userProfileData?.longImages?.map(
                  (item: any, index: number) => (
                    <View key={index} style={styles.item}>
                      <Image
                        source={{ uri: item }}
                        style={styles.userImageVideo}
                      />
                    </View>
                  ),
                )}
              </View>
            </ScrollView>
          </Card>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 14,
    height: 630,
    position: 'relative',
    top: '10%',
    paddingBottom: 15,
  },
  wrapContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',

    gap: 10,
    padding: 10,
  },
  userImageVideo: {
    borderRadius: 5,
    backgroundColor: 'grey',
    height: '100%',
  },
  item: {
    width: 90,
    height: 140,
  },

  heartIcon: {
    position: 'absolute',
    top: 2,
    right: 2,
    zIndex: 10,
  },
  backIcon: {
    position: 'absolute',
    top: 2,
    left: 2,
    zIndex: 10,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 75,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 13,
    },
    shadowOpacity: 0.24,
    shadowRadius: 14.86,
    elevation: 18,
    alignSelf: 'center',
    marginTop: -70,
    borderWidth: 4,
    borderColor: colors.backgroundColor,
    padding: 3,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
    borderColor: 'red',
    borderWidth: 1,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingHorizontal: 40,
  },
  statsContainer: {
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 10,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  statLabel: {
    fontSize: 16,
    color: 'black',
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 1182468,
    paddingVertical: 0,
    opacity: 1,
  },
  followButton: {
    backgroundColor: colors.backgroundColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
    opacity: 1,
  },
  messageButton: {
    backgroundColor: 'grey',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  slide: {
    width: 60,
    height: 60,
    borderRadius: 60,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderColor: 'red',
    borderWidth: 2,
  },
  slideText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  sliderContainer: {
    alignSelf: 'center',
    marginVertical: 20,
    width: '90%',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  streakImages: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 100,
  },
});

export default OtherUserProfileModal;
