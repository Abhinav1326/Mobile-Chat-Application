import React from "react";
import {View, Image, StyleSheet} from 'react-native'
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import {IMessage, Message, MessageProps} from 'react-native-gifted-chat'

const ChatMessageBox = (props: MessageProps<IMessage>) => {

    const renderRightAction = ( progressAnimatedValue: Animated.AnimatedInterpolation) => {
       
        return(
            <View style={styles.container}>
                <View style={styles.replyImageWrapper}>
                    <Image 
                    style={styles.replyImage}
                    source={require('./assets/reply.png')}></Image>
                </View>
            </View>
        );
    };
    return (
        <GestureHandlerRootView>
            <Swipeable
                friction={2}
                rightThreshold = {40}
                renderRightActions = {renderRightAction}
            >
                <Message {...props} />
            </Swipeable>
        </GestureHandlerRootView>
    )
};


const styles = StyleSheet.create({
    container: {
        width: 40,
    },

    replyImageWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    replyImage: {
        width: 20,
        height: 20,
    },
})

export default ChatMessageBox;

