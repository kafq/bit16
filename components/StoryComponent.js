import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export class StoryComponent extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.caption}>City — {this.props.city}</Text>
          <Text></Text>
          <Text numberOfLines={3} style={styles.description}>{this.props.content}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        margin: 6,
        borderWidth: 0.5,
        borderColor: '#CDCDCD',
        backgroundColor: 'white',
        padding: 12
    },
    caption: {
        fontSize: 18,
        opacity: 0.5
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    description: {
        fontSize: 18,
    }
})
