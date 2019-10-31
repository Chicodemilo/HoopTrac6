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
      updateStats: this.props.updateStats,
      friendlyName: this.props.friendlyName,
      statValue: this.props.statValue,
    };
  }

  render() {
    return (
      <View style={styles.elementBox}>
        <Text style={styles.actionBox}>{this.state.friendlyName}</Text>
        <Text style={styles.statBox}>{this.state.statValue}</Text>
        <Button
          style={styles.statButton}
          icon={<Icon name="plus" size={16} color="white" />}
          iconRight
        />
        <Button
          style={styles.statButton}
          icon={<Icon name="minus" size={16} color="white" />}
          iconRight
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  elementBox: {
    flexDirection: 'row',
    padding: 5,
    borderBottomColor: '#c9c9c9',
    borderBottomWidth: 1,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBox: {
    flex: 3,
  },
  statBox: {
    flex: 1,
  },
  statButton: {
    flex: 2,
    padding: 2,
  },
});

export default AdjusterItem;
