import {
  View,
  Text,
  TextInput,
  ScrollView,
  BackHandler,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {user} from '../../routers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tambah_Catatan = ({navigation}) => {
  //memanggil text//
  const [judul, setJudul] = useState('');
  const [Catatan, setCatatan] = useState('');
  const {Global} = useContext(user);
  const [data, setData] = Global;

  const cek = () => {
    if (judul == '') {
      Alert.alert('Perhatian', 'Masukan judul terlebih dahulu');
    } else {
      Tambah_Catatan();
    }
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Bentar', 'Kamu Yakin Ingin Keluar App ?', [
        {
          text: 'Batal',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Iya',
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
  }, []);

  //nyimpan data//
  const saveData = async data => {
    try {
      await AsyncStorage.setItem('database', JSON.stringify(data));
    } catch (e) {
      console.log('server eror', e);
    }
  };

  const Tambah_Catatan = () => {
    data.push({judul: judul, Catatan: Catatan});
    setData(data);
    saveData(data);
    navigation.replace('home');
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#CFB997'}}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('home')}>
          <Icon
            name="arrow-back"
            size={40}
            style={{margin: 20, color: 'black'}}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 30,
            color: 'black',
            borderBottomWidth: 3,
            alignSelf: 'center',
            marginLeft: 20,
            borderColor: 'black',
            fontFamily: 'ZillaSlab-Bold',
          }}>
          Tambah Catatan
        </Text>
      </View>
      <View style={{marginLeft: 20, marginTop: 20}}>
        <Text
          style={{
            fontSize: 20,
            color: 'black',
            fontFamily: 'ZillaSlab-Medium',
          }}>
          Judul
        </Text>
      </View>
      <View
        style={{
          margin: 15,
          width: '95%',
          elevation: 2,
          alignSelf: 'center',
          borderRadius: 10,
          height: 75,
        }}>
        <TextInput
          placeholder="Masukan Judul"
          fontFamily="ZillaSlab-Medium"
          placeholderTextColor="black"
          style={{marginLeft: 10}}
          onChangeText={value => setJudul(value)}
        />
      </View>
      <View style={{marginTop: 20, marginLeft: 10}}>
        <Text
          style={{
            fontSize: 20,
            color: 'black',
            margin: 10,
            fontFamily: 'ZillaSlab-Medium',
          }}>
          Catatan
        </Text>
      </View>
      <View
        style={{
          alignSelf: 'center',
          borderRadius: 10,
          elevation: 2,
          width: '95%',
          height: 300,
        }}>
        <TextInput
          multiline={true}
          textAlignVertical={'top'}
          fontFamily="ZillaSlab-Medium"
          placeholderTextColor="black"
          style={{marginLeft: 10, marginTop: 10}}
          placeholder="Masukan Catatan"
          onChangeText={value => setCatatan(value)}
        />
      </View>
      <TouchableOpacity onPress={() => cek()}>
        <View
          style={{
            alignSelf: 'center',
            marginTop: 30,
            width: '80%',
            borderRadius: 10,
            height: 50,
            borderWidth: 2,
            borderColor: '#9F8772',
            backgroundColor: '#B99B6B',
          }}>
          <Text
            style={{
              fontSize: 25,
              color: 'black',
              fontFamily: 'ZillaSlab-Bold',
              alignSelf: 'center',
              marginTop: 8,
            }}>
            SIMPAN
          </Text>
        </View>
      </TouchableOpacity>
      <View style={{marginTop: 30}} />
    </ScrollView>
  );
};

export default Tambah_Catatan;
