import { useState, useEffect } from "react";
import "./SearchBar.css";

export default function SearchBar(props) {

    const { allUsers, setCurrentPage, setFilteredUsers } = props;

    const [searchValue, setSearchValue] = useState("");
    const firstPage = 1;

    const handleSearch = (allUsers, searchValue) => {
        if (searchValue === "") {
            return allUsers;
        }

        const users = allUsers.filter((user) => (
            user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
            user.role.toLowerCase().includes(searchValue.toLowerCase())

        ));

        return users;
    }

    useEffect(() => {

        const users = handleSearch(allUsers, searchValue);

        setFilteredUsers(users);

    }, [searchValue, allUsers]);

    return (
        <input
            className="searchBar"
            placeholder="Search by name, email, or role"
            value={searchValue}
            onChange={(e) => {
                setSearchValue(e.target.value);
                setCurrentPage(firstPage);
            }}
        />
    )
}