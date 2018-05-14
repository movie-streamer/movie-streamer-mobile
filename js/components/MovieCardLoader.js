import React from 'react';
import ContentLoader from 'react-native-content-loader';
import { Rect } from 'react-native-svg';

function MovieCardLoader() {
  return (
    <ContentLoader
      primaryColor="#e8f7ff"
      secondaryColor="#4dadf7"
      duration={7000}
      height={140}
    >
      <Rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
      <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
      <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
      <Rect x="0" y="80" rx="3" ry="3" width="350" height="10" />
      <Rect x="0" y="100" rx="3" ry="3" width="200" height="10" />
      <Rect x="0" y="120" rx="3" ry="3" width="360" height="10" />
    </ContentLoader>
  );
}

export default MovieCardLoader;
