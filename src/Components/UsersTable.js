import "./UsersTable.css";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';

export default function usersTable({ usersToBeDisplayed, usersPerPage, allUsers, setAllUsers }) {

    const markUserAsChecked = (allUsers, setAllUsers, userId) => {
        const users = [...allUsers];

        const userIndex = users.findIndex((user) => user.id === userId);

        users[userIndex].checked = !users[userIndex].checked;

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
                        <tr key={user.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={user.checked}
                                    onChange={() => markUserAsChecked(allUsers, setAllUsers, user.id)}
                                />
                            </td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <EditNoteOutlinedIcon sx={{ mr: 1, cursor: 'pointer' }} />
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