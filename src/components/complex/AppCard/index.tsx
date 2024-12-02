import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ViewToken,
  ListRenderItemInfo,
} from 'react-native';
import Video from 'react-native-video';
import { IconButton } from 'react-native-paper';
import { useRedux } from '../../../hooks/UseRedux';
import videoData from '../../../shared/utils/MockData/videoData';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface VideoItem {
  id: string;
  title: string;
  thumbnailUrl: string;
  link: string;
}

interface ViewableItemsChanged {
  viewableItems: Array<ViewToken>;
  changed: Array<ViewToken>;
}

interface VideoRef {
  seek: (time: number) => void;
  presentFullscreenPlayer: () => void;
  dismissFullscreenPlayer: () => void;
}

const AppCard: React.FC = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number | null>(
    null,
  );
  const videoRefs = useRef<Array<VideoRef | null>>([]);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: ViewableItemsChanged) => {
      if (viewableItems.length > 0) {
        const visibleIndex = viewableItems[0].index;
        if (typeof visibleIndex === 'number') {
          setCurrentVideoIndex(visibleIndex);
        }
      }
    },
  ).current;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const { user } = useRedux();
  const profileName = user?.authSlice?.user?.name ?? 'Guest';

  const renderItem = ({ item, index }: ListRenderItemInfo<VideoItem>) => (
    <View style={styles.cardContainer}>
      <View style={styles.topContainer}>
        <Image
          source={require('../../../assets/images/profile/profile.png')}
          style={styles.profileImage}
        />
        <Text style={styles.cardName}>{profileName}</Text>
        <IconButton icon="dots-vertical" size={20} style={styles.menuIcon} />
      </View>

      <View style={styles.videoContainer}>
        <Text>{item.title}</Text>
        <Video
          source={{ uri: item.link }}
          style={styles.video}
          resizeMode="contain"
          repeat
          ref={(ref: VideoRef | null) => (videoRefs.current[index] = ref)}
          paused={currentVideoIndex !== index}
          muted={false}
        />
      </View>

      <View style={styles.iconContainer}>
        {['thumb-up-outline', 'share-outline', 'comment-outline'].map(
          (icon, idx) => (
            <TouchableOpacity key={idx} style={styles.iconButton}>
              <Icon name={icon} size={24} color="#000" />
            </TouchableOpacity>
          ),
        )}
      </View>
    </View>
  );

  return (
    <View>
      <FlatList<VideoItem>
        data={videoData as VideoItem[]}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        pagingEnabled
        snapToInterval={590}
        decelerationRate="fast"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'white',
    marginBottom: 20,
    overflow: 'hidden',
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  cardName: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuIcon: {
    marginLeft: 'auto',
  },
  videoContainer: {
    width: '100%',
    height: 450,
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  iconButton: {
    padding: 10,
  },
});

export default AppCard;
