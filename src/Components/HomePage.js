import { useEffect, useState } from "react"
import { config } from '../config'
import axios from "axios";
import SearchBar from "./SearchBar";
import UsersTable from "./UsersTable";
import PageAction from "./PageAction";
import "./HomePage.css"

export default function HomePage() {
    const [allUsers, setAllUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoading] = useState(true);
    const usersPerPage = 10;

    const fetchUsers = async (url) => {
        try {
            const response = await axios.get(url);

            return response.data;
        } catch (error) {
            if (error.response) {

                return [];
            }
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        (async () => {
            const data = await fetchUsers(config.endpoint);

            const users = data.map((item) => {
                return {
                    ...item,
                    checked: false,
                    isEditing: false
                }
            });

            setAllUsers(users);
        })()
    }, []);

    const handleSearch = (allUsers, searchValue) => {

        if (searchValue === "") {
            return allUsers;
        }

        const filteredUsers = allUsers.filter((user) => (
            user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
            user.role.toLowerCase().includes(searchValue.toLowerCase())

        ));

        return filteredUsers;
    }

    const searchedUsers = handleSearch(allUsers, searchValue);

    const getUsersToBeDisplayed = (searchedUsers, currentPage, usersPerPage) => {

        if (!searchedUsers.length) {
            return [];
        }

        const userEndIndex = currentPage * usersPerPage;
        const userStartIndex = userEndIndex - usersPerPage;

        const usersToBeDisplayed = searchedUsers.slice(userStartIndex, userEndIndex);

        return usersToBeDisplayed;
    }

    const usersToBeDisplayed = getUsersToBeDisplayed(searchedUsers, currentPage, usersPerPage);

    if (loading) {
        return (
            <div className="homepage">
                <SearchBar
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    setCurrentPage={setCurrentPage}
                />

                <div style={{ margin: '1rem' }}>Loading Users...</div>
            </div>
        )
    }

    return (
        <div className="homepage">
            <SearchBar
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                setCurrentPage={setCurrentPage}
            />

            <UsersTable
                usersToBeDisplayed={usersToBeDisplayed}
                usersPerPage={usersPerPage}
                allUsers={allUsers}
                setAllUsers={setAllUsers}
            />

            <PageAction
                usersLength={searchedUsers.length}
                usersPerPage={usersPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                allUsers={allUsers}
                setAllUsers={setAllUsers}
            />
        </div>
    )
}