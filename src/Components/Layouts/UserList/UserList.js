import TableHeader from "../TableHeader/TableHeader";
import TableBody from "../TableBody/TableBody";
import "./UserList.css";

export default function UserList(props) {
    const {
        usersOnCurrentPage,
        allUsers,
        setAllUsers,
        selectedUsers,
        setSelectedUsers
    } = props

    if (!usersOnCurrentPage.length) {
        return (
            <div style={{ margin: '1rem' }}>Couldn't find any user!</div>
        )
    }

    return (
        <div className="userList">
            <table>
                <TableHeader
                    usersOnCurrentPage={usersOnCurrentPage}
                    selectedUsers={selectedUsers}
                    setSelectedUsers={setSelectedUsers}
                />

                <TableBody
                    usersOnCurrentPage={usersOnCurrentPage}
                    allUsers={allUsers}
                    setAllUsers={setAllUsers}
                    selectedUsers={selectedUsers}
                    setSelectedUsers={setSelectedUsers}
                />
            </table>
        </div>
    )
}