import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';
import Geocoder from 'react-native-geocoding';
import Async from 'react-promise'
Geocoder.setApiKey('AIzaSyAIFxMO56gBAJyOMdSsFAMzfCrVe2HqYP4');


const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };


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
}]



export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

    
  constructor(props) {
    super(props);
    this.state = {
      location: { coords: {latitude: 0, longitude: 0}}
    }
    this.findLocation = this.findLocation.bind(this)
  }


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
        var myMarkers = this.state.data.map((marker) => {
          var address = marker.Street + ', ' + marker.City
          return Geocoder.getFromLocation(address).then(
                  json => {
                    var location = json.results[0].geometry.location;
                    return [location.lat, location.lng]
                  },
                  error => {
                    console.log(error);
                  }
                ).then((val) => {
                  var resultHere = []
                  var o = Object.assign({}, marker);
                  o.lat = val[0];
                  o.lng = val[1];
                  return o;
                })
        })
        Promise.all(myMarkers).then(function(results) {
          this.setState({ myMarkers: results })
      }.bind(this))
      })
      .catch((error)=>{
				console.error(error);
      });
  }
  

  findLocation(address){
    console.log(address)
  }

  locationChanged = (location) => {
    region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    },
    this.setState({location, region})
  }

  isNearby = (item) => {
    
  }

  render() {
    if(this.state.myMarkers) {
      return(
      <View style={{flex: 1}}>
        <MapView
          style={{ flex: 1 }}
          showsUserLocation={true}
          region={this.state.region}
          initialRegion={{
            latitude: 65.8444,
            longitude: 24.1449,
            latitudeDelta: 0.0222,
            longitudeDelta: 0.0121,
          }}
        >
          {this.state.myMarkers.map((marker, i) => (
  
            <MapView.Marker
               key={i}
               coordinate = {{
                latitude: parseFloat(marker.lat),
                longitude: parseFloat(marker.lng)
              }}
              title={marker.Companyname}
              description={marker.Web}
            />

))}

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
