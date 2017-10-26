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
  Picker,
  FlatList
} from 'react-native';
import { StoryComponent } from '../components/StoryComponent';
import { CityPicker } from '../components/CityPicker';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      allstories: [
        {city: 'Helsinki', title: 'Some story title', id:1, content: 'Mauris non tempor quam, et lacinia sapien. Mauris accumsan eros eget libero posuere vulputate. Etiam elit elit, elementum sed varius at, adipiscing vitae est.'},
        {city: 'Tornio', title: 'It happened almost in Vegas', id:2, content: 'Mauris non tempor quam, et lacinia sapien. Mauris accumsan eros eget libero posuere vulputate. Etiam elit elit, elementum sed varius at, adipiscing vitae est.'},
        {city: 'Tornio', title: 'How I have learnt Flexbox', id:3, content: 'Mauris non tempor quam, et lacinia sapien. Mauris accumsan eros eget libero posuere vulputate. Etiam elit elit, elementum sed varius at, adipiscing vitae est.'},
        {city: 'Kemi', title: 'Design helps you to sell ideas', id:4, content: 'Mauris non tempor quam, et lacinia sapien. Mauris accumsan eros eget libero posuere vulputate. Etiam elit elit, elementum sed varius at, adipiscing vitae est.'},
        {city: 'Kemi', title: 'All code secrets', id:5, content: 'Mauris non tempor quam, et lacinia sapien. Mauris accumsan eros eget libero posuere vulputate. Etiam elit elit, elementum sed varius at, adipiscing vitae est.'},
        {city: 'Haparanda', title: 'Code at speed of light', id:6, content: 'Mauris non tempor quam, et lacinia sapien. Mauris accumsan eros eget libero posuere vulputate. Etiam elit elit, elementum sed varius at, adipiscing vitae est.'},
        {city: 'Haparanda', title: 'Lapland Safaris', id:7, content: 'Mauris non tempor quam, et lacinia sapien. Mauris accumsan eros eget libero posuere vulputate. Etiam elit elit, elementum sed varius at, adipiscing vitae est.'},
        {city: 'Helsinki', title: 'Hackjunction to be held', id:8, content: 'Mauris non tempor quam, et lacinia sapien. Mauris accumsan eros eget libero posuere vulputate. Etiam elit elit, elementum sed varius at, adipiscing vitae est.'},
      ],
      stories: []
    }
  }

  /**
   * --- Component lifecycle ---
   * 
   * Here you can specify any functions that should be executed
   * before the application will appear
   */

  componentWillMount() {
    console.log('I am going to mount')
  }
  componentDidMount() {
    console.log('I did mount');
  }
  /**
   * Best place for functions
   */
  
  /**
   * Render stories will go through the array of stories
   * and leave only those that were specified in the component
   */
  renderStories = (city) => {
    /* Put all the filtered items to storiesFiltered variable,
     * since you must not modify the state directly
     */
    let storiesFiltered = this.state.allstories.filter((item) => {
      if (item.city === city) {
        return true
      }
    })
    this.setState({
      stories: storiesFiltered
    })
  }
  
  render() {
    return (
      <ScrollView style={styles.container}>
        {/* FlatList gets items from the specified array and wraps them into specified components. In this case, it's <StoryComponent/>  */}
        <FlatList
          style={styles.list}
          data={this.state.stories}
          renderItem={({item}) => <StoryComponent title={item.title} city={item.city} content={item.content}/>}
        />
        {/* We have separated the logic of picker, so that you can use this component in any other screens
        
        handlePress={this.renderStories} firstly gives a name for function props and then specifies the function that should be executed in the parent component
         */}
        <CityPicker
          pickerType={'Stories'}
          handlePress={this.renderStories}
          />
        <View style={styles.gutter}/>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50
  },
  list: {
    flex: 1,
    marginBottom: 24
  },
  heading: {
    fontSize: 24,
    fontWeight: '700'
  },
  gutter: {
    height: 200,
    backgroundColor: 'white'
  }
})