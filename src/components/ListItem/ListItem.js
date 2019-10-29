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
    alignItems: 'stretch',
  },
  nameText: {
    fontSize: 13,
  },
  listItem: {
    width: '60%',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    height: 45,
    padding: 10,
    backgroundColor: '#eee',
  },
  starterCheck: {
    width: '40%',
    marginRight: 10,
  },
});

export default ListItem;
