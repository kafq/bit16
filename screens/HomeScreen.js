import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  TextInput,
  Picker
} from 'react-native';
import { WebBrowser } from 'expo';
import { StoryComponent } from '../components/StoryComponent';
import { MonoText } from '../components/StyledText';


let story = {
  description: "Mauris non tempor quam, et lacinia sapien. Mauris accumsan eros eget libero posuere vulputate. Etiam elit elit, elementum sed varius at, adipiscing vitae est"
}
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      degrees: 10,
      convertedValue: 'Value will appear here'
    }
  }

  /**
   * Best place for functions
   */
  convertToC = () => {
    let convertedValue = parseInt(this.state.degrees) * 10;
    this.setState({
      convertedValue
    })
  }
  convertToF = () => {
    let convertedValue = parseInt(this.state.degrees) * 300;
    this.setState({
      convertedValue
    })
  }
  increment = () => {
    this.setState({
      degrees: this.state.degrees + 1
    })
  }
  
  render() {
    return (
      <ScrollView>
        <View style={styles.pseudobar}/>
        <Text></Text>
        <Text></Text>
        <StoryComponent title={"Heading 1"} description={story.description}/>
        <StoryComponent title={"Heading 2"} description={story.description}/>
        <StoryComponent title={"Heading 3"} description={story.description}/>
        <Text></Text>
        
        <TextInput
          editable
          maxLength = {40}
          onChangeText={(email) => this.setState({email})}
          value={this.state.degrees}
          keyboardType={'email'}
        />

        <Text style={styles.heading}>Degrees: {this.state.convertedValue}</Text>
        <Button
          title="convert to C"
          onPress={() => {this.convertToC()}}/>
          <Button
          title="convert to F"
          onPress={() => {this.convertToF()}}/>

          <Picker
            selectedValue={this.state.city}
            onValueChange={(itemValue, itemIndex) => this.setState({city: itemValue})}>
            <Picker.Item label="Tornio" value="tornio" />
            <Picker.Item label="Kemi" value="kemi" />
            <Picker.Item label="Haparanda" value="haparanda" />
            <Picker.Item label="Helsinki" value="helsinki" />
          </Picker>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  pseudobar: {
    flex: 1,
    height: 45,
    width: 100
  },
  heading: {
    fontSize: 24,
    fontWeight: '700'
  }
})