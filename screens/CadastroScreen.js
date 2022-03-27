import React, {useState} from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { MyButton, MyTextInput, MyPasswordInput } from '../components';
import { Metrics, Colors } from '../values';

import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

export default props => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [continent, setContinent] = useState('');
  const [password, setPassword] = useState('');
  
  const continentList = ['América do Norte',
    'América central',
    'América do Sul',
    'Europa',
    'Ásia',
    'África',
    'Oceania',
    'Antártida'
  ];

  async function createUser() {
    if(name == '' || lastName == '' || email == ''|| continent == '' || password == '') {
      Alert.alert('Dado não inserido', 'Preencha todos os campos', [{text: 'OK'}])
      return
    }
    
    const user = {
      name: name,
      lastName: lastName,
      email: email.toLowerCase(),
      continent: continent,
      password: password
    }
    
    try {
      const data = await JSON.stringify(user);
      await AsyncStorage.setItem(email, data); // função assincrona para gravar no dispositivo, o primeiro argumento é o nome do arquivo o segundo é os dados que serão gravados

      props.navigation.reset({
        index: 0,
        routes: [ { name: 'PerfilScreen', params: { email: email } } ]
      })

    } catch (error) {
      console.log(error);  
    }
  }

  return(
    <ScrollView style={ styles.container}>
      <View style={ styles.imgContainer}>
        <MaterialIcons 
          name="person-add"
          size={100}
          color={ Colors.white } 
        />
      </View>
      <View style={ styles.containerForm }>
        <MyTextInput
          style={ styles.formItem }
          placeholder='Insira seu nome'
          value={name}
          onChangeText={text => setName(text)}
        />
        <MyTextInput
          style={ styles.formItem }
          placeholder='Insira seu sobrenome'
          value={lastName}
          onChangeText={text => setLastName(text)}
        />
        <MyTextInput
          placeholder='Insira seu e-mail'
          style={ styles.formItem }
          keyboardType='email-address'
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <View style={ [styles.pickerContainer, styles.formItem ] }>
          <Picker 
            style={ styles.piker }
            selectedValue={continent}
            onValueChange={(value) => setContinent(value)}
          >
            <Picker.Item value="" label="Escolha seu continente" />
            {
              continentList.map((continent, i) => (
                <Picker.Item key={i} value={continent} label={continent} />)
            )}
          </Picker>
        </View>
        <MyPasswordInput
          placeholder='Insira sua senha'
          style={ styles.formItem } 
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <MyButton 
          title='Cadastrar'
          onPress={createUser}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create(
  {
    container: {
      flexGrow: 1,
      backgroundColor: Colors.background,
      padding: Metrics.padding.base
    },
    imgContainer: {
      alignItems: 'center'
    },
    containerForm: {
      padding: 1
    },
    formItem: {
      marginBottom: Metrics.margin.base
    },
    pickerContainer: {
      borderWidth: 1,
      borderRadius: Metrics.radius.base,
      backgroundColor: Colors.white,
      justifyContent: 'center'
    },
    piker: {
      paddingVertical: Metrics.padding.small,
      paddingHorizontal: Metrics.padding.base,
      borderWidth: 0,
      backgroundColor: Colors.white
    }
  }
)