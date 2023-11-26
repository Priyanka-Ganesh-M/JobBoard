import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SearchIcon from '@mui/icons-material/Search';
function DesktopNav(props) {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-ternary" >
      <Container>
        <Navbar.Brand href="/">Job Board</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Nav.Link href={props.home_url}>{props.Home}</Nav.Link>&nbsp;&nbsp;&nbsp;&nbsp;
            <Nav.Link href={props.url2}><SearchIcon/>&nbsp;&nbsp;{props.Title2}</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href={props.logIn}>Register/Log In</Nav.Link>
            {/* <Nav.Link href={props.url3}>
              {props.Title3}
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default DesktopNav;
