import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

class AdjusterItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: this.props.action,
      updateStatsUp: this.props.updateStatsUp,
      updateStatsDown: this.props.updateStatsDown,
      friendlyName: this.props.friendlyName,
      statValue: this.props.statValue,
    };
  }

  render() {
    return (
      <View style={styles.elementBox}>
        <Text style={styles.actionBox}>{this.state.friendlyName}</Text>
        <Text style={styles.statBox}>{this.props.statValue}</Text>
        <Button
          onPress={this.state.updateStatsUp}
          style={styles.statButton}
          icon={<Icon name="plus" size={12} color="white" />}
          iconRight
        />
        <Button
          onPress={this.state.updateStatsDown}
          style={styles.statButton}
          icon={<Icon name="minus" size={12} color="white" />}
          iconRight
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  elementBox: {
    flexDirection: 'row',
    padding: 2,
    borderBottomColor: '#c9c9c9',
    borderBottomWidth: 1,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBox: {
    color: '#8a8a8a',
    fontSize: 11,
    fontWeight: 'bold',
    flex: 3,
  },
  statBox: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#0050d1',
    flex: 1,
  },
  statButton: {
    flex: 2,
    padding: 1,
    marginLeft: 7,
  },
});

export default AdjusterItem;
