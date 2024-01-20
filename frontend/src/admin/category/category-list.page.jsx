import { Container, Breadcrumb, Card, Col, Row } from "react-bootstrap"
import { FaPlus } from "react-icons/fa"
import { NavLink } from "react-router-dom"
import DataTable from 'react-data-table-component';
import { useCallback, useEffect, useState } from "react";
import customStyles from "../../assets/css/table";
import { toast } from "react-toastify";
import category from ".";
import { TableActionButtons } from "../../components/table-action.component";

const CategoryListPage = () => {

   const handleDelete = async (id) => {
        try{
            let response = await category.categorySvc.deleteCategoryById(id);
            if (response.status){
                toast.success(response.msg)
                await loadCategory()
            }
        }catch(exception){
            toast.error("Error deleting category")
        }
   }

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
        },
        {
            name: 'Action',
            selector: row => <TableActionButtons
            editurl ={"/admin/category/"+row._id}
            id= {row._id}
            deleteAction ={handleDelete}
            />
        },
    ];

    let [categoryList, setCategoryList] = useState();

    let[pagination, setPagination] = useState({
        currentPage:1,
        perPage:10,
        totalNoOfRows:0
    })
    let [loading, setLoading] = useState(true)

    const loadCategory = useCallback(async (perPage=10, page=1) => {
        
        try {
            let response = await category.categorySvc.listAllCategorys(perPage, page);
            if (response.status) {
                setCategoryList(response.result)
                setPagination(response.meta)

            }
        } catch (exception) {
            console.log("category fetch exception", exception)
            toast.error("error fetching category")
        }finally{
            setLoading(false)
        }
    }, []);

    const handlePageChange = page => {
		loadCategory(pagination.perPage, page)
	};

    const handlePerRowsChange = (perPage, page) => {
        loadCategory(perPage, page)
    }

    useEffect(() => {
        loadCategory()
    }, [])

    return (<>
        <Container fluid className="px-4">
            <Row>
                <Col sm={6}><h1 className="mt-4">Category List</h1></Col>
                <Col sm={6} className="mt-5">
                    <NavLink to="/admin/category/create" className={"btn btn-sm btn-success float-end"}>
                        <FaPlus /> Add Category</NavLink>
                </Col>
            </Row>

            <Breadcrumb className="mb-4">

                <Breadcrumb.Item>
                    <NavLink to={"/admin"}>Dashboard</NavLink>
                </Breadcrumb.Item>

                <Breadcrumb.Item active>Category List
                </Breadcrumb.Item>
            </Breadcrumb>


            <Card className="mb-4">
                <Card.Header>
                    <h4>Category List</h4>
                </Card.Header>
                <Card.Body>

                    <DataTable
                        columns={columns}
                        data={categoryList}
                        pagination
                        progressPending={loading}
                        dense
                        customStyles={customStyles}
                        paginationServer
                        paginationTotalRows={pagination.totalNoOfRows}
                        onChangeRowsPerPage={handlePerRowsChange}
                        onChangePage={handlePageChange} 
                        />

                    <table></table>
                </Card.Body>
            </Card>
        </Container>
    </>)
}

export default CategoryListPage