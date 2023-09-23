import Pagination from "../Pagination/Pagination";
import "./ControlPanel.css";

export default function ControlPanel(props) {

    const {
        usersLength,
        usersPerPage,
        currentPage,
        setCurrentPage,
        allUsers,
        setAllUsers,
        selectedUsers,
        setSelectedUsers
    } = props;

    const deleteSelectedUsers = (allUsers, setAllUsers, selectedUsers, setSelectedUsers) => {
        // remove those users from allUsers, whose id is present in selectedUsers
        const updatedUsers = allUsers.filter(user => !selectedUsers.includes(user.id));

        setAllUsers(updatedUsers);
        setSelectedUsers([]);
    }

    if (!usersLength) {
        return <div></div>
    }

    return (
        <div className="controlPanel">

            <button
                className="deleteSelected"
                onClick={() => deleteSelectedUsers(allUsers, setAllUsers, selectedUsers, setSelectedUsers)}
            >
                Delete Selected
            </button>

            <Pagination
                usersLength={usersLength}
                usersPerPage={usersPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    )
}