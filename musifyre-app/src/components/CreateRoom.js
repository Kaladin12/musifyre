import React, { useState, useEffect } from "react";
import '../App.css';
import { useNavigate } from 'react-router-dom';
import Presigned from "../helpers/s3_presigned";
import PostCreateRoom from "../helpers/post_create_room";
import ButtonLink from "./Button_link";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

const CreateRoom = (props) => {
    const [name, setName] = useState('');
    const [file, setFile] = useState(null);
    const [roomId, setRoomId] = useState(null);
    const [isSendingFile, setIsSendingFile] = useState(false)
    const navigate = useNavigate();
    const onSubmit = async (event) => {
        event.preventDefault();

        if (file !== null) {
        try {
            const roomId_res = await PostCreateRoom(name);
            setRoomId(roomId_res);
            setIsSendingFile(true)
            const res = await Presigned(file, roomId_res);
            console.log(res);
            setIsSendingFile(false)
            navigate(`/room/${roomId_res}`, { replace: true })
        } catch (error) {
            console.error("Error creating room:", error);
        }
        } else {
        console.log('File does not exist');
        }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    console.log('FILE');
  };

  useEffect(() => {
    console.log(props)
    if (props.loggedIn === false) {
      navigate(`/login`, { replace: true })
    }
  }, []);

  return (
    <div>
      <div className="Logo">
        <p>Musifyre</p>
      </div>
      <div>
        {
          isSendingFile === true && 
          <Alert variant="success" className="sucessAlert">
            <Alert.Heading>Uploading your file!</Alert.Heading>
            
          </Alert>
        }
      </div>
      <div className="new-room">
        
        <p>Enter your new room data :o</p>
        <input type="text" id="name" name="roomName" placeholder="Room name" value={name} onChange={(event) => setName(event.target.value)} />
        <div className="text">
          In order to create your new room, you must first select a song to start listening!
        </div>
        <br />
        <div>
          <input type="file" onChange={handleFileChange} />
          <ButtonLink to="/room" onClick={onSubmit} id="Create" className="but" roomId={roomId}>
            Create room
          </ButtonLink>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;