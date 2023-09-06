import { Delete } from "@mui/icons-material"
import { IconButton } from "@mui/material"

const DeleteButton = ({callback}: any) => {
    return (
    <IconButton aria-label="add to favorites" onClick={callback}>
        <Delete />
    </IconButton>)
}

export default DeleteButton