import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import AuthContextComp from './contexts/AuthContext';
import {StreamChat} from 'stream-chat';
import { useEffect,useState } from 'react';
import {OverlayProvider,Chat,ChannelList,Channel, MessageList,MessageInput} from 'stream-chat-expo';
const API_KEY='2whuv5gjpfvs';
const client=StreamChat.getInstance(API_KEY);


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [currentChannel,selectChannel]=useState();
 
  useEffect(()=>{
    // mounting

    // unmounting
    return () => {
      client.disconnectUser();
    }
  });

  if (!isLoadingComplete ) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthContextComp>
          <OverlayProvider>
            <Chat client={client}>
              <Navigation colorScheme={colorScheme} />
              {/* {!currentChannel?   
              <ChannelList onSelect={(channel)=>{
                selectChannel(channel);
              }} /> : 
              <Channel channel={currentChannel}>
                <MessageList />  
                <Text onPress={()=>{
                  selectChannel(null);r
                }}>BACK</Text>
                <MessageInput />
              </Channel>} */}
            </Chat>
          </OverlayProvider>
        </AuthContextComp>
        <StatusBar />
        
      </SafeAreaProvider>
    );
  }
}
