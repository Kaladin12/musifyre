import React from "react";
import { Link } from "react-router-dom";

const ButtonLink = ({to, onClick, id, className, children, roomId='null' }) => {
    console.log(roomId)
    if  ( roomId !== 'null') {
        const newTo = `${to}/${roomId}`
        return (
            <Link to={newTo}>
                <button id={id} className={className} type="submit" onClick={onClick}>{children}</button>
            </Link>
        );
    }
    // EL orden de los props importa
    return (
        <Link to={to}>
            <button id={id} className={className} type="submit" onClick={onClick}>{children}</button>
        </Link>
    );
};

export default ButtonLink;