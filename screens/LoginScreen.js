import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity } from 'react-native';
import { MyButton, MyPasswordInput, MyTextInput } from '../components';
import { Colors, Metrics } from '../values';

export default props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function loginRequest() {
    if (email.length == 0) {
      alert('Preencha o e-mail')
      return 
    } else if(password.length == 0) {
        alert('Preencha o e-mail')
        return 
      }
    
    try {
      const userData = await AsyncStorage.getItem(email.toLowerCase());
      const user = JSON.parse(userData);
      if(user === null) {
        alert('Usuário não localizado')
        return
      }

      if(password === user.password) {
        alert('Login efetuado com sucesso');
        props.navigation.reset({
          index: 0,
          routes: [ { name: 'PerfilScreen' , params: { email: email } } ]
        });

      } else {
        alert('usuário não cadastrado')
      }


    } catch (error) {
      console.log(error);
    }

    
  }

  return(
    <View style={ styles.container }>
      <View style={ styles.containerLogin}>
        <View style= { styles.containerLogo }>
        <Image source={ require('../assets/logo_cellep.png') } />
        </View>

        <MyTextInput
          placeholder='Insira seu e-mail'
          value={email}
          keyboardType='email-address'
          style={ styles.formItem}
          onChangeText={(text) => setEmail(text)}
        />

        <MyPasswordInput 
          placeholder='Insira sua senha'
          value={password}
          keyboardType='numeric'
          style={ styles.formItem }
          onChangeText={(password) => setPassword(password)}
        />

        <MyButton 
          title="Entrar"
          style={ styles.formItem }
          onPress={loginRequest}
        />

        <View style={ styles.containerCadastro}>
          <Text style={ styles.cadastroText }>
            Não tem cadastro?
          </Text>
          <TouchableOpacity 
            onPress={() => props.navigation.navigate('CadastroScreen')}
          >
            <Text style={ styles.cadastroBtn}>
              Crie uma conta
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={ styles.logoTHContainer }>
        <Image 
          source={ require('../assets/logo_estacao_hack.png') } 
          style={ styles.logoTH}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create(
  {
    container: {
      flexGrow: 1,
      backgroundColor: Colors.background,
      padding: Metrics.padding.base,
    },
    containerLogo: {
      alignItems: 'center',
      marginBottom: Metrics.margin.base
    },
    containerLogin: {
      flexGrow: 1,
      justifyContent: 'center'
    },
    formItem: {
      marginBottom: Metrics.margin.base
    },
    containerCadastro: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 10
    },
    cadastroText: {
      color: Colors.white
    },
    cadastroBtn: {
      color: Colors.primary,
      paddingLeft: Metrics.padding.small
    },
    logoTHContainer: {
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    logoTH: {
      width: 80,
      height: 80,
      resizeMode: 'contain'
    }
  }
)