import { Text,View,StyleSheet } from "react-native";
import { useRoute , useNavigation} from "@react-navigation/native";
import { Channel, MessageInput, MessageList ,MessageAvatar} from "stream-chat-expo";
const SmallerMessageAvatar = () => <MessageAvatar size={30} />
const ChannelScreen = () => {
    const route=useRoute();
    const channel=route.params?.channel;
    const Navigation = useNavigation();
    if(!channel){
        return(
        <View style={styles.home}>
            <Text style={styles.homeText}>HOME SCREEN</Text>
        </View>
        );
    }
    return(
        <Channel  channel={channel} key={channel.data.id} MessageAvatar={SmallerMessageAvatar}>
            <View style={{flex:1,background:'red'}}>
            <MessageList></MessageList>
            <MessageInput></MessageInput>
            </View>
        </Channel>
    )
}



const styles = StyleSheet.create({
    home:{
        flex:1,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    },
    homeText : {
        fontSize:30,
        color:'white',
    }
});

export default ChannelScreen;