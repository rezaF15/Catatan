import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  DrawerLayoutAndroid,
  Linking,
} from 'react-native';
import React, {useContext, useEffect, useState, useRef} from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import {user} from '..//..//routers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
  const {Global} = useContext(user);
  const [data, setData] = Global;
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [judulInputModal, setJudulInputModal] = useState('');
  const [catatanNomorModal, setCatatanNomorModal] = useState('');
  const [tampilIndex, setTampilIndex] = useState('');

  //nimpan data//
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let value = await AsyncStorage.getItem('database');
      value = JSON.parse(value);
      if (value !== null) {
        setData(value);
      }
    } catch (e) {
      console.log('get erorr', e);
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const saveData = async data => {
    try {
      await AsyncStorage.setItem('database', JSON.stringify(data));
    } catch (e) {
      console.log('server eror', e);
    }
  };

  const Alert_hapus = index => {
    Alert.alert('Bentar', 'Yakin ni mau di hapus?', [
      {
        text: 'Engga',
        style: 'Engga',
      },
      {
        text: 'Iyah',
        onPress: () => {
          Remove_note(index);
          navigation.replace('home');
        },
      },
    ]);
  };

  const Remove_note = index => {
    data.splice(index, 1);
    setData(data);
    saveData(data);
    // setTimeout(() => {}, 10);
    getData();
  };
  const lapor_in = () => {
    let url =
      'whatsapp://send?text=' +
      'Silahkan Laporkan Bug/Problem Pada Aplikasi Al-Quran,Harap Laporkan dengan Berupa ScreenShot Maupun Video!!!' +
      '&phone=62' +
      81275059187;
    Linking.openURL(url)
      .then(data => {
        console.log('WhatsApp Opened');
      })
      .catch(() => {
        Alert.alert(
          'Pemberitahuan !!',
          'Harap Instal Whastapp terlebih dahulu',
        );
      });
  };

  const drawer = useRef(null);
  const [drawerPosition, setDrawerPosition] = useState('left');
  const navigationView = () => (
    <View style={{backgroundColor: 'gray', flex: 1}}>
      <Icon1
        name="user"
        size={60}
        style={{
          alignSelf: 'center',
          marginTop: 20,
          borderBottomWidth: 3,
          borderColor: 'black',
          color: 'black',
        }}
      />
      <TouchableOpacity
        style={{marginLeft: 15, marginTop: 30}}
        onPress={lapor_in}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
          Report App
        </Text>
      </TouchableOpacity>

      <View
        style={{
          borderWidth: 2,
          alignSelf: 'flex-end',
          borderRadius: 10,
          backgroundColor: '#dddd',
          marginTop: '100%',
          elevation: 5,
          right: 10,
        }}>
        <Icon1
          name="close"
          size={30}
          style={{
            color: 'black',
          }}
          onPress={() => drawer.current.closeDrawer()}
        />
      </View>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={drawerPosition}
      renderNavigationView={navigationView}>
      <ScrollView style={{flex: 1, backgroundColor: '#CFB997'}}>
        <View>
          <View
            style={{
              backgroundColor: '#CFB997',
              flexDirection: 'row',
              elevation: 9,
              justifyContent: 'space-between',
              borderBottomWidth: 2,
              borderColor: 'gray',
            }}>
            <TouchableOpacity
              style={{padding: 15}}
              onPress={() => drawer.current.openDrawer()}>
              <Icon name="menu" size={25} style={{color: 'black'}} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{padding: 10}}
              onPress={() => navigation.replace('tambah')}>
              <Icon1 name="plus" size={40} style={{color: 'black'}} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignSelf: 'center',
              width: '95%',
              height: 75,
              borderRadius: 10,
              marginTop: 10,
            }}>
            <Text
              style={{
                marginTop: 10,
                alignSelf: 'center',
                borderBottomWidth: 3,
                fontFamily: 'ZillaSlab-Bold',
                fontSize: 30,
                color: 'black',
              }}>
              CATATAN
            </Text>
          </View>
          {data.reverse().map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  margin: 20,
                  marginTop: 50,
                  width: '85%',
                }}>
                <Icon3 name="book-open" size={25} style={{color: 'black'}} />
                <TouchableOpacity
                  onPress={() => {
                    toggleModal();
                    setJudulInputModal(item.judul);
                    setCatatanNomorModal(item.Catatan);
                    setTampilIndex(index);
                  }}>
                  <Text
                    style={{
                      color: '#4D455D',
                      fontWeight: 'bold',
                      fontSize: 20,
                      marginLeft: 20,
                      width: '1000%',
                      borderBottomWidth: 2,
                    }}>
                    {item.judul}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        <ScrollView>
          <Modal
            isVisible={isModalVisible}
            animationIn="zoomIn"
            animationOut="zoomOut">
            <View
              style={{
                backgroundColor: '#CFB997',
                width: '100%',
                height: 600,
                borderRadius: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <TouchableOpacity onPress={() => toggleModal()}>
                  <Icon2 name="close" size={40} style={{padding: 10}} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.replace('edit', {
                      Judul: judulInputModal,
                      catatan: catatanNomorModal,
                      index: tampilIndex,
                    });
                  }}>
                  <Icon3
                    name="edit"
                    size={31}
                    style={{color: 'green', marginLeft: '65%', padding: 15}}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Alert_hapus(tampilIndex)}>
                  <Icon2
                    name="trash-o"
                    size={35}
                    style={{color: '#DA1212', padding: 15, marginLeft: -50}}
                  />
                </TouchableOpacity>
              </View>
              <ScrollView>
                <View
                  style={{
                    marginTop: 30,
                    alignSelf: 'center',
                    borderWidth: 2,
                    borderRadius: 10,
                    width: '90%',
                  }}>
                  <Text
                    style={{
                      fontSize: 25,
                      color: 'black',
                      fontWeight: 'bold',
                      alignSelf: 'center',
                      borderBottomWidth: 2,
                      marginTop: 10,
                    }}>
                    {judulInputModal}
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      marginTop: 30,
                      alignSelf: 'center',
                      color: 'black',
                      padding: 15,
                    }}>
                    {catatanNomorModal}
                  </Text>
                </View>
              </ScrollView>
            </View>
          </Modal>
        </ScrollView>
      </ScrollView>
    </DrawerLayoutAndroid>
  );
};
export default HomeScreen;
