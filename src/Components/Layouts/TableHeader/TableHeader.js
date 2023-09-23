import "./TableHeader.css"

export default function TableHeader(props) {

    const { usersOnCurrentPage, selectedUsers, setSelectedUsers } = props;

    const deSelectAllDisplayedUsers = (selectedUsers, setSelectedUsers, usersOnCurrentPage) => {
        // remove the ids of all the displayed users from selectedUsers
        const filteredList = selectedUsers.filter((id) => (
            !usersOnCurrentPage.find((item) => item.id === id)
        ));

        setSelectedUsers(filteredList);
    }

    const selectAllDisplayedUsers = (selectedUsers, setSelectedUsers, usersOnCurrentPage) => {
        const addedUsers = [];

        // add the ids of the not selected displayed users to addedUsers
        usersOnCurrentPage.forEach(item => {
            if (!selectedUsers.includes(item.id)) {
                addedUsers.push(item.id);
            }
        });

        // add ids in the added users to selectedUsers
        setSelectedUsers([...selectedUsers, ...addedUsers]);
    }

    const toggleSelectAllButton = (usersOnCurrentPage, selectedUsers, setSelectedUsers, allSelected) => {
        if (allSelected) {
            deSelectAllDisplayedUsers(selectedUsers, setSelectedUsers, usersOnCurrentPage);
        }
        else {
            selectAllDisplayedUsers(selectedUsers, setSelectedUsers, usersOnCurrentPage);
        }
    }

    const checkAllSelected = (usersOnCurrentPage, selectedUsers) => {
        // check whether ids of all the displayed users are present in selectedUsers
        for (let i = 0; i < usersOnCurrentPage.length; i++) {
            const id = usersOnCurrentPage[i].id;
            if (!selectedUsers.includes(id)) {
                return false;
            }
        }

        return true;
    }

    const allSelected = checkAllSelected(usersOnCurrentPage, selectedUsers);

    return (
        <thead className="tableHeader">
            <tr>
                <td>
                    <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={() => {
                            toggleSelectAllButton(usersOnCurrentPage, selectedUsers, setSelectedUsers, allSelected);
                        }}
                    />
                </td>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
            </tr>
        </thead>
    );
}