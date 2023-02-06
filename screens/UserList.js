import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useChatContext } from 'stream-chat-expo';
import User from '../components/User';
import { useAuthContext } from '../contexts/AuthContext';

const UserList = () => {
    const [users,setUsers]=useState([]);
    const {client}=useChatContext();
    const {userId}=useAuthContext();
    const fetchUsers = async () =>{
        const data=await client.queryUsers({});
        const newData= data.users.filter((item)=>item.id!=userId);
        setUsers(newData);
    }
    useEffect(()=>{
        fetchUsers();
    },[]);
    const Navigation=useNavigation();



    return (
        <FlatList data={users} renderItem={({item})=>{
            return(
            <User user={item} onPress={async () => {
                const channel=client.channel("messaging",{members:[userId,item.id]});
                await channel.create();
                Navigation.navigate("ChannelScreen",{screen:'chat',params:{channel}});
            }} />
            );
        }} />
    );
};

export default UserList;
