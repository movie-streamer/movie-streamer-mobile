/* @flow */

import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Immersive from 'react-native-immersive';
import VideoPlayer from 'react-native-video-controls';

type Props = {
  uri?: string,
  immersive: boolean,
  onBack?: () => boolean,
};

class MoviePlayer extends React.Component<Props> {
  componentDidMount() {
    if (this.props.immersive) {
      Immersive.on();
      Immersive.setImmersive(true);
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.immersive === this.props.immersive) return;

    if (this.props.immersive) {
      Immersive.on();
      Immersive.setImmersive(true);
    } else {
      Immersive.off();
      Immersive.setImmersive(false);
    }
  }

  componentWillUnmount() {
    if (this.props.immersive) {
      Immersive.off();
      Immersive.setImmersive(false);
    }
  }

  render() {
    return (
      <View {...this.props}>
        <TouchableWithoutFeedback>
          <VideoPlayer
            source={{ uri: this.props.uri }}
            rate={1.0}
            playInBackground={false}
            resizeMode="contain"
            repeat={false}
            style={styles.movie}
            immersive={this.props.immersive}
            controlTimeout={5000}
            toggleResizeModeOnFullscreen={false}
            showOnStart
            onBack={this.props.onBack}
            // disableBack={this.props.onBack === undefined}
            disableFullscreen
          />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  movie: {
    height: '100%',
  },
});

export default MoviePlayer;
