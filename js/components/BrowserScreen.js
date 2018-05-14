/* @flow */

import React from 'react';
import { Text, View } from 'react-native';
import MaterialTabs from 'react-native-material-tabs';
import type { NavigationScreenProp, NavigationRoute } from 'react-navigation';

import CaribbeanBrowserScreen from './browsers/CaribbeanBrowserScreen';
import SukeibeiBrowserScreen from './browsers/SukeibeiBrowserScreen';

type Props = {
  navigation: NavigationScreenProp<NavigationRoute>,
};

type State = {
  selectedTabIndex: number,
};

class BrowserScreen extends React.Component<Props, State> {
  handleTabChange: (newIndex: number) => void;

  constructor(props: Props) {
    super(props);

    this.state = {
      selectedTabIndex: 0,
    };

    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(newIndex: number) {
    this.setState({ selectedTabIndex: newIndex });
  }

  render() {
    return (
      <View>
        <MaterialTabs
          items={['Caribbean', 'Sukeibei']}
          selectedIndex={this.state.selectedTabIndex}
          onChange={this.handleTabChange}
          textStyle={tabTextStyle}
        />

        {this.state.selectedTabIndex === 0 &&
          <CaribbeanBrowserScreen
            navigation={this.props.navigation}
          />
        }

        {this.state.selectedTabIndex === 1 &&
          <SukeibeiBrowserScreen
            navigation={this.props.navigation}
          />
        }
      </View>
    );
  }
}

const tabTextStyle: Text.propTypes.style = {
  fontFamily: 'Papyrus',
};

export default BrowserScreen;
