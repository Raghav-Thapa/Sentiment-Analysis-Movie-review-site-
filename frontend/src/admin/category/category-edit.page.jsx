import { Container, Breadcrumb, Card, Row, Col, Form, Button } from "react-bootstrap"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { FaArrowLeft, FaMinus, FaPaperPlane, FaPlus, FaRedo } from "react-icons/fa";
import { useFormik } from "formik";
import category from "."
import * as Yup from "yup"
import { toast } from "react-toastify";
import { useEffect, useState, useCallback } from "react";
import Select from 'react-select'


const CategoryEditForm = () => {
    const navigate = useNavigate();
    const [detail, setDetail] = useState()
    const params = useParams()


    const [cats, setCats] = useState()

    const getAllCats = useCallback(async () => {
        try {
            let listCats = await category.categorySvc.listAllCategorys(100, 1)
            setCats(listCats.result)
        } catch (exception) {
            // 
        }
    }, [])


    useEffect(() => {
        getAllCats()
    }, [])


    const validationSchema = Yup.object({
        name: Yup.string().required(),
        parent: Yup.string(),
        status: Yup.string()
            .matches(/active|inactive/)
            .required(),
    })

    let formik = useFormik({
        initialValues: {
            name: "",
            parent: "",
            status: "",
        },
        validationSchema: validationSchema,

        onSubmit: async (values) => {
            try {
                const response = await category.categorySvc.updateCategory(values, params.id)
                toast.success(response.msg)
                navigate('/admin/category')
            } catch (error) {
                toast.error("Cannot create category. Retry again after reloading the page...")
            }
        }
    })

    const getCategoryDetail = async () => {
        try {
            let response = await category.categorySvc.getCategoryById(params.id)

            setDetail(response.result);
        } catch (exception) {
            toast.error("Category Cannot be fetched at this moment")
            navigate('/admin/category')
        }
    }

    useEffect(() => {
        if (detail) {
            formik.setValues({
                name: detail.name,
                parent: detail.parent?._id,
                status: detail.status,
            })
        }
    },
        [detail])

    useEffect(() => {
        getCategoryDetail()
    }, [])


    return (
        <>
            <Container fluid className="px-4">

                <Row>
                    <Col sm={12} md={6}>
                        <h1 className="mt-4">
                            Category Edit Page
                        </h1>
                    </Col>
                    <Col md={6} sm={12} className="d-none d-md-block">
                        <NavLink className={"btn btn-sm btn-success mt-5 float-end"} to="/admin/category">
                            <FaArrowLeft />Go To List
                        </NavLink>
                    </Col>
                </Row>

                <Breadcrumb className="mb-4">
                    <Breadcrumb.Item>
                        <NavLink to="/admin">Dashboard</NavLink>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item>
                        <NavLink to="/admin/category">Category Listing</NavLink>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item active>Category Edit</Breadcrumb.Item>
                </Breadcrumb>

                <Card className="mb-4">
                    <Card.Body>
                        <Form onSubmit={formik.handleSubmit}>
                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Name:</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        placeholder="Enter Category title..."
                                        required
                                        onChange={formik.handleChange}
                                        value={formik.values?.name}
                                        size="sm" />
                                    <span className="text-danger">{formik.errors?.title}</span>
                                </Col>
                            </Form.Group>

                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Status:</Form.Label>
                                <Col sm={9}>
                                    <Form.Select
                                        name="status"
                                        required
                                        onChange={formik.handleChange}
                                        value={formik.values?.status}
                                        size="sm">

                                        <option>--Select any one</option>
                                        <option value={'active'}>Publish</option>
                                        <option value={'inactive'}>Un-Publish</option>

                                    </Form.Select>
                                    <span className="text-danger">{formik.errors?.status}</span>
                                </Col>
                            </Form.Group>


                            <Form.Group className="row mb-3">
                                <Col sm={{ offset: 3, span: 9 }}>
                                    <Button variant="success" type="submit" size="sm" className="me-4">
                                        <FaPaperPlane />Submit
                                    </Button>
                                    <Button variant="danger" type="reset" size="sm">
                                        <FaRedo />Cancel
                                    </Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>

        </>
    )
}

export default CategoryEditForm