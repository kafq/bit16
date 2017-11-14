import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { MapView, Location, Permissions } from 'expo';


let locations = [{
  name: 'Tornio',
  latitude: 65.851698,
  longitude: 24.142675
},{
  name: 'Sumisaari',
  latitude: 65.908000,
  longitude: 24.128172
},{
  name: 'Random 1',
  latitude: 66,
  longitude: 24,
},{
  name: 'Random 2',
  latitude: 66.1,
  longitude: 24.1
},{
  name: 'Random 3',
  latitude: 66.2,
  longitude: 24.2
},{
  name: 'Random 4',
  latitude: 66.3,
  longitude: 24.3
},{
  name: 'Random 5',
  latitude: 68,
  longitude: 26
},{
  name: 'Random 6',
  latitude: 66.1,
  longitude: 25
},{
  name: 'Random 7',
  latitude: 66.1,
  longitude: 26
},{
  name: 'Random 8',
  latitude: 66.1,
  longitude: 28
}]



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

  filterNearbyLocations = (locations) => {
    let filteredLocations = locations.filter((location) => {
        return (location.latitude - this.state.location.coords.latitude) < 0.1  
    })
    return filteredLocations;
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
        
        {

          this.filterNearbyLocations(locations).map((marker) => (<MapView.Marker
                                        title={marker.name}
                                        coordinate={{
                                          latitude: marker.latitude,
                                          longitude: marker.longitude
                                        }}/>))
        }
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
