import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavLink from 'react-bootstrap/NavLink';
import HomePage from "./components/home/HomePage";
import LoginPage from "./components/login/LoginPage";
import AdminPage from "./components/admin/AdminPage";
import Nav from "./components/layout/Nav";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";
import PagesDetail from "./components/home/page/PageDetail";
import EditDetail from "./components/admin/edit/EditDetail";

function App() {
	return (
		<AuthProvider>
			<Router>
			<Navbar bg="dark" variant="dark" expand="lg">
                        <Container>
                            <NavLink to="/">
                                <Navbar.Brand>JS Frameworks | MA3</Navbar.Brand>
                            </NavLink>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="ml-auto">
									<Nav />
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>


				<div className="container">
					<Switch>
						<Route exact path="/">
							<HomePage />
						</Route>
						<Route path="/home/page/:id">
							<PagesDetail />
						</Route>
						<Route path="/login">
							<LoginPage />
						</Route>
						<Route path="/admin" exact>
							<AdminPage />
						</Route>
						<Route path="/admin/edit/:id">
							<EditDetail />
						</Route>
					</Switch>
				</div>
			</Router>
		</AuthProvider>
	);
}

export default App;