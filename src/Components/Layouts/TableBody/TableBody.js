import UserItem from "../UserItem/UserItem";

export default function TableBody(props) {

    const { usersOnCurrentPage, allUsers, setAllUsers, selectedUsers, setSelectedUsers } = props;

    return (
        <tbody>
            {usersOnCurrentPage.map((item) => {
                return (
                    <UserItem
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
    );
}