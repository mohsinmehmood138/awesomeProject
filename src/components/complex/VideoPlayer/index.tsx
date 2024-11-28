import React, {forwardRef} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import Video, {VideoRef} from 'react-native-video';

interface VideoSource {
  uri?: string;
  headers?: {[key: string]: string};
  type?: string;
}

interface CustomVideoPlayerProps {
  source: VideoSource;
  style?: ViewStyle;
}

const CustomVideoPlayer = forwardRef<VideoRef, CustomVideoPlayerProps>(
  ({source, style}, ref) => {
    const onLoadStart = () => {
      console.log('Video loading started');
    };

    const onBuffer = (data: {isBuffering: boolean}) => {
      console.log('Buffering:', data.isBuffering);
    };

    return (
      <View style={[styles.container, style]}>
        {/* <Video
          source={source}
          style={styles.video}
          onLoadStart={onLoadStart}
          ref={ref}
          onBuffer={onBuffer}
          controls={true}
          resizeMode="contain"
          repeat={false}
          paused={false}
          
          posterResizeMode="cover"
          ignoreSilentSwitch="ignore"
          useTextureView={true}
          bufferConfig={{
            minBufferMs: 15000,
            maxBufferMs: 50000,
            bufferForPlaybackMs: 2500,
            bufferForPlaybackAfterRebufferMs: 5000,
          }}
        /> */}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
  },
});

CustomVideoPlayer.displayName = 'CustomVideoPlayer';
export default CustomVideoPlayer;