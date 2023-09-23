import DoneIcon from '@mui/icons-material/Done';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useState } from 'react';
import "./EditUser.css"

export default function EditUser(props) {

    const { user, allUsers, setAllUsers, setEditing, deleteUser } = props;

    const [userInfo, setUserInfo] = useState({
        name: user.name,
        email: user.email,
        role: user.role
    });

    const EditUserInfo = (key, value, userInfo, setUserInfo) => {
        setUserInfo({
            ...userInfo,
            [key]: value
        });
    }

    const saveUserInfo = (allUsers, setAllUsers, setEditing, userInfo, userId) => {
        // update name, email and role of the user in allUsers
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
                return item;
            }
        });

        setEditing(false);
        setAllUsers(users);
    }

    return (
        <>
            <td>
                <input
                    className="userInput"
                    type="text"
                    name="name"
                    value={userInfo.name}
                    onChange={(e) => {
                        EditUserInfo('name', e.target.value, userInfo, setUserInfo);
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
                        EditUserInfo('email', e.target.value, userInfo, setUserInfo);
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
                        EditUserInfo('role', e.target.value, userInfo, setUserInfo);
                    }}
                />
            </td>
            <td>
                <DoneIcon
                    sx={{ mr: 1, cursor: 'pointer', color: 'green' }}
                    onClick={() => {
                        saveUserInfo(allUsers, setAllUsers, setEditing, userInfo, user.id);
                    }}
                />
                <DeleteOutlineOutlinedIcon
                    sx={{ color: 'red', cursor: 'pointer' }}
                    onClick={deleteUser}
                />

            </td>
        </>
    );
}