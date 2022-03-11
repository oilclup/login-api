import {useContext,useEffect} from "react";
import { Navbar,Nav } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import { UserStoreContext } from '../context/UserContext'

const NavBar = () => {
  const history = useHistory();
  const userStore = useContext(UserStoreContext)

  const getProfile = () => {
    const profileValue = JSON.parse(localStorage.getItem("profile"));
    if (profileValue) {
      userStore.updateProfile(profileValue)
      
    }
  };

  useEffect(() => {
    console.log("useEffect UpdateProfile at Context");
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("profile")
    history.replace("/")
    userStore.updateProfile(null)

  }
  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <NavLink className="navbar-brand" to="/" exact={true}>
          CodingThailand
        </NavLink>
 
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink className="nav-link" to="/" exact activeClassName="active">
              หน้าหลัก
            </NavLink>
          </Nav>
          <NavLink className="nav-link" to="/member" activeClassName="active">
              เมนูสมาชิก
            </NavLink>
            <>
            {userStore.profile ? (
            <span className="navbar-text text-white">
              ยินดีต้อนรับคุณ {userStore.profile.name} role: {userStore.profile.role}
              <button className="btn btn-danger ml-2" onClick={logout}>
                Log out
              </button>
            </span>
            ) : (
            <>
              <Nav>
                <NavLink
                  className="nav-link"
                  to="/register"
                  activeClassName="active"
                >
                  สมัครสมาชิก
                </NavLink>
                <NavLink
                  className="nav-link"
                  to="/login"
                  activeClassName="active"
                >
                  เข้าระบบ
                </NavLink>
              </Nav>
            </>
          )}
            </>
              
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
