import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


export default function UserDetail(props) {

    const { user, setEditing, deleteUser } = props;

    return (
        <>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
                <EditNoteOutlinedIcon
                    sx={{ mr: 1, cursor: 'pointer' }}
                    onClick={() => setEditing(true)}
                />

                <DeleteOutlineOutlinedIcon
                    sx={{ color: 'red', cursor: 'pointer' }}
                    onClick={deleteUser}
                />
            </td>
        </>
    );
}