import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import Button from '../components/Button';
import User from '../components/User';
const MemberList = () => {
    const [members,setMembers]=useState([]);
    const route=useRoute();
    const channel=route.params.channel;
    const navigation=useNavigation();
    const fetchData = async () => {
        const data = await channel.queryMembers({});
        setMembers(data.members);
    }

    useEffect(()=>{
        fetchData();
    },[channel]);

    return (
        <FlatList data={members} keyExtractor={(item)=> item.user_id} renderItem={({item})=>{
            return(
            <User user={item.user} onPress={()=>{}}
             />
            );
        }} 
        ListHeaderComponent={()=>(
            <Button title='Add Members' onPress={()=>{
                navigation.navigate("InviteMembers",{channel});
            }}></Button>
        )}
        />
    )
};



export default MemberList;
