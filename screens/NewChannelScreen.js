import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import uuid from 'react-native-uuid';
import { useChatContext } from 'stream-chat-expo';
import Button from '../components/Button';
import { useAuthContext } from '../contexts/AuthContext';

const NewChannelScreen = () => {
    const [name,setName]=useState("");
    const {client} = useChatContext();
    const {userId}= useAuthContext();
    const navigation=useNavigation();
    const createChannel = async () => {
        const channel=client.channel('team',uuid.v4(),{name});
        await channel.create();
        await channel.addMembers([userId]);
        navigation.navigate("ChannelScreen",{screen:"Chat",params:{channel}});
    }

    return (
        <View style={styles.root}>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder='Add Name'></TextInput>
            <Button title='New Channel' onPress={createChannel}></Button>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
      padding: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: "gray",
      padding: 10,
      borderRadius: 5,
      marginHorizontal: 10,
      color: "white",
    },
});

export default NewChannelScreen;
