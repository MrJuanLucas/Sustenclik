import React, {Component} from 'react';
import {TextInput, View,StyleSheet, TouchableHighlight, Text} from 'react-native';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import firebase from 'firebase';

class telaCadastro extends Component{
    constructor(props){
        super(props);
        this.state={email: '', nome: '', senha:'', senhaVer: '', erro: ''}
      }



      cadastro(){
        firebase.auth().signOut()
                if(this.state.senha == this.state.senhaVer){
                    var nome = this.state.nome
                    var email = this.state.email
                    var senha = this.state.senha
                    const usuario =  firebase.auth();
                    usuario.createUserWithEmailAndPassword(
                        email, 
                        senha
                    ).catch( (error) => {
                        if(error.code == 'auth/weak-password'){
                            this.setState({erro: 'A senha precisa ter 6 caracteres'})
                        }

                        if(error.code == 'auth/invalid-email'){
                            this.setState({erro: 'Email inválido'})
                        }

                        if(error.code == 'auth/email-already-exists'){
                            this.setState({erro: 'O email já existe ou já foi cadastrado'})
                        }

                        if(error.code == 'auth/internal-error'){
                            this.setState({erro: 'Erro interno'})
                        }

                        if(error.code == 'auth/weak-password'){
                            this.setState({erro: 'A senha precisa ter 6 caracteres'})
                        }
                        
                    })

                    var user = firebase.auth().currentUser;
                    
                    var uid = user.uid;
                    var usuarios = firebase.database().ref("Usuarios");
                    usuarios.child(uid).set({
                    Nome: nome,
                    Email: email
                    });
                    usuarios.child(uid).child('ContDen').set({
                    NumDen: 0
                    });

                } else{
                    this.setState({erro: 'Senhas Diferentes'})
                }
      }

      cadastrarDatabase(){
        
      }



    render(){
        return(
            <View style={styles.form}>
                <LinearGradient colors={['#ffffff', '#ffffff']}>

                <TextInput style = {styles.styleInput} placeholder="Seu nome aqui"  onChangeText = {(text) => this.setState({nome: text})} /> 
                <TextInput style = {styles.styleInput} placeholder="Seu e-mail aqui"  onChangeText = {(text) => this.setState({email: text})} />
                <TextInput style = {styles.styleInput} placeholder="Sua senha aqui, mínimo de 6 caracteres" secureTextEntry={true}  onChangeText = {(text) => this.setState({senha: text})} /> 
                <TextInput style = {styles.styleInput} placeholder="Repita sua senha" secureTextEntry={true}  onChangeText = {(text) => this.setState({senhaVer: text})} />

                <View style = {styles.divLogin}>
                    <TouchableHighlight style = {styles.styleBtnLogin} onPress={()=> {this.cadastro()}}>
                    <Text style = {styles.styleBtnCadastro}>Entrar</Text>
                    </TouchableHighlight>
                </View>

                <View style = {styles.divErro}>
                        <Text style = {styles.erro}>{this.state.erro}</Text>
                </View> 
                </LinearGradient>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    form: {
        flex: 1
    },

    styleInput: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        borderColor: "grey",
        borderWidth: 1,
        paddingLeft: 25
      },

      styleBtnLogin:{
        backgroundColor: "rgb(47,78,80)",
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 45,
        paddingRight: 45,
        borderRadius: 40
    },

    divLogin:{
        paddingTop: 10,
        justifyContent: "center",
        alignItems: 'center'
    },

    styleBtnCadastro:{
        color: "white",
        
      },

      divErro:{
          paddingTop: 20,
          paddingBottom: 260,
          alignItems: 'center',
        justifyContent: 'center' 
      },

      erro:{
            padding:20,
            borderRadius: 20,
            color: 'black', 
      }

})

export default telaCadastro;