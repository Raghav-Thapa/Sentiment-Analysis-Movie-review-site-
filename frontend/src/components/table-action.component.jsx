import { Button } from "react-bootstrap"
import { FaEdit, FaTrash } from "react-icons/fa"
import { NavLink } from "react-router-dom"
import Swal from 'sweetalert2'

export const TableActionButtons = ({editurl, id, deleteAction}) =>{
    const handleDeleteClickAction = (e) =>{
        e.preventDefault()
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
             deleteAction(id);
            }
          })

    }
    return(<>
        <NavLink to={editurl} className={"btn btn-sm btn-success me-1"}>
        <FaEdit></FaEdit>
        </NavLink>
    <Button onClick={handleDeleteClickAction} variant="danger" type="button" size="sm">
        <FaTrash></FaTrash>
    </Button>
    </>)
}