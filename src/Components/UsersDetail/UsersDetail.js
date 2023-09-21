import User from "../User/User";
import "./UsersDetail.css";

export default function usersTable(props) {
    const {
        usersToBeDisplayed,
        allUsers,
        setAllUsers,
        selectedUsers,
        setSelectedUsers
    } = props

    const checkAllSelected = (usersToBeDisplayed, selectedUsers) => {
        for (let i = 0; i < usersToBeDisplayed.length; i++) {
            const id = usersToBeDisplayed[i].id;
            if (!selectedUsers.includes(id)) {
                return false;
            }
        }

        return true;
    }

    const allSelected = checkAllSelected(usersToBeDisplayed, selectedUsers);

    const selectAllUsers = (usersToBeDisplayed, selectedUsers, setSelectedUsers, allSelected) => {
        if (allSelected) {
            const filteredList = selectedUsers.filter((id) => (
                !usersToBeDisplayed.find((item) => item.id === id)
            ));
            setSelectedUsers(filteredList);
        }
        else {
            const addedUsers = [];

            usersToBeDisplayed.forEach(item => {
                if (!selectedUsers.includes(item.id)) {
                    addedUsers.push(item.id);
                }
            });

            setSelectedUsers([...selectedUsers, ...addedUsers]);
        }
    }

    if (!usersToBeDisplayed.length) {
        return (
            <div style={{ margin: '1rem' }}>Couldn't find any user!</div>
        )
    }

    return (
        <div className="usersDetail">
            <table>
                <thead>
                    <tr>
                        <td>
                            <input
                                type="checkbox"
                                checked={allSelected}
                                onChange={() => selectAllUsers(usersToBeDisplayed, selectedUsers, setSelectedUsers, allSelected)}
                            />
                        </td>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {usersToBeDisplayed.map((item) => {
                        return (

                            <User
                                key={item.id}
                                user={item}
                                allUsers={allUsers}
                                setAllUsers={setAllUsers}
                                selectedUsers={selectedUsers}
                                setSelectedUsers={setSelectedUsers}
                            />

                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}