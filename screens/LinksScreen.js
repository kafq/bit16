import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { MapView, Location, Permissions } from 'expo';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  constructor(props) {
    super(props);
    this.state = {
      location: null
    }
  }

  componentWillMount() {
    this.getLocation();
  }

  getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location: location });
    console.log(location);
  }

  isNearby = () => {
  }

  render() {
    if(this.state.location) {
      return(
      <View style={{flex: 1}}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >

        <MapView.Marker
          title={'You are here'}
          pinColor={"#CDCDCD"}
          description = {'Lorem ipsum dolor sit amet consectur in vina veritas'}
          coordinate={{
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude,
          }}
        />

        <MapView.Marker
          title={'Rovaniemi'}
          coordinate={{
            latitude: 66.486885,
            longitude: 25.684170,
          }}
        />

        </MapView>
      </View>)
    }
    else {
      return (
        <View>
          <Text>Loading...</Text>
        </View>)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
