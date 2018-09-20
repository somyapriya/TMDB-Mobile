import React from 'react';
import { StyleSheet,View, Text } from 'react-native'
import { Card,Avatar,Rating } from 'react-native-elements'



export class MovieListItem extends React.Component {
    render() {
        return (
        <Card  containerStyle={styles.wrapperParent}
            title={this.props.data.original_title}>
            <View style={{flexDirection:'row', flex:1, alignItems:'center', justifyContent:'space-between'}}>
                <Avatar  style={{alignItems:"flex-start"}}
                    xlarge={true}
                    source={{uri: `https://image.tmdb.org/t/p/w500/${this.props.data.poster_path}`}}
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}
                    width ={20}
                /> 
                 <View style={{flexDirection:'column', flex:1, justifyContent:'center', alignItems:'center'}}>                    
                        <Text style={{color:'#705F5F', fontSize:12 }} >Released on:{this.props.data.release_date}</Text>
                        <Text style={{color:'#423232', fontSize:10 }}>Vote Count:{this.props.data.vote_count}</Text>
                </View>
            </View>
        <Text style={styles.description} numberOfLines={3} renderTruncatedFooter={() => <ReadMoreButton  more />}>{this.props.data.overview}</Text>
        <View pointerEvents="none" style={{flexDirection:'row', flex:1, justifyContent:'space-between', alignItems:'center' }}>
            <Rating style={{alignItems:"flex-start" }}
                showRating
                imageSize={10}
                fractions={1}
                ratingColor='#3498db'
                ratingBackgroundColor='#c8c7c8'
                ratingCount={10}
                startingValue={parseFloat(this.props.data.vote_average)}
            />
           <Text style={{color:'#705F5F', alignItems:"flex-end" }} >Popularity:{Math.round(this.props.data.popularity)}</Text>
           </View>
         </Card>
        );
    }
}
const styles = StyleSheet.create({
    wrapperParent: {
      backgroundColor: '#fff',
      borderRadius: 6
    },
    description:{
        color:'#705F5F',
        alignItems:"flex-end",
        fontSize:12,
        marginTop:10
    }
})