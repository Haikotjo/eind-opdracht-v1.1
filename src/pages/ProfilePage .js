import React, {useContext} from 'react';
import {AuthContext} from "../context/AuthContext";

function Profile() {

    const { user: { email, id, username} } = useContext(AuthContext);

    return (
        <main>
            <h1>Profile</h1>
            <p>Welcome <span>{ email } </span></p>
            <p>Your ID is: <span>{ id }</span></p>
            <p>Your name is: <span>{ username }</span></p>

        </main>
    );
}

export default Profile;