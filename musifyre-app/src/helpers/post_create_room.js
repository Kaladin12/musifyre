import axios from "axios";

const PostCreateRoom = async (name) => {
    const CREATE_ROOM_URL = 'https://3qdiu2w7k9.execute-api.us-east-1.amazonaws.com/dev1_0/rooms/create-rooms'
    const body = {
        name: name,
    };

    try {
        const response = await axios.post(CREATE_ROOM_URL, { name: name });

        console.log(response.data);
        return response.data.room
    } catch (error) {
        console.error("Error creating room:", error);
        return null
    }
}

export default PostCreateRoom;