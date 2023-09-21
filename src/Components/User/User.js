import { useState } from "react";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DoneIcon from '@mui/icons-material/Done';

export default function User(props) {

    const { user, allUsers, setAllUsers, selectedUsers, setSelectedUsers } = props;

    const checked = selectedUsers.includes(user.id);
    const [editing, setEditing] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: user.name,
        email: user.email,
        role: user.role
    });

    const changeUserInfo = (key, value) => {
        setUserInfo({
            ...userInfo,
            [key]: value
        });
    }

    const saveUserInfo = (allUsers, setAllUsers, userId) => {
        const users = allUsers.map((item) => {
            if (item.id === userId) {
                return {
                    ...item,
                    name: userInfo.name,
                    email: userInfo.email,
                    role: userInfo.role,
                }
            }
            else {
                return item
            }
        });

        setEditing(false);
        setAllUsers(users);
    }

    const deleteUser = (allUsers, setAllUsers, userId) => {
        const users = allUsers.filter(item => item.id !== userId);
        setAllUsers(users);
    }

    const ToggleSelect = (selectedUsers, setSelectedUsers, userId) => {
        if (checked) {
            const updatedSelectedUsers = selectedUsers.filter((id) => id !== userId);
            setSelectedUsers(updatedSelectedUsers);
        }
        else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    }

    return (
        <tr>
            <td>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => {
                        ToggleSelect(selectedUsers, setSelectedUsers, user.id);
                    }}
                />
            </td>
            {editing ? (
                <>
                    <td>
                        <input
                            className="userInput"
                            type="text"
                            name="name"
                            value={userInfo.name}
                            onChange={(e) => {
                                changeUserInfo('name', e.target.value);
                            }}
                        />
                    </td>
                    <td>
                        <input
                            className="userInput"
                            type="email"
                            name="email"
                            value={userInfo.email}
                            onChange={(e) => {
                                changeUserInfo('email', e.target.value);
                            }}
                        />
                    </td>
                    <td>
                        <input
                            className="userInput"
                            type="text"
                            name="role"
                            value={userInfo.role}
                            onChange={(e) => {
                                changeUserInfo('role', e.target.value);
                            }}
                        />
                    </td>
                </>
            ) : (
                <>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                </>
            )}
            <td>
                {editing ? (
                    <DoneIcon
                        sx={{ mr: 1, cursor: 'pointer', color: 'green' }}
                        onClick={() => saveUserInfo(allUsers, setAllUsers, user.id)}
                    />
                ) : (
                    <EditNoteOutlinedIcon
                        sx={{ mr: 1, cursor: 'pointer' }}
                        onClick={() => setEditing(true)}
                    />
                )}
                <DeleteOutlineOutlinedIcon
                    sx={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => deleteUser(allUsers, setAllUsers, user.id)}
                />
            </td>
        </tr>
    )
}