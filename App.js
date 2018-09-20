import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import {
  MovieListComponent
} from './src/MovieListItem';
import {
 Home
} from './src/Home';

console.disableYellowBox = true;

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
         <Home/>      
     </View>
    );
    }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  }
})