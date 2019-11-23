import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {CheckBox} from 'react-native-elements';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  toggleCheckIn = () => {
    this.setState(prevState => {
      return {
        checked: !prevState.checked,
      };
    });
    this.props.toggleCheckIn();
  };

  render() {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={this.props.onItemPressed}
          style={styles.listItem}>
          <View>
            <Text style={styles.nameText}>{this.props.playerName}</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.starterCheck}>
          <CheckBox
            left
            title="Starter"
            uncheckedIcon="circle-o"
            checkedIcon="dot-circle-o"
            checkedColor="green"
            checked={this.state.checked}
            onPress={() => this.toggleCheckIn()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: '#d9d9d9',
  },
  nameText: {
    fontSize: 15,
    color: '#cc5500',
    paddingLeft: 15,
  },
  listItem: {
    flex: 1,
    padding: 10,
  },
  starterCheck: {
    flex: 1,
  },
});

export default ListItem;
