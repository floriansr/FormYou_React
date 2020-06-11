import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Select } from "antd";

import shortid from "shortid"
import { filterCourses } from "../../redux";

const { Option } = Select;

const SearchBar = () => {
	const dispatch = useDispatch()
  	const courses = useSelector((state) => state.courses.data);

	const handleChange = (value) => {
	  dispatch(filterCourses(value))
	}

  return (
    <>
	   	<div className="container margin-bottom">
		   	<Select style={{ width: '100%' }} placeholder="Select courses" onChange={(e) => handleChange(e)}>
			    {
				    courses.map((x) =>
				      <Option key={shortid.generate()} value={x.id}>{x.title}</Option>
			    )}
		  	</Select>
		</div>
    </>
  );
};

export default SearchBar;
