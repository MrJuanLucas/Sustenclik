import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableHighlight, TextInput, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import MapView from 'react-native-maps';
import TelaMapa from './telaMapa';

export default class telaDenuncia extends Component{
    //Área de construção dos componentes
    constructor(props){
        super(props);
        this.state = {tipoDenuncia: '', textoDenuncia: '', localizacaoDenuncia:null, QtdDen: 0 }
    }

    componentWillMount(){

    }

    componentDidMount(){

    }

    //Métodos para serem usados

    enviaDenuncia(){
        var user = firebase.auth().currentUser;
        var uid = user.uid;
        var usuarios = firebase.database().ref("Usuarios")
        var tipoDenuncia = this.state.tipoDenuncia;
        var textoDenuncia = this.state.textoDenuncia;
        var localizacaoDenuncia = this.state.localizacaoDenuncia;
        var denuncias = firebase.database().ref("Denuncias");
        denuncias.child(uid).push().set({
          tipoDenuncia: tipoDenuncia,
          textoDenuncia: textoDenuncia,
          localizacaoDenuncia: localizacaoDenuncia,
          statusDenuncia: 'Em aguardo'
        })
        usuarios.child(uid).child('ContDen').child('NumDen').on("value", (snapshot)=>{
            var NumDen = snapshot.val();
            this.setState({QtdDen : NumDen})
        })
        

        usuarios.child(uid).child('ContDen').set({
             NumDen : this.state.QtdDen + 1
        })
        Actions.secondpage();
    }


    render(){
        return(
           <ScrollView style = {styles.view}>
               <LinearGradient style = {styles.view} colors={['#ffffff', '#ffffff']}>

                    <View style = {styles.tipoDenuncia}>
                        <TouchableHighlight onPress = {() => {this.setState({tipoDenuncia :'Poluição Aquática'})}}>
                            <Image style = {styles.campoRedondo} source = {require('../images/aquatica.png')}/>
                        </TouchableHighlight> 
                        
                        <TouchableHighlight onPress = {() => {this.setState({tipoDenuncia: 'Abandono de Animais'})}}>
                            <Image style = {styles.campoRedondo} source = {require('../images/abandono.png')}/>
                        </TouchableHighlight>  
                        
                        <TouchableHighlight onPress = {() => {this.setState({tipoDenuncia: 'Queimada'})}}>
                            <Image style = {styles.campoRedondo} source = {require('../images/queimada.png')}/>
                        </TouchableHighlight>
                        
                        <TouchableHighlight onPress = {() => {this.setState({tipoDenuncia: 'Entulho de lixo'})}}> 
                            <Image style = {styles.campoRedondo} source = {require('../images/entulho.png')}/>
                        </TouchableHighlight> 

                        <TouchableHighlight onPress = {() => {this.setState({tipoDenuncia: 'Outro'})}}> 
                            <Image style = {styles.campoRedondo} source = {require('../images/NewOutro.png')}/>
                        </TouchableHighlight> 
                    </View>

                    <View style = {styles.textoTipoDenuncia}>
                        <Text style= {styles.txtDenuncia}>Tipo de Denúncia: {this.state.tipoDenuncia}</Text>
                    </View>

                    <View style = {styles.areaTextoDenuncia}>
                        <TextInput placeholder = 'Descreva a denúncia aqui' onChangeText = {(text) => this.setState({textoDenuncia: text})}/>
                    </View>

                    <Text style = {styles.textoExplica}>Tire a foto agora ou a escolha de sua galeria!</Text>
                    <View style = {styles.selecaoFoto}>
                        <TouchableHighlight onPress={()=>Actions.sixpage()}>
                            <Image style = {styles.campoRedondo} source ={require('../images/simboloCamera.png') }/>
                        </TouchableHighlight>
                     
                        <TouchableHighlight onPress={()=>Actions.sevenpage()}>
                            <Image style = {styles.campoRedondo} source ={require('../images/simboloGaleria.png') }/>
                        </TouchableHighlight>

                        <Image source = {uri=(null)}/>
                    </View>
  
                    <View style={styles.mapa}>
                        <TelaMapa />
                    </View>
                    

                    <View style = {styles.clickBtn}>
                        <TouchableHighlight onPress={() => {this.enviaDenuncia()}}>
                            <Image style = {styles.btnEnvia}source = {require('../images/btnEnvia.png')}/>
                        </TouchableHighlight>
                    </View>
               </LinearGradient>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create(
    {
        view:{
            flex:1,
        },

        selecaoFoto:{
            backgroundColor: 'white',
            height: 100,
            flexDirection: 'row',
            borderRadius: 10,
            margin: 10,
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'space-between',
            borderColor: "grey",
            borderWidth: 1,
        },

        textoExplica:{
            color: 'grey'
        },

        campoRedondo:{
            borderRadius: 50,
            width: 50,
            height: 50,
            margin: 10
        },

        tipoDenuncia:{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: 'white',
            borderRadius: 10,
            margin: 10,
            borderColor: "grey",
            borderWidth: 1,
        },

        textoTipoDenuncia: {
            borderColor: 'grey',
            backgroundColor: 'white',
            height: 50,
            borderRadius: 10,
            margin: 10,
            borderColor: "grey",
            borderWidth: 1,
        },

        txtDenuncia: {
            fontSize: 15,
            marginLeft: 30,
            marginTop: 15
        },

        areaTextoDenuncia:{
            backgroundColor: 'white',
            height: 150,
            borderRadius: 10,
            margin: 10,
            borderColor: "grey",
            borderWidth: 1,
        },

        clickBtn:{
            alignItems: 'flex-end'
        },

        mapa: {
            height: 200,
            width: 400,
            borderRadius: 20,
            alignItems: 'center'

        },

        btnEnvia:{
            borderRadius: 50,
            width: 50,
            height: 50,
            margin: 10,
            backgroundColor: 'white',
            borderColor: "grey",
            borderWidth: 1,
        },

        annotationContainer: {
            width: 30,
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: 15,
          },
          annotationFill: {
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: '#7159C1',
            transform: [{ scale: 0.8 }],
          }
    }
)
