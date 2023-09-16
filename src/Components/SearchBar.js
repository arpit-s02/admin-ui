import "./SearchBar.css";

export default function SearchBar({ searchValue, setSearchValue, setCurrentPage }) {

    const firstPage = 1;

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