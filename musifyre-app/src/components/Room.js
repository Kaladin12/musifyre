import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import Presigned from "../helpers/s3_presigned";
import { useNavigate } from 'react-router-dom';
import SongPlayer from "./HLSPlayer";
import Alert from 'react-bootstrap/Alert';
import { useParams } from "react-router-dom";

const webSocketURL = 'wss://04bs6ogzh8.execute-api.us-east-1.amazonaws.com/dev';
let socket = null;
let tm = null;
let roomId = null;
let refRoom = null
let refQueue = null

const connectWebSocket = (setQueue, setCurrentSongTimestamp, setCurrentSong, setClosedWhy) => {
  socket = new WebSocket(webSocketURL);
  socket.onopen = () => {
    console.log('WebSocket connection established');
    setInterval(ping, 30000);
    const request = {
      action: 'joinroom', 
      data: { key: `${roomId}` } 
    };

    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(request));
        console.log('SENT');
        let requeste = {
          action: 'ping'
        };
        socket.send(JSON.stringify(requeste));
        console.log('Ping sent')
    }
  };

  // WebSocket event: message
  socket.onmessage = (event) => {
    console.log(event)
    const data = 'data' in event ?  JSON.parse(event.data) : event
    if (data['type'] == '__pong__') {
      pong();
    }
    if (data['type'] === 'fetchQueue') {
      console.log('QUEUE')
      setQueue(data['queue']);
    }
    if (data['type'] === 'playSong' || data['type'] === 'fetchPlayingSong'){
      setCurrentSong(data['song']['m3u8_path']['S'])
      console.log(data)
      let ref_date = Date.now()
      // establece el tiempo de inicio de la cancion toando en cuenta la diferencia respecto al timestamp
      // en el que inicio
      let start_timestamp_ = 'start_timestamp' in data['song'] ? 
              parseInt(data['song']['start_timestamp']['N']) : parseInt(data['start_timestamp'])
      let diff = start_timestamp_ + 500 > ref_date
      console.log(diff)
      if (diff===false) {
        console.log('A', Math.abs(Math.floor((start_timestamp_ + 500 - Date.now())/1000)))
        setCurrentSongTimestamp(Math.abs(Math.floor((start_timestamp_ + 500 - Date.now())/1000)))
      }
      else{
        setCurrentSongTimestamp(0)
        console.log('B')
      }
    }
    console.log('Received message:', data);
  };

  // WebSocket event: error
  socket.onerror = (error) => {
    console.error('WebSocket connection error:', error);
  };

  // WebSocket event: close
  socket.onclose = async (e) => {
    try {
      const request = {
        action: 'leaveroom', 
        data: { key: `${roomId}` } 
      };
      console.log(request)
      await socket.send(JSON.stringify(request));
    } catch (err) {
      console.log(err)
    }
    
    pong()
    
    if (e.code === 1001) {
      console.log(e.code, typeof e.code)
      setClosedWhy(true)
      socket = null;
      connectWebSocket( setQueue, setCurrentSongTimestamp, setCurrentSong, setClosedWhy);
    }
    console.log('onclose', Date.now(), e)
    console.log('WebSocket connection closed');
  };
};

function ping() {
  try {
    const request = {
      action: '__ping__'
    };
    socket.send(JSON.stringify(request));
    console.log('Ping sent')
    tm = setTimeout(function () { }, 5000);

    refQueue()
  } catch (err) {
    console.log('PING ERROR')
  }

}

function pong() {
  clearTimeout(tm);
}

const handleClose = async () => {
    console.log('CLOSING')
    try {
        const request = {
          action: 'leaveroom', 
          data: { key: `${roomId}` } 
      };
      console.log(request)
      await socket.send(JSON.stringify(request));
      socket.close();
    } catch (err) {
      console.log('ERR')
    }
    
};

const Home = (props) => {
  let room_param = useParams();
  roomId = room_param.roomId
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [file, setFile] = useState(false);
  const [queue, setQueue] = useState([]);
  const [currentSong, setCurrentSong] = useState(null)
  const [firstRender, setFirstRender] = useState(true)
  const [currentSongTimestamp, setCurrentSongTimestamp] = useState(null)
  const [closedWhy, setClosedWhy] = useState(false)
  const [fileOnTheFly, setFileOnTheFly] = useState(false)
 
  const URL_ROOM = `https://2bwumm67ac.execute-api.us-east-1.amazonaws.com/dev/rooms/${roomId}`;

  console.log('ID?', roomId)

  window.addEventListener("beforeunload", async (ev) => {  
    console.log('something closed eventlistener',ev)
    pong()
    await handleClose(roomId)
  });

  window.addEventListener('popstate', async (event) => {
    console.log('Going back to home',event)
    pong()
    await handleClose(roomId)
  });

  const getRoomData = async () => {
    try {
      const response = await axios.get(URL_ROOM);
      console.log(response.data);
      setRoom(response.data[0]);
    } catch (err) {
      console.error("ERROR", err);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    const file = event.target.files[0];
  };

  const handleUpload = () => {
    if (file) {
      Presigned(file, roomId);
    }
  };  

  refRoom = setRoom
  refQueue = getRoomData

  useEffect(() => {
    console.log('roomId', roomId)
    if (props.loggedIn === false) {
      handleClose(roomId);
      pong()
      return navigate(`/login`, { replace: true })
    }
    else {
      if  (firstRender === true || closedWhy === true){
        socket = null;
        connectWebSocket( setQueue, setCurrentSongTimestamp, setCurrentSong, setClosedWhy);
        setClosedWhy(false)
      }
    }
    setRoom(null)
    getRoomData();
    
    return () => {
      if (firstRender === true){
        setFirstRender(false)
      }
      else {
        console.log('Unmounting', roomId, props)
        try{
          handleClose(roomId)
          pong()
        } catch(err) {
          console.log(err)
        }
      }        
    };
  }, [props, closedWhy, currentSong]);
  //startTime={startTime}
  return (
    <div>
      <div className="Logo">
        <p>Musifyre</p>
      </div>
      <br></br>
      <div className="Rooms-space">
        {room != null && (
          <div>
            <img
              src={room.current}
              id={room.id}
              alt={room.name}
              border="0"
              width="250"
              height="250"
              style={{ borderRadius: "50%" }}
            />
            <p>{room.name}</p>
          </div>
        )}
      </div>
      { fileOnTheFly &&
        <Alert variant="success" className="sucessAlert">
          <Alert.Heading>Waiting for file to be processsed</Alert.Heading>    
        </Alert>
      }
      {
        currentSong !== null && (
        <div>
          <SongPlayer url={currentSong} startingSecond={currentSongTimestamp}/>
          
        </div>)
      }
      <h2>File Upload</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <div className="Roomns-spaces">
        {queue.length > 0 &&
          queue.map((item) => (
            <div key={item['M'].key['S']}>
              <p>{item['M'].name['S']}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;