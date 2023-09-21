import "./PageNavigation.css"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

export default function PageNavigation(props) {

    const {
        usersLength,
        usersPerPage,
        currentPage,
        setCurrentPage,
        allUsers,
        setAllUsers,
        selectedUsers,
        setSelectedUsers
    } = props

    const totalPages = Math.ceil(usersLength / usersPerPage);
    const firstPage = 1;
    const lastPage = totalPages;

    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const deleteMultipleUsers = (allUsers, setAllUsers, selectedUsers, setSelectedUsers) => {
        const updatedUsers = allUsers.filter(user => !selectedUsers.includes(user.id));

        setAllUsers(updatedUsers);
        setSelectedUsers([]);
    }

    if (!usersLength) {
        return <div></div>
    }

    return (
        <div className="pageNavigation">
            <button
                className="deleteSelected"
                onClick={() => deleteMultipleUsers(allUsers, setAllUsers, selectedUsers, setSelectedUsers)}
            >
                Delete Selected
            </button>

            <div className="navigationButtons">
                <button
                    className={currentPage > firstPage ? 'otherButton' : 'disabledButton'}
                    onClick={() => setCurrentPage(firstPage)}
                    disabled={currentPage > firstPage ? false : true}
                >
                    <KeyboardDoubleArrowLeftIcon />
                </button>

                <button
                    className={currentPage > firstPage ? 'otherButton' : 'disabledButton'}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage > firstPage ? false : true}
                >
                    <KeyboardArrowLeftIcon />
                </button>

                {pageNumbers.map((number) => {
                    return (
                        <button
                            key={number}
                            onClick={() => setCurrentPage(number)}
                            className={number === currentPage ? 'selectedButton' : 'otherButton'}
                            disabled={number === currentPage ? true : false}
                        >{number}</button>
                    )
                })}

                <button
                    className={currentPage < totalPages ? 'otherButton' : 'disabledButton'}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage < totalPages ? false : true}
                >
                    <KeyboardArrowRightIcon />
                </button>

                <button
                    className={currentPage < totalPages ? 'otherButton' : 'disabledButton'}
                    onClick={() => setCurrentPage(lastPage)}
                    disabled={currentPage < totalPages ? false : true}
                >
                    <KeyboardDoubleArrowRightIcon />
                </button>
            </div>
        </div>
    )
}