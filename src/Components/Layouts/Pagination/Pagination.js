import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import "./Pagination.css"

export default function Pagination(props) {

    const { usersLength, usersPerPage, currentPage, setCurrentPage } = props;

    const firstPage = 1;
    const lastPage = Math.ceil(usersLength / usersPerPage);

    const pageNumbers = [];

    for (let i = firstPage; i <= lastPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination">

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
                    >
                        {number}
                    </button>
                )
            })}

            <button
                className={currentPage < lastPage ? 'otherButton' : 'disabledButton'}
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage < lastPage ? false : true}
            >
                <KeyboardArrowRightIcon />
            </button>

            <button
                className={currentPage < lastPage ? 'otherButton' : 'disabledButton'}
                onClick={() => setCurrentPage(lastPage)}
                disabled={currentPage < lastPage ? false : true}
            >
                <KeyboardDoubleArrowRightIcon />
            </button>
        </div>
    );
}