import React, {useRef, useState} from 'react';
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
import {IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-video';
import videoData from '../../../shared/utils/MockData/videoData';
import {useRedux} from '../../../hooks/UseRedux';



interface VideoItem {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  uploadTime: string;
  views: string;
  author: string;
  link: string;
  description: string;
  subscriber: string;
  isLive: boolean;
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
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number | null>(null);
  const videoRefs = useRef<Array<VideoRef | null>>([]);
  const nextPageIdentifierRef = useRef<string | null>(null);

  const onViewableItemsChanged = useRef(({viewableItems}: ViewableItemsChanged) => {
    if (viewableItems.length > 0) {
      const visibleIndex = viewableItems[0].index;
      if (typeof visibleIndex === 'number') {
        setCurrentVideoIndex(visibleIndex);
      }
    }
  }).current;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const {storeState} = useRedux();
  const profileName = storeState?.authSlice?.user?.name;

  const renderItem = ({item, index}: ListRenderItemInfo<VideoItem>) => (
    <View style={styles.cardContainer}>
      <View style={styles.topContainer}>
        <Image
          source={require('../../../assets/images/profile/profile.png')}
          style={styles.profileImage}
        />
        <Text style={styles.cardName}>{profileName}</Text>
        <IconButton
          icon="dots-vertical"
          size={20}
          onPress={() => console.log('Menu Pressed')}
          style={styles.menuIcon}
        />
      </View>

      <View style={styles.videoContainer}>
        <Text>{item.title}</Text>
        <Video
          source={{uri: item.link}}
          style={styles.video}
          resizeMode="contain"
          repeat={true}
          ref={(ref: VideoRef | null) => (videoRefs.current[index] = ref)}
          paused={currentVideoIndex !== index}
          muted={false}
        />
      </View>

      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="thumb-up-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="share-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="comment-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );

  
  const typedVideoData: VideoItem[] = videoData as VideoItem[];

  return (
    <View>
      <FlatList<VideoItem>
        data={typedVideoData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
    padding: 10,
  },
  iconButton: {
    padding: 10,
  },
});

export default AppCard;