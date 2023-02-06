import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import AuthContextComp from './contexts/AuthContext';
import {StreamChat} from 'stream-chat';
import { useEffect } from 'react';
import {OverlayProvider,Chat,DeepPartial,Theme} from 'stream-chat-expo';
import { StreamColors } from './constants/Colors';
import API_KEY from './code';
const client=StreamChat.getInstance(API_KEY);

import { Amplify } from 'aws-amplify'
import awsconfig from './src/aws-exports'
import {withAuthenticator} from '@aws-amplify/ui-react-native';
Amplify.configure({...awsconfig,Analytics:{disabled:true}});

const theme: DeepPartial<Theme> = {
  colors: StreamColors,
  inlineDateSeparator :{
   
    text:{
      color:"white"
    }
  },
  dateHeader:{
    text:{
      color:"white"
    }
  }
};

function App() {
  const isLoadingComplete = useCachedResources();
  
  useEffect(()=>{
    return () => {
      client.disconnectUser();
    }
  },[]);

  if (!isLoadingComplete ) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthContextComp client={client}>
          <OverlayProvider value={{style:theme}}>
            <Chat client={client}>
              <Navigation colorScheme={"dark"} />
              
            </Chat>
          </OverlayProvider>
        </AuthContextComp>
        <StatusBar />
        
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);