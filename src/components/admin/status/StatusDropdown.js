import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useAxios from "../../../hooks/useAxios";

export default function StatusDropdown({...register}) {
	const [status, setStatus] = useState([]);

	const http = useAxios();

	useEffect(function () {
		async function getStatus() {
			try {
				const response = await http.get("wp/v2/pages");
				console.log("response", response);
				setStatus(response.data);
			} catch (error) {
				console.log(error);
			}
		}

		getStatus();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<select name="status" >
			<option value="">Select status</option>
			{status.map((status) => {
				return (
					<option key={status.id} value={status.id}>
						{status.status}
					</option>
				);
			})}
		</select>
	);
}

StatusDropdown.propTypes = {
	register: PropTypes.func,
};

StatusDropdown.defaultProps = {
	register: () => {},
};