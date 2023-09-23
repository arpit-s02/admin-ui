import { useState } from "react";
import UserDetail from "../UserDetail/UserDetail";
import EditUser from "../EditUser/EditUser";
import "./UserItem.css"

export default function UserItem(props) {

    const { user, allUsers, setAllUsers, selectedUsers, setSelectedUsers } = props;

    const [editing, setEditing] = useState(false);
    const checked = selectedUsers.includes(user.id);

    const deleteUser = (allUsers, setAllUsers, userId) => {
        // remove the user from allUsers
        const users = allUsers.filter(item => item.id !== userId);
        setAllUsers(users);
    }

    const toggleSelect = (selectedUsers, setSelectedUsers, checked, userId) => {
        if (checked) {
            // if user item is selected, remove its id from selectedUsers
            const updatedSelectedUsers = selectedUsers.filter((id) => id !== userId);
            setSelectedUsers(updatedSelectedUsers);
        }
        else {
            // if user item is not selected, add its id to selectedUsers
            setSelectedUsers([...selectedUsers, userId]);
        }
    }

    return (
        <tr className={checked ? 'selectedRow' : 'userItem'}>
            <td>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => {
                        toggleSelect(selectedUsers, setSelectedUsers, checked, user.id);
                    }}
                />
            </td>
            {editing ? (
                <EditUser
                    user={user}
                    allUsers={allUsers}
                    setAllUsers={setAllUsers}
                    setEditing={setEditing}
                    deleteUser={() => deleteUser(allUsers, setAllUsers, user.id)}
                />
            ) : (
                <UserDetail
                    user={user}
                    setEditing={setEditing}
                    deleteUser={() => deleteUser(allUsers, setAllUsers, user.id)}
                />

            )}
        </tr>
    )
}