import Heading from "../layout/Heading";
// import Pages from "./HomePage";
import PagesList from "./page/PageList";
// import DragonList from "../dragons/DragonList";
import LoginForm from "../login/LoginForm"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

export default function HomePage() {

	// eslint-disable-next-line
	const [auth, setAuth] = useContext(AuthContext);
	return (
		<div className="home--page">
			<Heading content="Home page ..." />
			<Row>

				<Col><PagesList /></Col>
					{auth ? (
					<>
					<div></div>
					</>
				) : (
					<Col><LoginForm /></Col>
				)}

			</Row>
		</div>
	);
}