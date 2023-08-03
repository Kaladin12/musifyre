import React, {useState} from "react";
import '../App.css'

import Presigned from "../helpers/s3_presigned";

// Placeholder para la pagina de Home
const Home = (props) => {
    const [file, setFile] = useState(false)

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (file) {
          Presigned(file)
        }
      };

    return (
        <div>
            <div className="Logo">
                <p>Musifyre</p>
            </div>
            <div className="Login-space">
                <p>YOU ARE LOGGED IN!!!!</p>

                <h2>File Upload</h2>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload</button>
            </div>
        </div>
    )
}

export default Home;