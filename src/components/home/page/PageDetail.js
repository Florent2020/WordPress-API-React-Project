import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Heading from "../../layout/Heading";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Spinner from 'react-bootstrap/Spinner';
import axios from "axios";
import { BASE_URL } from "../../../constants/api";

export default function EditPost() {
	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	let { id } = useParams();


	const url = BASE_URL + `wp/v2/pages/${id}`;



	useEffect(
		function () {
			async function getPost() {

				try {
					const response = await axios.get(url);
					console.log("response", response.data);
					setPost(response.data);
				} catch (error) {
					console.log(error);
					setError(error.toString());
				} finally {
					setLoading(false);
				}

			}
			getPost();

		},
		// eslint-disable-next-line
		[]
	);


	if (loading) return <div>
		<Spinner animation="border" role="status" variant="success">
			<span className="sr-only">Loading...</span>
		</Spinner>
	</div>;

	if (error) return <div>{}</div>;

	return (
		<div className="detail--page">
			<Breadcrumb>
				<Breadcrumb.Item href="/">Back to home</Breadcrumb.Item>
			</Breadcrumb>
			<Heading content="Detail page" />

			<div className="detail--content">
				<div className="title__detail"><strong>Title:</strong> {post.title.rendered}</div>
				<div className="date__detail"><strong>Date:</strong> {new Date(post.date).toUTCString().substr(4,13).replace()}</div>
				<div className="excerpt__detail"><strong>Excerpt:</strong> <span dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} /> </div>
			</div>
		</div>
	);
}

