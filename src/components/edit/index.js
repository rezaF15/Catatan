import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {createContext, useContext, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {user} from '../../routers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Edit = ({navigation, route}) => {
  const [judulInputModal, setJudulInputModal] = useState('');
  const [catatanNomorModal, setCatatanNomorModal] = useState('');
  const [index, setIndex] = useState('');
  const {Global} = useContext(user);
  const [data, setData] = Global;

  //edit menggunakan params//
  useEffect(() => {
    setJudulInputModal(route.params.Judul);
    setCatatanNomorModal(route.params.catatan);
    setIndex(route.params.index);
  }, []);

  //ubah data//
  const ubah_data = index => {
    data[index].judul = judulInputModal;
    data[index].Catatan = catatanNomorModal;
    setData(data);
    saveData(data);
    navigation.navigate('home');
    console.log(data);
  };
  const saveData = async data => {
    try {
      await AsyncStorage.setItem('database', JSON.stringify(data));
    } catch (e) {
      console.log('server eror', e);
    }
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
          Edit Catatan
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
          value={judulInputModal}
          placeholder="Masukan Judul"
          fontFamily="ZillaSlab-Medium"
          placeholderTextColor="black"
          style={{marginLeft: 10}}
          onChangeText={value => setJudulInputModal(value)}
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
          value={catatanNomorModal}
          multiline={true}
          textAlignVertical={'top'}
          fontFamily="ZillaSlab-Medium"
          placeholderTextColor="black"
          style={{marginLeft: 10, marginTop: 10}}
          placeholder="Masukan Catatan"
          onChangeText={value => setCatatanNomorModal(value)}
        />
      </View>
      <TouchableOpacity onPress={() => ubah_data(index)}>
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

export default Edit;
