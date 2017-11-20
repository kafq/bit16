import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { MapView, Location, Permissions } from 'expo';
import Geocoder from 'react-native-geocoding';
import Layout from '../constants/Layout';
import { StoryComponent } from '../components/StoryComponent';

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
      newMarkers: []
    }
    this.updateMarkers = this.updateMarkers.bind(this)
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

  filterNearbyLocations() {
    return this.state.myMarkers.filter((location) => {
        return Math.abs(location.lat - this.state.region.latitude) < 0.004
    })
  }
  updateMarkers() {
    let newMarkers = this.filterNearbyLocations();
    this.setState({newMarkers})
  }
// Step 6 change the MapView initialRegion
  render() {
    if(this.state.myMarkers) {
      return(
      <View style={{flex: 1}}>
        <MapView
        showsUserLocation={true}
          style={{ flex: 2 }}
          initialRegion={{
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
        

        {/* {this.state.myMarkers.map((marker, i) => (
          <MapView.Marker
          key={i}
          title={marker.Companyname}
          description={marker.Web}
          coordinate={{
            latitude: marker.lat,
            longitude: marker.lng
          }}/>
        ))} */}
        {this.filterNearbyLocations().map((marker, i) => (
        <MapView.Marker
          key={i}
          title={marker.Companyname}
          color={"green"}
          description={marker.Web}
          coordinate={{
            latitude: marker.lat,
            longitude: marker.lng
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
        <View style={styles.listContainer}>
          <TouchableOpacity
          style={styles.button}
          onPress={() => this.updateMarkers()}>
            <Text>Show Markers</Text>
          </TouchableOpacity>
          <FlatList
          horizontal
          style={styles.list}
          data={this.state.newMarkers}
          renderItem={({item}) => <StoryComponent title={item.Companyname} city={item.City} content={item.Web}/>}
        />
        </View>
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
  listContainer: {
    flex: 1,
    position:'absolute',
    top: Layout.window.height * 0.5,
    width: Layout.window.width
  },
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 100
  }
});