import Heading from "../layout/Heading";
import EditPage from "./edit/EditPage"

export default function AdminPage() {
	return (
		<>
			<Heading content="Admin" />
			<EditPage />
		</>
	);
}