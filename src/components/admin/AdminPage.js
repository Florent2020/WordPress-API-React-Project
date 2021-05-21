import Heading from "../layout/Heading";
import EditPage from "./edit/EditPage";
import Breadcrumb from 'react-bootstrap/Breadcrumb';

export default function AdminPage() {
	return (
		<>
			<Breadcrumb>
				<Breadcrumb.Item href="/admin">Back to admin</Breadcrumb.Item>
			</Breadcrumb>
			<Heading content="Admin" />
			<EditPage />
		</>
	);
}