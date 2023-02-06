import {createDrawerNavigator,DrawerContentScrollView} from '@react-navigation/drawer';
import { SafeAreaView, Text,StyleSheet,View,TouchableOpacity, Pressable } from 'react-native';
import { ChannelList } from 'stream-chat-expo';
import { useAuthContext } from '../contexts/AuthContext';
import { Auth } from 'aws-amplify';
import { useState } from 'react';
import UserList from '../screens/UserList';
import Button from '../components/Button';
import MemberList from '../screens/MemberList';
import NewChannelScreen from '../screens/NewChannelScreen';
import ChannelStack from './ChannelStack';
const Drawer=createDrawerNavigator();

const DrawerNavigator = () => (
    <Drawer.Navigator drawerContent={DrawerContent}>
        <Drawer.Screen name='ChannelScreen' component={ChannelStack} options={{headerShown:false}}></Drawer.Screen>
        <Drawer.Screen name='UserList' component={UserList} options={{title:"User List"}}></Drawer.Screen>
        <Drawer.Screen name='NewChannel' component={NewChannelScreen} options={{title:"New Channel"}}></Drawer.Screen>
    </Drawer.Navigator>
)

const DrawerContent = (props) => {
    const [tab,setTab]=useState('public');
    const selectChannel = (channel) => {
        props.navigation.navigate("ChannelScreen",{screen:"Chat",params:{channel}});
    }

    const {userId} = useAuthContext();

    const privateFilters = {
        type:"messaging",
        members: {
          $in: [userId],
        }
    };

    const publicFilters = {
        type: {$ne:"messaging"},
        members:{
            $in:[userId]
        }
    };
    return (
        <SafeAreaView {...props} style={{flex:1}}>
            <Text style={{fontWeight:'bold',color:'white',alignSelf:'center'}}>Welcome</Text>
            <View style={{flexDirection:'row'}}>
            <Text style={[styles.groupTitle,{color:tab=="public"?"white":'gray'}]} onPress={()=>{
                setTab("public");
            }}>Public</Text>
            <Text style={[styles.groupTitle,{color:tab=="private"?"white":'gray'}]} onPress={()=>{
                setTab("private");
            }}>Private</Text>
            </View>
            {tab=='public'?
            <>
            <Button title='New Public Channel' onPress={()=>{
                props.navigation.navigate('NewChannel');
            }}></Button>
            <ChannelList onSelect={selectChannel} filters={publicFilters}></ChannelList>                
            </>
            :
            <>
                <Button title='New Chat' onPress={()=>{
                    props.navigation.navigate('UserList');
                }}></Button>
                <ChannelList onSelect={selectChannel} filters={privateFilters}></ChannelList>                
             </>
            }            
           
            <TouchableOpacity onPress={()=>{
                Auth.signOut();
            }} ><Text style={{color:'white',textAlign:'center'}}>Logout</Text></TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
      color: "white",
      fontWeight: "bold",
      alignSelf: "center",
      fontSize: 16,
      margin: 10,
    },
    groupTitle: {
      color: "white",
      margin: 10,
      justifyContent:'center',
      alignItems:'center',
      alignSelf:'center',
      flex:1,
      textAlign:'center'
    },
  });

export default DrawerNavigator;