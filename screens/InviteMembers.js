// import React, { useEffect,useState } from "react";
// import { useChatContext } from "stream-chat-expo";
// import { useAuthContext } from "../contexts/AuthContext";
// import { FlatList } from "react-native";
// import User from "../components/User";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import Button from "../components/Button";
// const InviteMembers = () => {
//     const [users,setUsers]=useState([]);
//     const [selectedMembers,setSelectedMembers]=useState([]);
//     const {client}=useChatContext();
//     const route = useRoute();
//     const navigation=useNavigation();
//     const channel = route.params.channel;

//     const fetchUsers = async () =>{
//         const data=await channel.queryMembers({});
//         const userIds = data.members.map((m)=>m.user_id);
//         const response = await client.queryUsers({});
//         setUsers(response.users);
//     }
//     useEffect(()=>{
//         fetchUsers();
//     })

//     const selectUser = (user) => {
//         if(selectedMembers.includes(user.id)){
//             setSelectedMembers((existingMembers)=>
//                 existingMembers.filter((id)=> id !== user.id)
//             );
//         }
//         else{
//             setSelectedMembers((existingMembers)=>[...existingMembers,user.id]);
//         }
//         console.log(selectedMembers);
//     }

//     const addUsers = async () => {
//         console.log(selectedMembers);
//         await channel.addMembers(selectedMembers);
//         navigation.goBack();
//     }

//     return (
//         <FlatList data={users} renderItem={({item})=>{
//             return(
//             <User user={item} onPress={selectUser} isSelectedUser={selectedMembers.includes(item.id)}  />
//             );
//         }} 
//         ListHeaderComponent={() => !!selectedMembers.length && (
//             <Button title="Add Members" onPress={addUsers}></Button>
//         )}
//         />
//     )
// }

// export default InviteMembers;

import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Channel, useChatContext } from "stream-chat-expo";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import Button from "../components/Button";
import User from "../components/User";

const InviteMembersScreen = () => {
  const { client } = useChatContext();
  const [users, setUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const channel = route.params.channel;

  const fetchUsers = async () => {
    const existingMembers = await channel.queryMembers({});
    const existingMemberIds = existingMembers.members.map((m) => m.user_id);

    const response = await client.queryUsers({
      id: { $nin: existingMemberIds },
    });
    console.log(response.users);
    setUsers(response.users);
  };

  useEffect(() => {
    fetchUsers();
    
  }, []);
  
  

  const inviteUsers = async () => {
    console.log(selectedUserIds);
    await channel.addMembers(selectedUserIds);
    navigation.goBack();
  };

  return (
    <FlatList
      data={users}
      renderItem={({ item }) => (
        <User
          user={item}
          onPress={()=>{
            const user=item;
            if (selectedUserIds.includes(user.id)) {
              setSelectedUserIds((existingUsers) =>
              existingUsers.filter((id) => id !== user.id)
            );
            } else {
              setSelectedUserIds((exisitingUsers) => [...exisitingUsers, user.id]);
            }
          }}
          isSelected={selectedUserIds.includes(item.id)}
        />
      )}
      ListHeaderComponent={() =>
        !!selectedUserIds.length && (
          <Button title="Invite" onPress={inviteUsers} />
        )
      }
    />
  );
};

export default InviteMembersScreen;
