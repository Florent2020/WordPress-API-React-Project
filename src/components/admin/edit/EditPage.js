import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Spinner from 'react-bootstrap/Spinner';


export default function EditPage() {
	const [pages, setPages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const http = useAxios();

	useEffect(function () {
		async function getEdit() {
			try {
				const response = await http.get("wp/v2/pages");
				console.log("response", response);
				setPages(response.data);
			} catch (error) {
				console.log(error);
				setError(error.toString());
			} finally {
				setLoading(false);
			}
		}

		getEdit();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loading) return <div>
        <Spinner animation="border" role="status" variant="success">
			<span className="sr-only">Loading...</span>
		</Spinner>
    </div>;

	if (error) return <div>{}</div>;

	return (
		<div className="edit--pages">
			{pages.map((page) => {
				return (
                    <CardColumns key={page.id}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>
                                    <Link to={`/admin/edit/${page.id}`}>{page.title.rendered}</Link>
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </CardColumns>
				);
			})}
		</div>
	);
}
