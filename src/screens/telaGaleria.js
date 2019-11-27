import React, {Component} from 'react';
import {View, 
    TouchableHighlight, 
    StyleSheet, 
    Button, 
    CameraRoll, 
    Image, 
    ScrollView} from 'react-native';
import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';

export default class telaGaleria extends Component{

    constructor(props){
        super(props)
        this.state = {photos: []}
    }

    _handleButtonPress = () => {
        CameraRoll.getPhotos({
            first: 30,
            assetType: 'Photos',
          })
          .then(r => {
            this.setState({ photos: r.edges });
          })
          .catch((err) => {
             alert('Erro ao carregar imagens');
          });
        }; 

        enviaFoto(foto){
            var user = firebase.auth().currentUser;
            var uid = user.uid;
            var denuncias = firebase.database().ref("Denuncias");
            denuncias.child(uid).child('Ramo Teste Foto').set({
              foto: foto,
              });
  
            Actions.fourpage();
          };

    render(){
        return(
            <View>
                <View>
                <Button title="Load Images" onPress={this._handleButtonPress} />
                <ScrollView>
                  {this.state.photos.map((p, i) => {
                  return (
                    <TouchableHighlight onPress= {()=> this.enviaFoto(p.node.image.uri)}>
                    <Image
                      key={i}
                      style={ styles.galeria}
                      source={{ uri: p.node.image.uri }}
                    />
                    </TouchableHighlight>
                  );
                })}
                </ScrollView>
              </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    galeria:{
      width: 100,
      height: 100,
      flexDirection: 'column'
    }
  })