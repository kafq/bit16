import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { MapView, Location, Permissions } from 'expo';
import Geocoder from 'react-native-geocoding';

Geocoder.setApiKey('AIzaSyAIFxMO56gBAJyOMdSsFAMzfCrVe2HqYP4');
// Step 1
const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };


export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };
// Step 2 location state
  constructor(props) {
    super(props);
    this.state = {
      location: { coords: {latitude: 65.849160, longitude: 24.142133}},
    }
  }
// Step 3 Watch Position Async
  componentWillMount() {
    Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);
    fetch('https://tietojenkasittely.lapinamk.fi/bit16/ourstories_example/getCompanyAddress.php', {
			method: 'post',
			header:{
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body:JSON.stringify({
        key: 'test',
			})
		})
		.then((response) => response.json())
			.then((responseJson) =>{
				this.setState ({ data: responseJson.companies })
      }).then((res) => {
        var myMarkers = this.state.data.map((marker) =>{
          // Combine street and city to get address
          var address = marker.Street + ', ' + marker.City
          // Send address to function
          return Geocoder.getFromLocation(address).then(
            json => {
              var location = json.results[0].geometry.location;
              return [location.lat, location.lng]
            },
            error => {
              console.log(error);
            }
          ).then((result) => {
            var oldObject = Object.assign({}, marker);
            oldObject.lat = result[0];
            oldObject.lng = result[1];
            return oldObject;
          })
        })
        Promise.all(myMarkers).then((results) => {
          this.setState({ myMarkers: results })
        })
      })
      


			.catch((error)=>{
				console.error(error);
			});

  }
// Step 4
  locationChanged = (location) => {
    region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.05,
    },
    this.setState({location, region})
  }
// Step 5 Change this
  filterNearbyLocations = () => {
    let filteredLocations = this.state.myMarkers.filter((location) => {
      console.log(location)
        return 
          (Math.abs(location.lat - this.state.region.latitude) < 0.4) && 
          (Math.abs(location.lng - this.state.region.longitude) < 0.4)
    })
    return filteredLocations;
  }
// Step 6 change the MapView initialRegion
  render() {
    if(this.state.myMarkers) {
      return(
      <View style={{flex: 1}}>
        <MapView
        showsUserLocation={true}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
        

        {this.state.myMarkers.map((marker, i) => (
          <MapView.Marker
          key={i}
          title={marker.Companyname}
          description={marker.Web}
          coordinate={{
            latitude: marker.lat,
            longitude: marker.lng
          }}/>
        ))}
        {this.filterNearbyLocations().map((marker, i) => (<MapView.Marker
                                        key={i}
                                        color={'green'}
                                        title={marker.name}
                                        coordinate={{
                                          latitude: marker.latitude,
                                          longitude: marker.longitude
                                        }}/>))
        }

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