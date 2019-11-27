/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {YellowBox} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
import firebase from 'firebase';

import telaLogin from './src/screens/telaLogin';
import telaLobby from './src/screens/telaLobby';
import telaCadastro from './src/screens/telaCadastro';
import telaDenuncia from './src/screens/telaDenuncia';
import telaAcompanhamento from './src/screens/telaAcompanhamento';
import telaCamera from './src/screens/telaCamera';
import telaGaleria from './src/screens/telaGaleria';
import telaMapa from './src/screens/telaMapa';

class App extends Component{
  constructor(props){
    super(props);
    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
    ]);
  }

  componentWillMount(){
    var firebaseConfig = {
      apiKey: "AIzaSyB4OBdPaWymtnTjA9sxLR8rNlbk23ey1Jo",
      authDomain: "sustenclick.firebaseapp.com",
      databaseURL: "https://sustenclick.firebaseio.com",
      projectId: "sustenclick",
      storageBucket: "",
      messagingSenderId: "784380334321",
      appId: "1:784380334321:web:0fed9e6fe0dd586e"
      
    };
    firebase.initializeApp(firebaseConfig);
  }

 render(){ 
  return (
    <Router>
        <Scene key = "root">
          <Scene key = "onepage" component = {telaLogin} hideNavBar={true}  initial/>
          <Scene key = "secondpage" component = {telaLobby} hideNavBar={true} />
          <Scene key = "threepage" component = {telaCadastro} />
          <Scene key = "fourpage" component = {telaDenuncia} />
          <Scene key = "fivepage" component = {telaAcompanhamento}/>
          <Scene key = "sixpage" component = {telaCamera} hideNavBar={true}/>
          <Scene key = "sevenpage" component = {telaGaleria} hideNavBar={true}/>
          <Scene key = "eigthpage" component = {telaMapa} hideNavBar={true} />
        </Scene>
    </Router>
  );
}};


export default App;
