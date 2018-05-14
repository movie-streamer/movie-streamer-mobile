/* @flow */

import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import type { NavigationScreenProp, NavigationRoute } from 'react-navigation';

import MovieCard from '../MovieCard';
import fetchSukeibeiAsync from '../../actions/fetchSukeibeiAsync';
import { getSukeibeiLinks } from '../../store/selectors';
import type { ThunkAction, SukeibeiLink } from '../../actions/types';
import type { State } from '../../store/selectors';

type Props = {
  sukeibeiLinks: SukeibeiLink[],
  fetchSukeibei: () => ThunkAction,
  navigation: NavigationScreenProp<NavigationRoute>,
};

class SukeibeiBrowserScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    props.fetchSukeibei();
  }

  onMovieCardPress = (sukeibeiLink: SukeibeiLink) => {
    this.props.navigation.navigate('MoviePreview', { sukeibeiLink });
  }

  render() {
    return (
      // TODO: Put loading gif while fetching links
      <FlatList
        data={this.props.sukeibeiLinks}
        renderItem={({ item }) => (
          <MovieCard
            sukeibeiLink={item}
            onPress={this.onMovieCardPress}
          />
        )}
        keyExtractor={item => item.shortTitle}
      />
    );
  }
}

export default connect((state: State) => ({
  sukeibeiLinks: getSukeibeiLinks(state),
}), {
  fetchSukeibei: fetchSukeibeiAsync,
})(SukeibeiBrowserScreen);
