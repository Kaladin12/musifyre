import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import ButtonLink from "./Button_link";
import "../App.css";
import axios from "axios";

//const ur = "https://musifyre-transformed.s3.amazonaws.com/f74bb82c-f6d8-11ed-90e1-00155da71374/1684744837933/07%C2%B5-ziq-MyLittleBeautiful.m3u8"

const Home = (props) => {
  const navigate = useNavigate();
  const size = 5;
  const [rooms, setRooms] = useState([]);
  const [last, setLastKey] = useState(null);
  const [previous, setPrevious] = useState([])
  const getRooms = async (first=true, to_the_right = true) => {
    console.log("GETTING ROOMS with", size, last);
    let URL = `https://2bwumm67ac.execute-api.us-east-1.amazonaws.com/dev/rooms?size=${size}`;
    if ( first === false && last !== null) {
      URL += `&last=${last}`;
    }
    console.log("USING URL ", URL);
    try {
      const response = await axios.get(URL);
      console.log(response.data.items);
      if (first) {
        setRooms(response.data.items);
        setLastKey(null)
      } else {
        if (to_the_right === true) {
          setPrevious(rooms)
        }
        
        setRooms((prevRooms) =>
        to_the_right ? response.data.items : previous
        );
      }
      if ("last" in response.data) {
        console.log('LAST', response.data.last.id)
        setLastKey(response.data.last.id);
      }
    } catch (err) {
      console.error("ERROR", err);
    }
  };

  const handleClick = (event) => {
    console.log('clicked', event.target.id)
    props.onRoomSelection(event.target.id)
  }

  const handleNewRoom = () => {
    
  }

  useEffect(() => {
    console.log(props)
    if (props.loggedIn === false) {
      navigate(`/login`, { replace: true })
    }
    getRooms()
  }, []);

  return (
    <div>
      <div className="Logo">
        <p>Musifyre</p>
      </div>
      <br></br>
      <div className="Rooms-space">
        {rooms !== [] &&
          rooms.map((item) => (
            <div key={item.id} >
              <ButtonLink to="/room" onClick={handleClick} className="cover" roomId={item.id}>
                <img src={item.current} id={item.id} alt={item.name} border="0" width="250" height="250" style={{"borderRadius": "50%"}}/>
              </ButtonLink>

              <p>{item.name}</p>
            </div>
          ))}
      </div>
      <ButtonLink to="/create-room" onClick={handleNewRoom} id="Create" className="but">
          Create New Room
      </ButtonLink>
      {last && (
        <div>
          <button onClick={() => getRooms(true, false)}>Previous</button>
          <button onClick={() => getRooms(false, true)}>Next</button>
        </div>
      )}
    </div>
  );
};

export default Home;