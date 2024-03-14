import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthService from "../auth/auth.service";
import { toast } from "react-toastify";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Container, Form, Row, Col, InputGroup } from "react-bootstrap";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { FaCircleUser } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import category from "../admin/category";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useCallback, useEffect, useState } from "react";

const Header = () => {
  const [cats, setCats] = useState();

  const loadCategories = useCallback(async () => {
    let response = await category.categorySvc.listAllHomeCategories(20, 1);
    setCats(response.result);
  }, []);

  useEffect(() => {
    loadCategories();
  }, []);

  const authSvc = new AuthService();
  const navigate = useNavigate();
  const loginSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });
  const formik = useFormik({
    initialValues: {
      email: null,
      password: null,
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        let response = await authSvc.login(values);
        if (response.status) {
          let formattedData = {
            id: response.result.data._id,
            name: response.result.data.name,
            email: response.result.data.email,
            role: response.result.data.role,
          };

          localStorage.setItem(
            "accessToken",
            response.result.token.accessToken
          );
          localStorage.setItem(
            "refreshToken",
            response.result.token.refreshToken
          );
          localStorage.setItem("user", JSON.stringify(formattedData));

          toast.success("Welcome to" + formattedData.role + " Portal !");
          navigate("/");
          window.location.reload();
        } else {
          toast.warning("Credentials does not match");
        }

        // console.log(response)
      } catch (axiosErrorResponse) {
        console.log(axiosErrorResponse);
        toast.error("Credentials does not match");
      }
    },
  });
  const [visible, setVisible] = useState(false);

  const dashboard = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    let role = user.role;
    if (role === "admin") {
      navigate("/" + role);
    }
  };

  const isLoggedIn = () => {
    return localStorage.getItem("user") !== null;
  };

  const Logout = () => {
    localStorage.clear();
    navigate("/");
    toast.success("Logged Out Successfully");
  };

  return (
    <>
      <Navbar className="navv" bg="dark" data-bs-theme="dark">
        <Container style={{ marginLeft: "150px" }}>
          <Navbar.Brand to="/">
            <img className="logo" src={logo} alt="" />
          </Navbar.Brand>
          <Nav className="me-auto">
            <NavLink className="headertitle active" to="/">
              Home
            </NavLink>
            <NavLink className="headertitle" to="/movies">
              Movies
            </NavLink>

            <NavDropdown
              style={{ color: "white" }}
              className="headertitleGenre"
              title="Genre"
            >
              {cats &&
                cats.map((cat, index) => (
                  <NavLink
                    key={index}
                    to={`/category/${cat.slug}`}
                    className={"dropdown-item"}
                  >
                    {cat.name}
                    <NavDropdown.Divider />
                  </NavLink>
                ))}
            </NavDropdown>
            {/* <NavLink className='headertitlesignin'>Sign In</NavLink> */}

            {isLoggedIn() ? (
              JSON.parse(localStorage.getItem("user")).role === "admin" ? (
                <Button
                  className="btnstyle headertitle"
                  onClick={dashboard}
                  label="Dashboard"
                />
              ) : null
            ) : (
              <Button
                className="btnstyle headertitle"
                label="Sign In"
                onClick={() => setVisible(true)}
              />
            )}
            {isLoggedIn() && (
              <Button
                className="btnstyle headertitle"
                onClick={Logout}
                style={
                  JSON.parse(localStorage.getItem("user")).role === "admin"
                    ? { marginLeft: "-20px" }
                    : {}
                }
                label={<i class="fa-solid fa-right-from-bracket"></i>}
              />
            )}
            <Dialog
              className="loginoverlay"
              draggable={false}
              visible={visible}
              onHide={() => setVisible(false)}
            >
              <Container>
                <Row className="backk">
                  <Col lg={6}>
                    <h3 className="login logintitle">
                      {" "}
                      <FaCircleUser className="mb-2 me-2" />
                      USER LOGIN
                    </h3>
                    <hr className="mb-4" />

                    <Form
                      onSubmit={formik.handleSubmit}
                      className="form-format"
                    >
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <InputGroup className="mb-3">
                          <InputGroup.Text id="basic-addon1">
                            <HiOutlineMail />
                          </InputGroup.Text>
                          <Form.Control
                            type="email"
                            required
                            placeholder="Enter your email"
                            name="email"
                            onChange={formik.handleChange}
                          />
                        </InputGroup>
                        {/* <span className="text-danger">{formik.errors?.email}</span> */}
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <InputGroup className="mb-3">
                          <InputGroup.Text id="basic-addon1">
                            <HiOutlineLockClosed />
                          </InputGroup.Text>
                          <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            name="password"
                            onChange={formik.handleChange}
                          />
                        </InputGroup>
                        {/* <span className="text-danger">{formik.errors?.password}</span> */}
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <Form.Check type="checkbox" label="Remember Me" />
                      </Form.Group>

                      <Button
                        variant="primary"
                        type="submit"
                        className="me-4 ms-2 loginbutton mt-3"
                      >
                        <FaRegUser className="me-3 " />
                        Login
                      </Button>

                      {/* <NavLink className="signup" style={{ textDecoration: "none", color: "#09b0e7" }} to="forget-password">Forgot Password ? </NavLink> */}
                    </Form>
                  </Col>

                  <Col lg={1}>
                    <div className="vline"></div>
                    <div>
                      <b style={{ fontSize: "16px" }}>OR</b>
                    </div>
                    <div className="vline"></div>
                  </Col>

                  <Col lg={5} className="signupimage">
                    <div className="formatsignup">
                      <NavLink to="/register">
                        <Button
                          variant="primary"
                          type="submit"
                          className="me-4 ms-2 signupbutton"
                        >
                          <FaUserPlus className="me-3 " />
                          Signup
                        </Button>
                      </NavLink>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Dialog>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
