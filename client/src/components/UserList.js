import * as React from 'react';
import {User} from "./User";

export const UserList = ({ users }) => {
    return (
        <>
            <div className="py-3 text-sm">
                {users.map(user => <User key={user.id} user={user} />)}
            </div>
        </>
    );
};