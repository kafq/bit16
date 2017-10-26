import React from 'react';
import { Text, View, Picker, Button, StyleSheet } from 'react-native';

export class CityPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: 'Tornio'
        }
    }
    render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 24, fontWeight: '700'}}> {this.props.pickerType} from {this.state.city}</Text>
        <Picker
            selectedValue={this.state.city}
            onValueChange={(itemValue, itemIndex) => this.setState({city: itemValue})}>
            <Picker.Item label="Tornio" value="Tornio" />
            <Picker.Item label="Kemi" value="Kemi" />
            <Picker.Item label="Haparanda" value="Haparanda" />
            <Picker.Item label="Helsinki" value="Helsinki" />
        </Picker>
          <Button
          title="Show"
          onPress={() => {this.props.handlePress(this.state.city)}}/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 18,
        backgroundColor: 'white'
    }
})