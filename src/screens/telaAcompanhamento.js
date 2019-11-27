import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, ScrollView} from 'react-native';
import firebase from 'firebase';
import LinearGradient from 'react-native-linear-gradient'
import { Actions } from 'react-native-router-flux';

export default class telaAcompanhamento extends Component{

    constructor(props){
        super(props);
        this.state={denuncias : [], tamanhoArray : 0};
    }


    componentWillMount(){
        var user = firebase.auth().currentUser
        var denuncias = firebase.database().ref("Denuncias")
        var uid = user.uid
        denuncias.child(uid).on("value", (snapshot)=>{
          var denuncia = snapshot.val();
          this.setState({denuncias: [denuncia]});
        }, function(error){
            if(error){
                alert("Houve um problema com o banco de dados");
                Actions.secondpage();
            } else{

            }
        })
        
        var dens = this.state.denuncias;
        if(dens == []){
            this.setState({denuncias: 'Você ainda não possui denúncias :('})
        }
    }

    componentDidMount(){

    }

 render(){
    return(
        <View style={styles.Tela}>
            <LinearGradient colors={['#ffffff', '#ffffff']} style={styles.Tela}>
                <ScrollView >
                    <View style={styles.divDenuncia}>
                            {this.state.denuncias.map(denuncia => (<Text key = 'key' > Status da denúncia : {denuncia.StatusDenuncia}</Text>))}
                            {this.state.denuncias.map(denuncia => (<Text key = 'key'>  Descrição: {denuncia.textoDenuncia}</Text>))}
                            {this.state.denuncias.map(denuncia => (<Text key = 'key'>  Tipo: {denuncia.tipoDenuncia}</Text>))}
                            {this.state.denuncias.map(denuncia => (<Image key = 'key' uri={denuncia.RamoTeste.fotoDenuncia}/> ))}
                    </View>
                        
                    <View>

                    </View>
                </ScrollView>
            </LinearGradient>
        </View>
    )
 }
}

const styles = StyleSheet.create({
    divDenuncia:{
        backgroundColor: 'white',
        padding: 20,
        margin: 10,
        borderRadius: 20,
        borderColor: "grey",
        borderWidth: 1,
        
    },

    Tela: {
        flex: 1
    }

})


