import { NavLink, useNavigate } from "react-router-dom";
// import userimage from "../../../assets/images/userimage.png"
import { toast } from "react-toastify";
import { useSelector } from "react-redux";


export const AdminTopNav = () => {
    const toggleSidebar = (e) => {
        e.preventDefault();
        document.body.classList.toggle('sb-sidenav-toggled');
    }

    const navigate = useNavigate()

    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("user")
        toast.success("Thank you for using")
        navigate("/")
    }




    return (<>
        <nav className=" backgrounddd sb-topnav navbar navbar-expand navbar-light bg-light fixed-top">
            <NavLink className="navbar-brand ps-3" to="/admin">Admin Pannel</NavLink>
            <button onClick={toggleSidebar} className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" to="#!"><i className="fas fa-bars"></i></button>
            <div className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                
            </div>
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <NavLink className="nav-link dropdown-toggle" id="navbarDropdown" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {/* <i className="fas fa-user fa-fw"></i> */}

                        <img src="" style={{height:'50px', width:'50px', borderRadius:'50%'}} alt="" />
                        
                        </NavLink>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><NavLink className="dropdown-item" to="#!">Profile</NavLink></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li>
                            <NavLink onClick={logout} className="dropdown-item" to="/">Logout</NavLink>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>

    </>)
}
export const AdminDashboard = () => {
    return(
        <div>
            <h1 className="adminDashboard">ADMIN DASHBOARD</h1>
        </div>
    )
}
export const AdminSidebar = () => {

    return (<>

        <div id="layoutSidenav_nav">
            <nav
                className="sb-sidenav accordion sb-sidenav-light"
                id="sidenavAccordion"
            >
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <div className="sb-sidenav-menu-heading">Core</div>

                        <NavLink className="nav-link" to="/">
                            <div className="sb-nav-link-icon">
                                <i className="fas fa-home"></i>
                            </div>
                            Web Preview
                        </NavLink>

                        <div className="sb-sidenav-menu-heading">Core Features</div>

                        <NavLink className="nav-link" to="/admin/category">
                            <div className="sb-nav-link-icon">
                                <i className="fas fa-video"></i>
                            </div>
                            Category Management
                        </NavLink>

                        <NavLink className="nav-link" to="/admin/movie">
                            <div className="sb-nav-link-icon">
                                <i className="fas fa-video"></i>
                            </div>
                            Movie Management
                        </NavLink>


                    </div>
                </div>
                <div className="sb-sidenav-footer">
                    <div className="small">Logged in as: </div>

                </div>
            </nav>
        </div>

    </>)
}

export const AdminFooter = () => {
    return (<>
        <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between small">
                    <div className="text-muted">Copyright &copy; Your Website 2023</div>
                    <div>
                        <NavLink to="#">Privacy Policy</NavLink>
                        &middot;
                        <NavLink to="#">Terms &amp; Conditions</NavLink>
                    </div>
                </div>
            </div>
        </footer>
    </>)
}