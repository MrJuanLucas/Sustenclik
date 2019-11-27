import React, {Component} from 'react';
import {Text, View, ActivityIndicator, StyleSheet, Image, ScrollView, TouchableHighlight} from 'react-native';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import firebase from 'firebase';

class telaLobby extends Component{

    constructor(props){
        super(props);
        this.state = {nome: '', QtdDen: 0}
      }

      componentWillMount(){
        var user = firebase.auth().currentUser;
        var uid = user.uid;
        var usuarios = firebase.database().ref("Usuarios")
        usuarios.child(uid).child('ContDen').on("value", (snapshot)=>{
          var user = snapshot.val();
          this.setState({nome: user.nome, QtdDen: user.NumDen.QtdDen});
        })
      }

    render(){
        return(
            <View style = {styles.view}>
                <LinearGradient colors={['#ffffff', '#ffffff']} style = {styles.backGround}>
                <View style = {styles.divUser}>
                        <Text>Bem Vindo: {this.state.nome}</Text> 
                        <Text>Você já fez: {this.state.QtdDen} denúncias</Text> 
                </View>

                <View style = {styles.divEscolha}>
                    <View style ={styles.divDenuncias}> 
                        <TouchableHighlight style={styles.btnEsc} onPress={()=> Actions.fourpage()}>
                            <Image style={styles.btnEsc} source ={require('../images/olho.png')}/>
                        </TouchableHighlight>
                        <Text> Faça a denúncia</Text>
                    </View>

                    <View style ={styles.divAcompanhamento}>
                        <TouchableHighlight style={styles.btnEsc} onPress={()=> Actions.fivepage()}>
                            <Image style={styles.btnEsc} source={require('../images/lupa.png')}/>
                        </TouchableHighlight>
                        <Text> Acompanhe as denúncias</Text>
                    </View>
                </View>

                
               </LinearGradient>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    view:{
        flex: 1
    },

    backGround:{
        alignItems: "center",
        flex: 1
    },

    divUser: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 25,
        marginTop: 20,
        padding: 10, 
        borderColor: "grey",
        borderWidth: 1,
    },

    divDenuncias: {
        alignItems: 'center',
        margin: 10,
        borderColor: 'green',
    },

    divAcompanhamento:{
        alignItems: 'center',
        margin: 10,
        borderColor: 'green',
        
    },

    btnEsc: {
      width:50,
      height: 50,
      margin: 5 ,
      flexDirection: 'column',
    },

    divEscolha: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        borderColor: "grey",
        borderWidth: 1,
        
    }


})

export default telaLobby;