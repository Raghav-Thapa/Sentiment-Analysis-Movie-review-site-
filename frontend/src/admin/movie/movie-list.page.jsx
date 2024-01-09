import { Container, Breadcrumb, Card, Row, Col } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";

import DataTable from 'react-data-table-component';

import { useCallback, useEffect, useState } from "react";
import customStyles from "../../assets/css/table";
import { toast } from "react-toastify";
import movie from "./";
import { TableActionButtons } from "../../components/table-action.component";

const MovieListPage = () => {
    const handleDelete = async (id) => {
        try{
            setLoading(true)
            let response = await movie.movieSvc.deleteMovieById(id);
            if(response.status){
                toast.success(response.msg)
                await loadMovies()
            }
        } catch(exception){
            toast.error("Error while deleting Movie")
        }
    }
    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Category',
            selector: row => row.categories ? (row.categories.map((item) => item.name)).join(", ") : "-",
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
        },
        {
            name: 'Action',
            selector: row => <TableActionButtons 
                editurl={"/admin/movie/"+row._id}
                id={row._id}
                deleteAction={handleDelete}
            />,
        },
    ];
    

    let [movieList, setMovieList] = useState();
    let [pagination, setPagination] = useState({
        currentPage:1, 
        perPage:10,
        totalNoOfRows:0
    })
    let [loading, setLoading] = useState(true)


    const loadMovies = useCallback(async(perPage=10, page=1) => {
        try{
            let response = await movie.movieSvc.listAllMovies(perPage, page);
            if(response.status){
                setMovieList(response.result)
                setPagination(response.meta)
            }
        } catch(exception) {
            console.log("Baner Fetch Exception: ", exception)
            toast.error("Error while fetching movie")
        }finally{
            setLoading(false)
        }
    }, []);

    const handlePageChange = page => {
		loadMovies(pagination.perPage, page)
	};

    const handlePerRowsChange = (perPage, page) => {
        loadMovies(perPage, page)
    }

    useEffect(() => {
        loadMovies()
    }, [])

    return (<>
    
    <Container fluid className="px-4">
            <Row>
                <Col sm={6}><h1 className="mt-4">Movie List </h1></Col>
                <Col sm={6} className="mt-5">
                    <NavLink to="/admin/movie/create" className={"btn btn-sm btn-success float-end"}>
                        <FaPlus /> Add Movie
                    </NavLink>
                </Col>
            </Row>
            <Breadcrumb className="mb-4">
                <li className="breadcrumb-item">
                    <Link role="button" className={"breadcrumb-item"} to="/admin">Dashboard</Link>
                </li>
                <Breadcrumb.Item active>Movie List </Breadcrumb.Item>
            </Breadcrumb>

            <Card className="mb-4">
                <Card.Header>
                    <h4>Movie List </h4>
                </Card.Header>
                <Card.Body>
                    <DataTable
                        columns={columns}
                        data={movieList}
                        pagination
                        progressPending={loading}
                        dense
                        customStyles={customStyles}
                        paginationServer
                        paginationTotalRows={pagination.totalNoOfRows}
                        onChangeRowsPerPage={handlePerRowsChange}
                        onChangePage={handlePageChange}
                    />

                </Card.Body>
            </Card>
        </Container>
    </>)
}

export default MovieListPage;