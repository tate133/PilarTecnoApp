import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  FlatList,
  Image,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ListItem, Avatar, Button, Stack } from '@rneui/themed'
import Header from '../components/AppHeader';
import { useSelector, useDispatch } from "react-redux";
import { appSelector, appActions } from "../redux/appRedux";
import api,{IMG_URL} from "../services/api"
import { ListItem } from '@rneui/base';
import { Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const List = () => {
  const dispatch = useDispatch();
  const navigate = useNavigation();
  const [pokemons, setPokemons] = useState(null);
  const [next, setNext] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState(null);
  const loading = useSelector(appSelector.loading);

  useEffect(()=>{
    getPokemons()
  },[])

  const getPokemonImgId = (id) => {
    console.log('long. '+id.length)
      switch (id.length) {
      case 1:
        return `00${id}`
      case 2:
        return `0${id}`
      default:
        return id
      }
  }

  const navigateTo = (route, data) =>{
    navigation.navigate(route, {data})
  };

  const keyExtractor = (item, index) => index.toString(); 

  const renderItem = ({item}) => {
    const path = item.url.split('/');
    const imgID = getPokemonImgId(path[6]);

    return(
      <ListItem bottomDivider onPress={()=>navigateTo('Detail', {url:item.url})}>
        <Avatar title={item.name} source={{ uri:`${IMG_URL}${imgID}.png` }}/>
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    )
  }

  const renderFooter = () => {
    return(
      <View style={{width:'100%', height:120}}>
        <Button disabled={loading} title='Cargar Mas' onPress={()=> loadMore()}/>
      </View>
    )
  }
    
  const getPokemons = async () => {
    try {
        //dispatch(appActions.loading(true))
        const result = await api.GET(api.pokemons)
        if(result){
          console.log('poke: ', result)
          setPokemons(result.results)
          setNext(result.next)
        }
      } catch (error) {
        console.log(error)
      } finally {
        //dispatch(appActions.loading(false))
      }
  }

  const loadMore = async () => {
    try {
      //dispatch(appActions.loading(true))
      const result = await api.GET(next)
      if(result){
        console.log('poke: ', result)
        setPokemons([...pokemons, ...result.results])
        setNext(result.next)
      }
    } catch (error) {
      console.log(error)
    } finally {
      //dispatch(appActions.loading(false))
    }
  }

  return (
      <SafeAreaProvider>
        <Header title='Pokedex'/>
              <FlatList 
                keyExtractor={keyExtractor}
                data={pokemons}
                renderItem={(item)=> renderItem(item)}
                ListFooterComponent= {()=> renderFooter()}
              />
            
      </SafeAreaProvider>
    
    
  );
};

const styles = StyleSheet.create({
  textButton: {
    justifyContent:'center',
    fontSize: 20,
    fontWeight: '700',
  },
  viewGrid: {
    flex:2, 
    justifyContent:'center', 
    alignItems:'center', 
    white:'100%', 
    height: '100%',
  },
  buttonGrid: {
    borderRadius: 8,
    elevation:3, 
    justifyContent:'center', 
    alignItems:'center', 
    backgroundColor: '#606060',
    width: WIDTH*.4,
    height: WIDTH*.4,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default List;
