import Heading from "../layout/Heading";
// import Pages from "./HomePage";
import PagesList from "./page/PageList";
// import DragonList from "../dragons/DragonList";
import LoginForm from "../login/LoginForm"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function HomePage() {
	return (
		<div className="home--page">
			<Heading content="Home page ..." />
			<Row>
				{/* <DragonList /> */}
				<Col><PagesList /></Col>
				<Col><LoginForm /></Col>
			</Row>
		</div>
	);
}