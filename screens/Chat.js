import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback
} from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import {
    collection,
    addDoc,
    orderBy,
    query,
    onSnapshot
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, database } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../colors';
import ReplyMessageBar from '../ReplyMessageBar';
import { Directions } from 'react-native-gesture-handler';
import { StyleSheet } from "react-native";
import ChatMessageBox from '../chatMessageBox';


export default function Chat() {
    const [messages, setMessages] = useState([]);
    const navigation = useNavigation();
    const [replyMessage, setReplyMessage] = useState(messages);

    const clearReplyMessage = () => setReplyMessage(null);

    const renderAccessory = () => 
        replyMessage && (
            <ReplyMessageBar
                message = {replyMessage}
                clearReply = {clearReplyMessage}
            />
    )

    const onSignOut = () => {
        signOut(auth).catch(error => console.log('Error logging out: ', error));
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={{
                        marginRight: 10
                    }}
                    onPress={onSignOut}
                >
                    <AntDesign name="logout" size={24} color={colors.gray} style={{ marginRight: 10 }} />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    useLayoutEffect(() => {

        const collectionRef = collection(database, 'chats');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, querySnapshot => {
            console.log('querySnapshot unsusbscribe');
            setMessages(
                querySnapshot.docs.map(doc => ({
                    _id: doc.data()._id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user
                }))
            );
        });
        return unsubscribe;
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages)
        );
        // setMessages([...messages, ...messages]);
        const { _id, createdAt, text, user } = messages[0];
        addDoc(collection(database, 'chats'), {
            _id,
            createdAt,
            text,
            user
        });
    }, []);

    const renderCustomInputToolbar = (props: InputToolbarProps) => (
        <InputToolbar {...props} 
            containerStyle={styles.inputContainer}
            accessoryStyle={styles.replyBarContainer}
        />

    )

    const renderMessageBox = (props: MessageProps<IMessage>) => (
        <ChatMessageBox {...props} />
    )

    return (
        // <>
        //   {messages.map(message => (
        //     <Text key={message._id}>{message.text}</Text>
        //   ))}
        // </>
        <GiftedChat
            renderAccessory={renderAccessory}
            messages={messages}
            showAvatarForEveryMessage={false}
            showUserAvatar={false}
            onSend={messages => onSend(messages)}
            // messagesContainerStyle={{
            //     backgroundColor: '#fff'
            // }}
            containerStyle={{
                flexDirection: 'column-reverse'
            }}
            
            textInputStyle={{
                backgroundColor: '#fff',
                borderRadius: 20,
            }}
            // isTyping={true}
            user={{
                _id: auth?.currentUser?.email,
                avatar: 'https://i.natgeofe.com/k/7bfcf2d2-542e-44f0-962a-c36f2efa98a5/heart_2x1.jpg',
            }}

            onLongPress={(_, message) =>  setReplyMessage(message)}

            messagesContainerStyle = {styles.messagesContainer}

            renderMessage={renderMessageBox}
        />

    );
}

const styles = StyleSheet.create({
    replyBarContainer: {
        height: 'auto',
    },
    // messagesContainer: {
    //     flex: 1,
    // },
})