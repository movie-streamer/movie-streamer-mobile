/* @flow */

import React from 'react';

import {
  Card,
  CardActions,
  CardContent,
  CardCover,
  Title,
  Button,
  Paragraph,
} from 'react-native-paper';

import type { SukeibeiLink } from '../actions/types';

type Props = {
  sukeibeiLink: SukeibeiLink,
  onPress: (sukeibeiLink: SukeibeiLink) => void,
};

class MovieCard extends React.Component<Props> {
  onPress: () => void;

  constructor(props: Props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.onPress(this.props.sukeibeiLink);
  }

  render() {
    return (
      <Card onPress={this.onPress}>
        <CardContent>
          <Title>{this.props.sukeibeiLink.shortTitle}</Title>
          <Paragraph>{this.props.sukeibeiLink.longTitle}</Paragraph>
        </CardContent>
        <CardCover source={{ uri: this.props.sukeibeiLink.coverUrl }} />
        <CardActions>
          <Button>Cancel</Button>
          <Button>OK</Button>
        </CardActions>
      </Card>
    );
  }
}

export default MovieCard;
