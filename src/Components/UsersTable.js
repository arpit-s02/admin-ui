import "./UsersTable.css";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DoneIcon from '@mui/icons-material/Done';

export default function usersTable(props) {

    const { usersToBeDisplayed, allUsers, setAllUsers } = props

    const markUserAsChecked = (allUsers, setAllUsers, userId) => {
        const users = allUsers.map((item) => {
            if (item.id === userId) {
                return {
                    ...item,
                    checked: !item.checked
                }
            }
            else {
                return item;
            }
        });

        setAllUsers(users);
    }

    const areAllUsersSelected = (users) => {
        if (!users.length) {
            return false;
        }

        for (let i = 0; i < users.length; i++) {
            if (!users[i].checked) {
                return false;
            }
        }

        return true;
    }

    const allUsersSelected = areAllUsersSelected(usersToBeDisplayed);

    const selectAllUsers = (allUsers, setAllUsers, usersToBeDisplayed, allUsersSelected) => {
        const users = allUsers.map((user) => {
            const foundUser = usersToBeDisplayed.find((item) => user.id === item.id);

            if (foundUser) {
                return {
                    ...user,
                    checked: !allUsersSelected
                }
            }
            else {
                return user;
            }
        });

        setAllUsers(users);
    }

    const deleteOneUser = (allUsers, setAllUsers, userId) => {
        const updatedUsers = allUsers.filter(item => item.id !== userId);
        setAllUsers(updatedUsers);
    }

    const makeRowEditable = (allUsers, userId) => {
        const users = allUsers.map((item) => {
            if (item.id === userId) {
                return {
                    ...item,
                    isEditing: !item.isEditing
                }
            }
            else {
                return item;
            }
        });

        setAllUsers(users);
    }

    const editUserInfo = (allUsers, userId, title, value) => {
        const users = allUsers.map((item) => {
            if (item.id === userId) {
                return {
                    ...item,
                    [title]: value
                }
            }
            else {
                return item;
            }
        });

        setAllUsers(users);
    }

    if (!usersToBeDisplayed.length) {
        return (
            <div style={{ margin: '1rem' }}>Couldn't find any user!</div>
        )
    }

    return (
        <table className="usersTable">
            <thead>
                <tr>
                    <td>
                        <input
                            type="checkbox"
                            checked={allUsersSelected}
                            onChange={() => selectAllUsers(allUsers, setAllUsers, usersToBeDisplayed, allUsersSelected)}
                        />
                    </td>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {usersToBeDisplayed.map((user) => {
                    return (
                        <tr
                            key={user.id}
                            className={user.checked ? 'selectedRow' : ''}

                        >
                            <td>
                                <input
                                    type="checkbox"
                                    checked={user.checked}
                                    onChange={() => markUserAsChecked(allUsers, setAllUsers, user.id)}
                                />
                            </td>
                            {user.isEditing ? (
                                <>
                                    <td>
                                        <input
                                            className="userInput"
                                            type="text"
                                            name="name"
                                            value={user.name}
                                            onChange={(e) => { editUserInfo(allUsers, user.id, 'name', e.target.value) }}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="userInput"
                                            type="email"
                                            name="email"
                                            value={user.email}
                                            onChange={(e) => { editUserInfo(allUsers, user.id, 'email', e.target.value) }}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="userInput"
                                            type="text"
                                            name="role"
                                            value={user.role}
                                            onChange={(e) => { editUserInfo(allUsers, user.id, 'role', e.target.value) }}
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
                                {user.isEditing ? (
                                    <DoneIcon
                                        sx={{ mr: 1, cursor: 'pointer', color: 'green' }}
                                        onClick={() => makeRowEditable(allUsers, user.id)}
                                    />
                                ) : (
                                    <EditNoteOutlinedIcon
                                        sx={{ mr: 1, cursor: 'pointer' }}
                                        onClick={() => makeRowEditable(allUsers, user.id)}
                                    />
                                )}
                                <DeleteOutlineOutlinedIcon
                                    sx={{ color: 'red', cursor: 'pointer' }}
                                    onClick={() => deleteOneUser(allUsers, setAllUsers, user.id)}
                                />
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}