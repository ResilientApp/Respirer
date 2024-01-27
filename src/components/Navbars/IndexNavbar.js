/*!

=========================================================
* BLK Design System React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
  Row,
  Col,
  NavLink
} from "reactstrap";
import { AuthContext, useAuth } from "../../context/AuthContext";

export default function IndexNavbar() {
  let navigate = useNavigate();
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [collapseOut, setCollapseOut] = React.useState("");
  const [color, setColor] = React.useState("navbar-transparent");
  const {logout} = useAuth();
  const {currentUser} = useContext(AuthContext);

  React.useEffect(() => {
    window.addEventListener("scroll", changeColor);
    return function cleanup() {
      window.removeEventListener("scroll", changeColor);
    };
  }, []);
  const changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      setColor("bg-info");
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      setColor("navbar-transparent");
    }
  };
  const toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    setCollapseOpen(!collapseOpen);
  };
  const onCollapseExiting = () => {
    setCollapseOut("collapsing-out");
  };
  const onCollapseExited = () => {
    setCollapseOut("");
  };
  return (
    <Navbar className={"fixed-top " + color} color-on-scroll="100" expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand to="/" tag={Link} id="navbar-brand">
            <span style={{fontWeight: 'bold', fontSize: '1.5rem'}}>Respirer</span>
          </NavbarBrand>
          {/* <UncontrolledTooltip placement="bottom" target="navbar-brand">
            Designed and Coded by Creative Tim
          </UncontrolledTooltip> */}
          <button
            aria-expanded={collapseOpen}
            className="navbar-toggler navbar-toggler"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className={"justify-content-end " + collapseOut}
          navbar
          isOpen={collapseOpen}
          onExiting={onCollapseExiting}
          onExited={onCollapseExited}
        >
          <div className="navbar-collapse-header">
            <Row>
              <Col className="collapse-brand" xs="6">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                Respirer
                </a>
              </Col>
              <Col className="collapse-close text-right" xs="6">
                <button
                  aria-expanded={collapseOpen}
                  className="navbar-toggler"
                  onClick={toggleCollapse}
                >
                  <i className="tim-icons icon-simple-remove" />
                </button>
              </Col>
            </Row>
          </div>
          <Nav navbar>
            {/* <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="https://twitter.com/CreativeTim"
                rel="noopener noreferrer"
                target="_blank"
                title="Follow us on Twitter"
              >
                <i className="fab fa-twitter" />
                <p className="d-lg-none d-xl-none">Twitter</p>
              </NavLink>
            </NavItem>
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="https://www.facebook.com/CreativeTim"
                rel="noopener noreferrer"
                target="_blank"
                title="Like us on Facebook"
              >
                <i className="fab fa-facebook-square" />
                <p className="d-lg-none d-xl-none">Facebook</p>
              </NavLink>
            </NavItem>
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="https://www.instagram.com/CreativeTimOfficial"
                rel="noopener noreferrer"
                target="_blank"
                title="Follow us on Instagram"
              >
                <i className="fab fa-instagram" />
                <p className="d-lg-none d-xl-none">Instagram</p>
              </NavLink>
            </NavItem> */}
             <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                //href="/Respirer/track"
                rel="noopener noreferrer"
                target="_self"
                title="Track your products"
                onClick = {()=>navigate("/track")}
              >
            <Button
                className="nav-link d-none d-lg-block"
                color="default"
              >
                <i className="tim-icons icon-zoom-split" /> Search
              </Button>
              <i className="tim-icons icon-zoom-split d-lg-none d-xl-none" /> 
              <p className="d-lg-none d-xl-none">Search</p>
              </NavLink>
            </NavItem>
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                // href="/Respirer/inventory"
                rel="noopener noreferrer"
                target="_self"
                title="List of current products"
                onClick = {()=>navigate("/inventory")}
              >
              <Button
                className="nav-link d-none d-lg-block"
                color="default"
              >
                <i className="tim-icons icon-notes" /> My Data
              </Button>
                <i className="tim-icons icon-notes d-lg-none d-xl-none" />
                <p className="d-lg-none d-xl-none">My Data</p>
              </NavLink>
            </NavItem>
            {/* <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                // href="/Respirer/inventory"
                rel="noopener noreferrer"
                target="_self"
                title="My Profile"
                onClick = {()=>navigate("/profile")}
              >
              <Button
                className="nav-link d-none d-lg-block"
                color="default"
              >
                <i className="tim-icons icon-single-02" /> My Profile
              </Button>
                <i className="tim-icons icon-single-02 d-lg-none d-xl-none" />
                <p className="d-lg-none d-xl-none">My Profile</p>
              </NavLink>
            </NavItem> */}
            {
              currentUser==null?
            <UncontrolledDropdown nav>
              <DropdownToggle
                caret
                color="default"
                data-toggle="dropdown"
                href="#pablo"
                nav
                onClick={(e) => e.preventDefault()}
              >
                <i className="fa fa-cogs d-lg-none d-xl-none" />
                Getting started
              </DropdownToggle>
              <DropdownMenu className="dropdown-with-icons" style={{backgroundColor: "#171941"}}>
                <DropdownItem tag={Link} to="/login">
                  <i className="tim-icons icon-badge" />
                  Login
                </DropdownItem>
                <DropdownItem tag={Link} to="/register">
                  <i className="tim-icons icon-bullet-list-67" />
                  Register
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>: 

              <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                // href="/Respirer/inventory"
                rel="noopener noreferrer"
                target="_self"
                title="Logout"
                onClick = {async ()=>await logout()}
              >
              <Button
                className="nav-link d-none d-lg-block"
                color="default"
              >
                <i className="tim-icons icon-button-power" /> Logout
              </Button>
                <i className="tim-icons icon-button-power d-lg-none d-xl-none" />
                <p className="d-lg-none d-xl-none">Logout</p>
              </NavLink>
              </NavItem>}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}
