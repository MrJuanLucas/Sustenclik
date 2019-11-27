import React, {useState} from 'react';
import { StyleSheet, 
        TouchableOpacity, 
        Text, 
        ImageBackground, 
        ScrollView, 
        View, 
        CameraRoll, 
        PermissionsAndroid, 
        TouchableHighlight, 
        Image } from "react-native";
import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import { RNCamera } from 'react-native-camera';

export default  telaCamera = () => {

    const [imageUri, setImageUri] = useState(null);
    takePicture = async () => {
      try {
        if (this.camera) {
          const options = {
            quality: 0.5,
            base64: true,
            forceUpOrientation: true,
            fixOrientation: true
          };
          const { uri } = await this.camera.takePictureAsync(options);
          setImageUri(uri);
        }
      } catch (err) {
        alert(err.message);
      }
    }


    submitPicture = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              "title": "Access Storage",
              "message": "Access Storage for the pictures"
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            await CameraRoll.saveToCameraRoll(imageUri);
            var user = firebase.auth().currentUser;
            var uid = user.uid;
            var denuncias = firebase.database().ref("Denuncias");
            denuncias.child(uid).child('Ramo Teste Foto').set({
             foto: imageUri
            });
          } else {
            console.log("Permissao de camera negada.");
          }
        } catch (err) {
          console.warn(err);
        }
    
        setImageUri(null);
        Actions.fourpage();
      }

        return(
            imageUri ?
      <ImageBackground style={styles.preview} source={{ uri: imageUri }}>
        <ScrollView></ScrollView>
        <View style={styles.buttonsPreview}>
          <TouchableHighlight  onPress={() => setImageUri(null)} >
              <Image source = {require('../images/naoEnvia.png')}  style = {styles.campoRedondo}/>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => submitPicture()} >
          <Image source = {require('../images/envia.png')} style= {styles.campoRedondo}/>
          </TouchableHighlight>
        </View>
      </ImageBackground>
      :
      <RNCamera
        ref={camera => { this.camera = camera; }}
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        flashMode={RNCamera.Constants.FlashMode.off}
        permissionDialogTitle={"Permission to use camera"}
        permissionDialogMessage={"We need your permission to use your camera phone"}
      >
        <TouchableOpacity onPress={takePicture} style={styles.button}>
          <Text>PICTURE</Text>
        </TouchableOpacity>
      </RNCamera>
        );
    }

    const styles = StyleSheet.create({
        camera: {
          flex: 1
        },
        button: {
          flex: 0,
            backgroundColor: '#fff',
            borderRadius: 5,
            padding: 15,
            paddingHorizontal: 20,
            alignSelf: 'center',
            margin: 20,
            alignContent: 'flex-end'
        },
        preview: {
          width: "100%",
          height: "100%",
          flex: 1
        },
      
        campoRedondo:{
          borderRadius: 50,
          width: 50,
          height: 50,
          margin: 10
        },
      
        buttonsPreview: {
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 5
        }
      });