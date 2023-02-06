import React, { Component } from 'react';
import { Pressable } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChannelScreen from '../screens/ChannelScreen';
import MemberList from '../screens/MemberList';
import { FontAwesome } from '@expo/vector-icons';
import InviteMembers from '../screens/InviteMembers';
const Stack=createNativeStackNavigator();


const ChannelStack = () => {
    return (
       <Stack.Navigator>
            <Stack.Screen name='Chat' component={ChannelScreen} options={({navigation,route})=>( {title:'Channel',headerRight : () => (
            route?.params?.channel && (
            <Pressable onPress={()=>{
                navigation.navigate("MemberList",{channel:route.params.channel})
            }}>
                <FontAwesome name="users" size={24} color="white" />
            </Pressable>
            )
            )})}/>
            <Stack.Screen name='MemberList' component={MemberList} options={{title:"Member List"}}/>
            <Stack.Screen name="InviteMembers" component={InviteMembers} options={{title:"Add Members"}}></Stack.Screen>
       </Stack.Navigator>
    );
};



export default ChannelStack;
