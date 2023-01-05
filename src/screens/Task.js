import React, { useState } from 'react';
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
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from '../components/AppHeader';
import { 
  Input, 
  Button,  
  CheckBox
} from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { appActions, appSelector } from '../redux/appRedux';
import { v4 as uuid } from 'uuid';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Task = () => {
  const dispatch = useDispatch();
  const todo = useSelector(appSelector.todo);
  const [text, setText] = useState('');

  const handleChange = (e)=> {
    setText(e);
  }

  const addTask = () =>{
    dispatch(appActions.addTodo({text: text, id: todo.lenght +1}));
    setText('');
  }

  const handleChecked = (e, id) => {
    dispatch(appActions.setCompletedTodo({id, completed: e}))
  }

  const delTask = () => {
    dispatch(appActions.deleteTodo(id));
  }

  return (
      <SafeAreaProvider>
        <Header title='Tareas'/>
        <ScrollView style={styles.viewGrid}>
          <View style={{flex:1, width:WIDTH}}>
            <Input
                placeholder='Nueva Tarea'
                value={text}
                onChangeText={(e)=>handleChange(e)}
            />

            <Button title="Agregar Tarea " onPress={()=> addTask()}/>
          </View>
          <View style={{flex:4, width:WIDTH, alignItems:'center'}}>
            {todo.map((t, index)=>
                <View key={t.id} style={{width:WIDTH, flexDirection:'row', justifyContent:'space-around'}}>
                  <CheckBox
                   
                    checked={t.completed}
                    onPress={() => handleChecked(!t.completed, t.id)}
                  />
                  <Text key={t.id}>{t.text}</Text>
                  <Button title='eliminar' onPress={()=> delTask(t.id)}/>
                </View>
              )
            }
          </View>
        </ScrollView>
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

export default Task;
