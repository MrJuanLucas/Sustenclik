import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  Button,
  YellowBox,
  TextInput
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Router, Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import axios from 'axios';
import {GoogleSignin} from 'react-native-google-signin';


class telaLogin extends Component{

 constructor(props){
   super(props);
   this.state={
     email : '',
     senha :''
   }; 
 }

 componentWillMount(){

 }

 loginManual(){
   var email = this.state.email;
   var senha = this.state.senha;
   var user = firebase.auth();

	 user.signInWithEmailAndPassword(
			email,
			senha
    ).catch(alert("Erro no login"))
    
    if(user){
       Actions.secondpage();
    } else{
      alert("Falha na digitação");
    }
   
 }

  loginGoogle(){

    var provider = new firebase.auth.GoogleAuthProvider();



  }

  loginFacebook(){

  }

  render(){
    return (
      
     <View style={styles.divPage}>
       <LinearGradient colors={['#ffffff', '#ffffff']}>
          <View style={styles.divLogo}>
              <Image style = {styles.styleLogo}source={require('../images/NewLogo.jpeg')}/>
          </View>

          <View style={styles.divLoginManual}>
                <TextInput style = {styles.styleInput} placeholder="Digite seu e-mail aqui"  onChangeText = {(text) => this.setState({email: text})} />
                <TextInput style = {styles.styleInput} placeholder="Digite sua senha aqui"  secureTextEntry={true} onChangeText = {(text) => this.setState({senha : text})} />
          </View>
        
          <View style = {styles.divLogin}>
                <TouchableHighlight style = {styles.styleBtnLogin} onPress={ ()=> {this.loginManual()}}>
                  <Text style = {styles.styleBtnCadastroLogin}>Entrar</Text>
                </TouchableHighlight>
          </View>

          <View style = {styles.ou}>
                <Text style={styles.ouTxt}>Ou</Text>
          </View>

          <View style={styles.divLoginRede}>

                <TouchableHighlight>
                    <Image style={styles.styleRedes}  onPress={this.loginGoogle()}source={require('../images/logoGoogle.png')}/>
                </TouchableHighlight>

                <TouchableHighlight>
                    <Image style={styles.styleRedes} source={require('../images/logoFacebook.png')}/>
                </TouchableHighlight>
          </View>

          <View style={styles.rodape}>
                <TouchableHighlight onPress={()=> Actions.threepage()}>
                  <Text style = {styles.styleBtnCadastro}>Cadastre-se</Text>
                </TouchableHighlight>
          </View>
          </LinearGradient> 
      </View>
    );
  }
  }


const styles = StyleSheet.create({
  divPage:{
    flex: 1,
    alignItems: 'center'
  },

  divLogo: {
    padding: 30
  },

  styleLogo:{
    width: 300,
    height: 150
  },

  divLoginManual: {

  },

  styleInput: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: "grey",
    borderWidth: 1,
    paddingLeft: 25
  },

  ou:{
    justifyContent: 'center',
    alignItems: 'center'
  },

  ouTxt:{
    color: 'grey'
    
  },

  divLoginRede: {
      paddingTop: 10,
      flexDirection: 'row',
      justifyContent: 'center'
  }, 

  styleRedes:{
      width:50,
      height: 50,
      margin: 5
  },

  divLogin:{
      paddingTop: 10,
      justifyContent: "center",
      alignItems: 'center'
  },

  styleBtnLogin:{
      backgroundColor: 'rgb(99,174,170)',
      paddingTop: 20,
      paddingBottom: 20,
      paddingLeft: 45,
      paddingRight: 45,
      borderRadius: 40
  },

  rodape: {
    paddingTop: 30,
    paddingBottom: 70,
    alignItems: 'center'

  },

  styleBtnCadastro:{
    color: "grey",
    fontSize: 18
    
  },

  styleBtnCadastroLogin:{
    color: "white"
    
  }

});

export default telaLogin;