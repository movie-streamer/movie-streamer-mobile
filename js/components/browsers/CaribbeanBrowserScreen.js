/* @flow */

import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import type { NavigationScreenProp, NavigationRoute } from 'react-navigation';

import MovieCard from '../MovieCard';
import fetchCaribbeanAsync from '../../actions/fetchCaribbeanAsync';
import { getCaribbeanLinks } from '../../store/selectors';
import type { ThunkAction, SukeibeiLink } from '../../actions/types';
import type { State } from '../../store/selectors';

type Props = {
  caribbeanLinks: SukeibeiLink[],
  fetchCaribbean: () => ThunkAction,
  navigation: NavigationScreenProp<NavigationRoute>,
};

class CaribbeanBrowserScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    props.fetchCaribbean();
  }

  onMovieCardPress = (sukeibeiLink: SukeibeiLink) => {
    this.props.navigation.navigate('MoviePreview', { sukeibeiLink });
  }

  render() {
    return (
      // TODO: Put loading gif while fetching links
      <FlatList
        data={this.props.caribbeanLinks}
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
  caribbeanLinks: getCaribbeanLinks(state),
}), {
  fetchCaribbean: fetchCaribbeanAsync,
})(CaribbeanBrowserScreen);
