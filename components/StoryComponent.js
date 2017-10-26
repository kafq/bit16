import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export class StoryComponent extends React.Component {
  render() {
    return (
      <View>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text numberOfLines={3} style={styles.description}>{this.props.description}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    description: {
        fontSize: 18,
    }
})
