
import React from 'react';
import { Text, StyleSheet, Image, Pressable, View } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
const User = ({user,onPress,isSelected=false}) => {
    return (
        <Pressable style={styles.root} onPress={onPress}>
            <Image style={styles.image} source={{uri:user.image}}></Image>
            <Text style={styles.name}>{user.name}</Text>
            <View>
              {isSelected && <AntDesign name='checkcircle' size={24} color='green'></AntDesign>}
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    root: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
    },
    image: {
      width: 50,
      aspectRatio: 1,
      borderRadius: 25,
      marginRight: 10,
    },
    name: {
      color: "white",
      fontWeight: "bold",
    },
  });

export default User;
