import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ShotButtonContainer = props => {
  return (
    <View style={styles.shotContainer}>
      <TouchableOpacity style={styles.shotButton} onPress={props.shotMadeTwo}>
        <View>
          <Text style={styles.shotText}>2 Pt{'\n'}MADE</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.shotButton} onPress={props.shotMissTwo}>
        <View>
          <Text style={styles.shotText}>2 Pt{'\n'}MISS</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.shotButton} onPress={props.shotMadeThree}>
        <View>
          <Text style={styles.shotText}>3 Pt{'\n'}MADE</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.shotButton} onPress={props.shotMissThree}>
        <View>
          <Text style={styles.shotText}>3 Pt{'\n'}MISS</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  shotContainer: {
    width: '100%',
    height: hp('6%'),
    marginTop: 0,
    marginBottom: 5,
    borderBottomColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  shotButton: {
    padding: 5,
    height: hp('6%'),
    backgroundColor: '#0031ad',
    margin: 3,
    flexGrow: 1,
  },
  shotText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ShotButtonContainer;
