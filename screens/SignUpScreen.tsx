import { useState } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useChatContext } from "stream-chat-expo";
import { useAuthContext } from "../contexts/AuthContext";
import { Auth } from "aws-amplify";
const SignUpScreen = () => {
  const [username, setUsername] = useState('manas');
  const [name, setName] = useState('manas');
  const [password, setPassword] = useState("");
  const {client}= useChatContext();
  const {setId} = useAuthContext();
  const connectUser = async () => {
    const userData = Auth.currentAuthenticatedUser();
    await client.connectUser({
        id:username,
        name:name,
        image:'data:image/jpeg;base64,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'
    },client.devToken(username));
    const channel = client.channel("livestream", "public", { name: "Public" });
    await channel.watch();
    setId(username);
    
  };
  const signUp = () => {
    connectUser();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>We are so excited to see you again</Text>

        <Text style={styles.text}>ACCOUNT INFORMATION</Text>

        <TextInput
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          placeholderTextColor="grey"
          placeholder="Username"
        />
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholderTextColor="grey"
          placeholder="Full name"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholderTextColor="grey"
          placeholder="Password"
        />

        <Text style={styles.forgotPasswordText}>Forgot password?</Text>

        <Pressable style={styles.button} onPress={signUp}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#36393E",
    flex: 1,
    padding: 10,
    paddingVertical: 30,
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
    marginVertical: 10,
  },
  subtitle: {
    color: "lightgrey",
    fontSize: 20,
    alignSelf: "center",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#202225",
    marginVertical: 5,
    padding: 15,
    color: "white",
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#5964E8",
    alignItems: "center",
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  forgotPasswordText: {
    color: "#4CABEB",
    marginVertical: 5,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    marginVertical: 5,
  },
});

export default SignUpScreen;
