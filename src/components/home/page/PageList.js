import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Spinner from 'react-bootstrap/Spinner';
import axios from "axios";
import { BASE_URL } from "../../../constants/api";

export default function PageList() {
	const [pages, setPages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const url = BASE_URL + `wp/v2/pages`;


	useEffect(function () {
		async function getPage() {
			try {
				const response = await axios.get(url);
				console.log("response", response);
				setPages(response.data);
			} catch (error) {
				console.log(error);
				setError(error.toString());
			} finally {
				setLoading(false);
			}
		}

		getPage();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loading) return <div>
		<Spinner animation="border" role="status" variant="success">
			<span className="sr-only">Loading...</span>
		</Spinner>
	</div>;

	if (error) return <div>{}</div>;

	return (
		<div className="pages">
			{pages.map((page) => {
				return (
					<CardColumns key={page.id}>
						<Card style={{ width: '18rem' }}>
							<Card.Body>
								<Card.Title>
									<Link to={`/home/page/${page.id}`}>{page.title.rendered}</Link>
								</Card.Title>
							</Card.Body>
						</Card>
					</CardColumns>

				);
			})}
		</div>
	);
}
