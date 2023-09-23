import { useEffect, useState } from "react"
import { config } from '../../../config'
import axios from "axios";
import SearchBar from "../../Layouts/SearchBar/SearchBar";
import UserList from "../../Layouts/UserList/UserList";
import ControlPanel from "../../Layouts/ControlPanel/ControlPanel";
import "./HomePage.css"

export default function HomePage() {
    const [allUsers, setAllUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const usersPerPage = 10;

    const fetchUsers = async (url) => {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            return [];
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        (async () => {
            const data = await fetchUsers(config.endpoint);
            setAllUsers(data);
            setFilteredUsers(data);
        })();
    }, []);

    const getUsersOnCurrentPage = (filteredUsers, currentPage, usersPerPage) => {

        if (!filteredUsers.length) {
            return [];
        }

        // calculate start and end index of users to be displayed on current page
        const userEndIndex = currentPage * usersPerPage;
        const userStartIndex = userEndIndex - usersPerPage;

        const usersOnCurrentPage = filteredUsers.slice(userStartIndex, userEndIndex);

        return usersOnCurrentPage;
    }

    const usersOnCurrentPage = getUsersOnCurrentPage(filteredUsers, currentPage, usersPerPage);

    if (loading) {
        return (
            <div className="homepage">
                <SearchBar
                    setCurrentPage={setCurrentPage}
                    allUsers={allUsers}
                    setFilteredUsers={setFilteredUsers}
                />

                <div style={{ margin: '1rem' }}>Loading Users...</div>
            </div>
        )
    }

    return (
        <div className="homepage">
            <SearchBar
                setCurrentPage={setCurrentPage}
                allUsers={allUsers}
                setFilteredUsers={setFilteredUsers}
            />

            <UserList
                usersOnCurrentPage={usersOnCurrentPage}
                allUsers={allUsers}
                setAllUsers={setAllUsers}
                selectedUsers={selectedUsers}
                setSelectedUsers={setSelectedUsers}
            />

            <ControlPanel
                usersLength={filteredUsers.length}
                usersPerPage={usersPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                allUsers={allUsers}
                setAllUsers={setAllUsers}
                selectedUsers={selectedUsers}
                setSelectedUsers={setSelectedUsers}
            />
        </div>
    )
}