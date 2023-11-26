import { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import {getUserInfor} from "../helper/common";
import {EVENT_NAME_SOCKET} from "../utils/constants/socket";
import {ISocketMessage} from "../dto/socket";
import {Dispatch} from "@reduxjs/toolkit";
import {setCommentSocket, setChatSocket} from "../reducers/conversationSlice";

const useSocketListener = (dispatch : Dispatch) => {
  const socketRef = useRef();
  const userInfor = getUserInfor();
  const eventListenName = EVENT_NAME_SOCKET.replace('{projectId}', userInfor?.last_project_active)

  useEffect(() => {
    // Connect to the Socket.IO server
    // @ts-ignore
    socketRef.current = io(process.env.REACT_APP_WEB_SOCKET_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });

    // Listen for events on the specified channel
    const handleIncomingMessage = (data: ISocketMessage) => {
      console.log({socket: data})
      if(!data ||
        typeof data.action === 'undefined' ||
        typeof data.item === 'undefined' ||
        typeof data.conversation === 'undefined' ||
        typeof data.relate_conversation_item === 'undefined'
      ) {
        return;
      }
      switch (data.item) {
        case 'chat':
          handleChat({payload: data, dispatch})
          break;
        case 'comment':
          handleComment({payload: data, dispatch})
          break;
        default:
          return;
      }
    };
    // @ts-ignore
    socketRef.current?.on(eventListenName, handleIncomingMessage);

    return () => {
      // Clean up the socket connection when component unmounts
      if (socketRef.current) {
        // @ts-ignore
        socketRef.current?.off(channelName, handleIncomingMessage);
        // @ts-ignore
        socketRef.current?.disconnect();
      }
    };
    // eslint-disable-next-line
  }, []);

  return null; // Custom hooks typically return some value or null
};

export function handleChat({payload, dispatch} : {
  payload: ISocketMessage
  dispatch : Dispatch
}) {
  dispatch(setChatSocket(payload))
  return null;
}

export function handleComment({payload, dispatch} : {
  payload: ISocketMessage
  dispatch : Dispatch
}) {
  dispatch(setCommentSocket(payload))
  return null;
}


export default useSocketListener;