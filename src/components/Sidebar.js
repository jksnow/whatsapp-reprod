import React, { useEffect, useState } from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import { Chat, DonutLarge, MoreVert, SearchOutlined } from '@material-ui/icons'
import db from '../firebase';

import './Sidebar.css'
import SidebarChat from './SidebarChat'
import {useStateValue} from '../StateProvider'

const Sidebar = () => {

    const [rooms, setRooms] = useState([]);
    const [{user}, dispatch] = useStateValue();

    const [input, setInput] = useState('');

    const [roomNames, setRoomNames] = useState(["nothing"]); 

    let suggestion = [];

    const [filteredRooms, setFilteredRooms] = useState([]);

    const autocomplete = (e) => {
        setInput(e.target.value);
        roomNames.forEach(x=> {
            if(x.substr(0, e.target.value.length).toUpperCase() === e.target.value.toUpperCase()) {
                suggestion.push(x);

                console.log(suggestion);
            }
        })
        
        
        setFilteredRooms(rooms.filter(item => suggestion.includes(item.data.name)));
    }


    useEffect(()=>{
        let roomNamesArray = [];
        rooms.map(room=>(
            roomNamesArray = [
            ...roomNamesArray,
            room.data.name
            ]))
        setRoomNames(roomNamesArray);
        setFilteredRooms(rooms);
        
    },[rooms])

    useEffect(()=>{
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc=>
                ({
                    id: doc.id,
                    data: doc.data()
                })
            ))
        ))
        return () => {
            unsubscribe();
        }
        
    },[])

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user ? user?.photoURL : ''} />
                <div className="sidebar__headerRight">
                <IconButton>
                    <DonutLarge />
                </IconButton>
                <IconButton>
                    <Chat />
                </IconButton>
                <IconButton>
                    <MoreVert />
                </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input onChange={(e) => autocomplete(e)} type="text" placeholder="Search Room Name" />
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat addNewChat />
                {filteredRooms.map(room=>(
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                ))}
            </div>
        </div>
    )
}

export default Sidebar
