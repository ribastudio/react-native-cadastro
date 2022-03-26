import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../values';
import { MaterialIcons } from '@expo/vector-icons';
import { MyButton } from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default props => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [continent, setContinent] = useState('')
  
  console.log(Object.keys(props));
  console.log(Object.keys(props.route.params));

  useEffect(() => {
    loadUserData();
  })

  async function loadUserData() {
    console.log(props.route.params);
    try {
      const { email } = props.route.params;
      const userData = await AsyncStorage.getItem(email)
      const { name, lastName, email:userEmail, continent } = JSON.parse(userData);

      setName(`${name} ${lastName}`);
      setEmail(userEmail);
      setContinent(continent);
    } catch (error) {
      console.log(error);
    }
    
  }

  return(
    <>
      <View
        style={ styles.container}
      >
        <Text style={ styles.textTitle }>Bem vindo(a), {name}!</Text>
          <View style={styles.containerInfo}>
            <MaterialIcons name="perm-identity" size={24} color={Colors.white} />
            <Text style={ styles.text }>{name}</Text>
          </View>
        <View style={styles.containerInfo}>
          <MaterialIcons name="mail-outline" size={24} color={Colors.white} />
          <Text style={ styles.text }>{email}</Text>
        </View>
        <View style={styles.containerInfo}>
          <MaterialIcons name="language" size={24} color={Colors.white} />
          <Text style={ styles.text }>{continent}</Text>
        </View>
        <MyButton 
          title="site cellep"
          style={ styles.formItem }
        />
        <MyButton 
          title="sair"
          style={ styles.formItem }
        />
      </View>
      
    </>
  )
}

const styles = StyleSheet.create(
  {
    container: {
      flexGrow: 1,
      backgroundColor: Colors.background,
      justifyContent: 'center',
      padding: Metrics.padding.base
    },
    textTitle: {
      color: Colors.white,
      fontSize: Fonts.title,
      marginBottom: Metrics.margin.base
    },
    containerInfo: {  
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Metrics.margin.base
    },
    text: {
      fontSize: Fonts.base,
      color: Colors.white,
      marginLeft: Metrics.margin.small
    },
    formItem: {
      marginBottom: Metrics.margin.base
    },
  }
)