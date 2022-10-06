import React, { ChangeEvent } from 'react'
import './Form.css'

interface IForm {
    setUserName: (e:any) => void,
    userName: string,
    setRoom: (e:any) => void,
    room: string,
    joinRoom:() => void
}

const Form = ({setUserName,userName,room,setRoom,joinRoom}:IForm) => {
    const onHandleChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value)
    }
    const onHandleChangeRoom = (e: ChangeEvent<HTMLInputElement>) => {
        setRoom(e.target.value)
    }
  return (
    <div>
        <div>
            <input type="text" placeholder='name of user' value={userName} onChange={onHandleChangeUserName}/>
            <input type="text" placeholder='room...' value={room} onChange={onHandleChangeRoom}/>
            <button className='button' onClick={joinRoom}>send</button>
        </div>
    </div>
  )
}

export default Form