import { Container, Form, Row, Col, Button, InputGroup } from "react-bootstrap"
import { SiGnuprivacyguard } from "react-icons/si"
import "../assets/css/register.css"
import { FaKey } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import userimg from "../assets/images/userimg.png"
import { NavLink, useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import AuthService from "./auth.service"
import { useState } from "react";
import { toast } from "react-toastify";
import Header from "../homepage/header.component";


const RegisterPage = () => {
    const navigate = useNavigate()
    let [loading, setLoading] = useState(false);

    const registerSchema = Yup.object({
        name: Yup.string().min(3).required(),
        email: Yup.string().email().required(),
        role: Yup.string().matches(/seller|customer/).default("customer"),
        password: Yup.string().min(8).max(30).required(),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], "Password and confirm Password does not match"),
        image: Yup.string()
    })

    const formik = useFormik({
        initialValues: {
            name: null,
            email: null,
            role: null,
            password: null,
            confirmPassword: null,
            image: null,
        },
        validationSchema: registerSchema,

        onSubmit: async (values) => {
            setLoading(true);
            try {
                let formData = new FormData();
                const authSvc = new AuthService();
               
                formData.append("image", values.image, values.image.filename)
                formData.append('name', values.name)
                formData.append('email', values.email)
                formData.append('role', values.role)
                formData.append('password', values.password)

                let response = await authSvc.register(formData);
                if (response.status) {
                    toast.success("Your account has been registered. Please login to continue",{theme: "dark",})
                    setLoading(false)
                    navigate("/")
                }

            } catch (error) {
                console.log(error)
            }


        }


    })

    return (<>

        <Header/>
        <div className="backcolor">

            <Container>
                <Row className="mt-3 shadoww">
                    <Col lg={6}>
                        <div>
                            <h3 className="login logintitle mt-3"> <SiGnuprivacyguard className="mb-2 me-2" />SIGN UP</h3>
                            <hr />

                            <Form onSubmit={formik.handleSubmit} className="form-format">

                                <Form.Group className="mb-3" controlId="formBasicText">
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon1">< FaUser /></InputGroup.Text>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter full name"
                                            name="name"
                                            required
                                            onChange={formik.handleChange}
                                        />
                                    </InputGroup>
                                    {/* <span className="text-danger">{formik.errors?.name}</span> */}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon1"><IoMdMail /></InputGroup.Text>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter your email"
                                            name="email"
                                            required
                                            onChange={formik.handleChange}
                                        />
                                        {/* <span className="text-danger">
                                    {formik.errors?.email}
                                </span> */}
                                    </InputGroup>
                                    {/* <span className="text-danger"></span> */}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon1">< FaLock /></InputGroup.Text>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter your password"
                                            name="password"
                                            required
                                            onChange={formik.handleChange}
                                        />
                                    </InputGroup>
                                    <span className="text-danger">{formik.errors?.password}</span>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon1">< FaKey /></InputGroup.Text>
                                        <Form.Control
                                            type="password"
                                            placeholder="Repeat your password"
                                            name="confirmPassword"
                                            required
                                            onChange={formik.handleChange}
                                        />
                                    </InputGroup>
                                    <span className="text-danger">{formik.errors?.confirmPassword}</span>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Select
                                        name="role"
                                        size="sm"
                                        required
                                        onChange={formik.handleChange}
                                    >
                                        <option>--Select Your Role--</option>
                                        {/* <option value={"seller"}>Owner</option> */}
                                        <option value={"customer"}>User</option>
                                    </Form.Select>
                                    <span className="text-danger"></span>
                                </Form.Group>

                                <Form.Group controlId="formFileSm" className="mb-3">
                                    <Form.Label>Select Profile Picture</Form.Label>
                                    <Form.Control
                                        type="file"
                                        size="sm"
                                        required
                                        accept="image/*"
                                        name="image"
                                        onChange={(e) => {
                                            let file = e.target.files[0];
                                            let ext = (file.name.split(".")).pop();
                                            if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'].includes(ext.toLowerCase())) {
                                                formik.setValues({
                                                    ...formik.values,
                                                    image: file
                                                })
                                            } else {
                                                formik.setErrors({
                                                    ...formik.errors,
                                                    image: "File format not supported"
                                                })
                                            }
                                        }}
                                    />
                                    {/* <span className="text-danger">{formik.errors?.image}</span> */}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="I agree to the Terms and Conditions" />
                                </Form.Group>
                                <Button disabled={loading} variant="primary" type="submit" className="me-5 ms-2 mb-5 signupbtn">
                                    <FaUserPlus className="me-3 mb-1" />Sign Up
                                </Button>
                            </Form>
                        </div>
                    </Col>

                    <Col lg={6}>
                        <img className="userimg" src={
                            (formik.values.image && typeof formik.values.image !== "string")
                                ? URL.createObjectURL(formik.values.image)
                                : userimg
                        } alt="" />
                    </Col>
                </Row>
            </Container>

        </div>


    </>
    )
}

export default RegisterPage