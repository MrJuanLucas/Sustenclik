import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import  MapView  from 'react-native-maps'

export default class TelaMapa extends Component {
  render() {
    return (
     
          <MapView
                style={styles.map}
                loadingEnabled={true}
                region={{
                latitude: -5.634232,
                longitude: -35.425989,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
                }}
            >
            </MapView>
     
    );
  }
}

const styles = StyleSheet.create({
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
       },

  container: {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',

  },
  
});
