/* @flow */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import type { NavigationScreenProp, NavigationRoute } from 'react-navigation';

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
  trailerPaused: boolean,
};

class MoviePreviewScreen extends React.Component<Props, State> {
  handleWatchMoviePress: () => void;

  constructor(props: Props) {
    super(props);

    this.handleWatchMoviePress = this.handleWatchMoviePress.bind(this);
  }

  handleWatchMoviePress() {
    const { sukeibeiLink } = this.props.navigation.state.params;
    this.props.navigation.navigate('Movie', { sukeibeiLink });
  }

  render() {
    const { params } = this.props.navigation.state;

    return (
      <View style={styles.container}>
        <MoviePlayer
          uri={params.sukeibeiLink.trailer360pUrl}
          immersive={false}
        />
        <FAB style={styles.watchMovieFAB} icon="movie" onPress={this.handleWatchMoviePress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  watchMovieFAB: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});

export default MoviePreviewScreen;
