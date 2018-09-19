import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  Picker,
  Text
} from 'react-native';
import {
  fetchMovies,
  searchCall
} from './src/api';
import {
  MovieListComponent
} from './src/movieList';
import {
  Header,
  SearchBar
} from 'react-native-elements'

console.disableYellowBox = true;

export default class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: undefined,
        searchText: '',
        isLoading: false,
      };
      this.onFetchSuccess = this.onFetchSuccess.bind(this);
      this.searchMovies = this.searchMovies.bind(this);
    }
       componentDidMount() {
      this.setState({
        isLoading: true
      })
      fetchMovies((data) => {
        this.setState({
          data: data.results,
          isLoading: false
        })
      });
    }
    onFetchSuccess(results) {
      this.setState({
        data: results
      });
    }
    searchMovies() {
      this.setState({
        isLoading: true
      })
      searchCall(this.state.searchText, (data) => {
        this.setState({
          data: data.results
        });
        this.setState({
          isLoading: false
        });

      });
    }
    sortFunction(itemValue) {
      this.setState({language: itemValue,isLoading:true})
      if (itemValue == 'Vote Count') {
        this.state.data.sort((a, b) => a.vote_count - b.vote_count);
      } else if (itemValue == 'Popularity') {
        this.state.data.sort((a, b) => a.popularity - b.popularity);
      }
      this.setState({
        isLoading: false
      });
    }
  render() {
    let activityIndicator=this.state.isLoading ? (
      <View style={styles.horizontal}>
      <ActivityIndicator
      animating
        color="#000"
        size="large"
        style={styles.activityIndicator}
      />
      </View>
    ) : null
    return (
      <View style={styles.container} >
        <Header
          statusBarProps={{ barStyle: 'light-content' }}
          centerComponent={{ text: 'TMDB Movie Search', style: { color: '#fff',fontWeight:'bold'} }}
          outerContainerStyles={{ backgroundColor: '#081c24' }}
          innerContainerStyles={{ justifyContent: 'space-around' }}
          />
          <SearchBar  outerContainerStyles={{ backgroundColor: '#fff',width:'100%'}}
            lightTheme
            round 
            onChangeText = {(textEntry) => {this.setState({searchText: textEntry})}}
            placeholder='Type Here...'
            onSubmitEditing ={this.searchMovies} 
            clearIcon
          />
          <Picker
              selectedValue={this.state.language}
              style={{ height: 50, width: 150,alignItems:"center"}}
              onValueChange={(itemValue) => this.sortFunction(itemValue)}>
              <Picker.Item label="Vote Count" value="Vote Count" />
              <Picker.Item label="Popularity" value="Popularity" />
          </Picker> 
          {activityIndicator}
            <ScrollView>
            { this.state.data && this.state.data.length == 0  ? ( 
                      <Text style={{color:'#705F5F',flex:2,display:'flex'}} >No Result found</Text>  
            ) : (
               this.state.data && this.state.data.map((elem, index) => ( 
                <MovieListComponent data={elem}> key={elem.id} ></MovieListComponent>
                    ))
              )} 
          </ScrollView>
  
  </View>
    );
    }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    alignItems: 'center',
  }
})
