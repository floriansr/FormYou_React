import React from "react";
import { useSelector } from "react-redux";
import { Select } from "antd";

import shortid from "shortid"

const { Option } = Select;

// import { Link } from "react-router-dom";

const SearchBar = () => {

  	const courses = useSelector((state) => state.courses.data);

	const handleChange = (value) => {
	  console.log(`selected ${value}`);
	}

  return (
    <>
	   	<div className="container margin-bottom">
		   <Select mode="tags" style={{ width: '100%' }} placeholder="Select courses" onChange={handleChange}>
		    {courses.map((x) =>
		    	<Option key={shortid.generate()}>{x.title}</Option>
		    	)}
		  </Select>
		</div>
    </>
  );
};

export default SearchBar;
