import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../common/FormError";
import Heading from "../../layout/Heading";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Spinner from 'react-bootstrap/Spinner';

const schema = yup.object().shape({
	title: yup.string().required("Title is required"),
    status: yup.string().required("Status is required"),
});

export default function EditDetail() {
	const [edit, setEdit] = useState(null);
	const [updated, setUpdated] = useState(false);
	const [fetchingPage, setFetchingPage] = useState(true);
	const [updatingPage, setUpdatingPage] = useState(false);
	const [fetchError, setFetchError] = useState(null);
	const [updateError, setUpdateError] = useState(null);

	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema),
	});

	const http = useAxios();

	let { id } = useParams();

	const url = `wp/v2/pages/${id}`;

	useEffect(
		function () {
			async function getDetail() {
				try {
					const response = await http.get(url);
					console.log("response", response.data);
					setEdit(response.data);
				} catch (error) {
					console.log(error);
					setFetchError(error.toString());
				} finally {
					setFetchingPage(false);
				}
			}

			getDetail();
		},
		// eslint-disable-next-line
		[]
	);

    async function onSubmit(data) {
		setUpdatingPage(true);
		setUpdateError(null);
		setUpdated(false);

		console.log(data);

		try {
			const response = await http.put(url, data);
			console.log("response", response.data);
			setUpdated(true);
		} catch (error) {
			console.log("error", error);
			setUpdateError(error.toString());
		} finally {
			setUpdatingPage(false);
		}
	}




	if (fetchingPage) return <div>
            <Spinner animation="border" role="status" variant="success">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>;

	if (fetchError) return <div>Error loading post</div>;

	return (
		<div className="edit--detail--page">
			<Breadcrumb>
				<Breadcrumb.Item href="/admin">Back to admin</Breadcrumb.Item>
			</Breadcrumb>
			<Heading content="Edit page" />

            <form onSubmit={handleSubmit(onSubmit)}>
				{updated && <div className="success">The page was updated!</div>}

				{updateError && <FormError>{updateError}</FormError>}

				<fieldset disabled={updatingPage}>
					<div>
						<input name="title" defaultValue={edit.title.rendered} placeholder="Title"  {...register('title')} />
						{errors.title && <FormError>{errors.title.message}</FormError>}
					</div>

					<div>
						<input name="status" defaultValue={edit.status} placeholder="Status" {...register('status')} />
					</div>



					<button>Update</button>
				</fieldset>
			</form>
		</div>
	);
}