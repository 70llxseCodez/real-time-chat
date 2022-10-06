import React, { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './MessageCom.css'

interface IMessages {
  room:string,
  userName:string,
  socket:any
}

interface IData {
  room:string,
  author:string,
  messages:string,
  time:string
}

const MessagesCom = ({room,userName,socket}:IMessages) => {
  const [messages,setMessages] = useState('')
  const [msgData,setMsgData] = useState<IData[]>([])
  const navigate = useNavigate()
  const onHandleChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessages(e.target.value)
  }

  const onSendMessages = async () => {
    if(messages){
      const messagesData = {
        room,
        messages,
        author:userName,
        time: 
                (new Date(Date.now()).getHours() > 10 ?  new Date(Date.now()).getHours() : '0' + new Date(Date.now()).getHours()) + ':' +
                (new Date(Date.now()).getMinutes() > 10 ? new Date(Date.now()).getMinutes() : '0' + new Date(Date.now()).getMinutes())
            }
          setMsgData(list => [...list,messagesData])
           await socket.emit("send_messages",messagesData)
      }
    }

    useEffect(() => {
      socket.on("receive_message", (data:IData) => {
        setMsgData(list => [...list,data])
      })
    },[socket])
  

  return (
    <div>
      <div>
        <div className='header'>
            <h2>live chat</h2>
        </div>
        <div className='bodyChat'>
          {
            msgData.map((item:IData,index) => {
              return (
                <div key={index} className={userName === item.author ? 'you' : 'he'} >
                  <div>
                    <h1>{item.messages}</h1>
                    <span>{item.author}</span>
                    <p>{item.time}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className='footerInput'>
            <input type="text" placeholder='send something'value={messages} onChange={onHandleChangeMessage}/>
            <button onClick={onSendMessages}>send</button>
        </div>
        <button onClick={() => window.location.reload()}>
          sign out from the room
        </button>
      </div>
    </div>
  )
}

export default MessagesCom