/* @flow */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Orientation from 'react-native-orientation';
import TorrentStream from 'react-native-torrent-stream';
import type { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import type {
  StreamPreparedData,
  StreamStartedData,
  StreamErrorData,
  StreamReadyData,
  StreamProgressData,
  StreamStoppedData,
} from 'react-native-torrent-stream';

import MoviePlayer from './MoviePlayer';
import type { SukeibeiLink } from '../actions/types';

type NavState = {
  params: {
    sukeibeiLink: SukeibeiLink,
  },
} & NavigationRoute;

type Props = {
  navigation: NavigationScreenProp<NavState>,
};

type State = {
  movieUri: ?string,
};

class MovieScreen extends React.Component<Props, State> {
  handleStreamPrepared: () => void;
  handleStreamReady: (data: StreamReadyData) => void;

  static handleStreamStarted({ torrentUri }: StreamStartedData) {
    console.log('stream started');
  }

  static handleStreamStopped({ torrentUri }: StreamStoppedData) {
    console.log('stream stopped');
  }

  static handleStreamProgress(progressData: StreamProgressData) {
    console.log('stream progress');
    console.log(progressData);
  }

  static handleStreamError({ torrentUri, errorMessage }: StreamErrorData) {
    console.log(`Error: ${errorMessage}`);
  }

  static handleStreamPrepared({ torrentUri }: StreamPreparedData) {
    console.log('stream prepared');
  }

  constructor(props: Props) {
    super(props);

    this.state = {
      movieUri: null,
    };

    this.handleStreamReady = this.handleStreamReady.bind(this);
  }

  componentDidMount() {
    const { magnetLink } = this.props.navigation.state.params.sukeibeiLink;

    TorrentStream.addTorrent(magnetLink, true);
    TorrentStream.onStreamStarted(magnetLink, MovieScreen.handleStreamStarted);
    TorrentStream.onStreamPrepared(magnetLink, MovieScreen.handleStreamPrepared);
    TorrentStream.onStreamReady(magnetLink, this.handleStreamReady);
    TorrentStream.onStreamStopped(magnetLink, MovieScreen.handleStreamStopped);
    TorrentStream.onStreamProgress(magnetLink, MovieScreen.handleStreamProgress);

    TorrentStream.startTorrent(magnetLink);

    Orientation.lockToLandscape();
  }

  componentWillUnmount() {
    const { params } = this.props.navigation.state;

    TorrentStream.stopTorrent(params.sukeibeiLink.magnetLink);
    TorrentStream.removeListeners(params.sukeibeiLink.magnetLink);

    Orientation.unlockAllOrientations();
  }

  handleStreamReady({ torrentUri, filePath }: StreamReadyData) {
    console.log('stream ready');
    console.log(filePath);
    this.setState({ movieUri: filePath });
  }

  render() {
    if (this.state.movieUri) {
      return (
        <View style={styles.container}>
          <MoviePlayer
            immersive
            volume={0.0}
            muted
            uri={this.state.movieUri}
            style={styles.movie}
            onBack={this.props.navigation.goBack}
          />
        </View>
      );
    }

    return <Text>Loading...</Text>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  movie: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default MovieScreen;
