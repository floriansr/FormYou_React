import React from "react";

import { useSelector } from "react-redux"
import { List, Card } from 'antd';





const CoursesList = () => {

	const courses = useSelector(state => state.courses.data);
	console.log(courses)

	return (
		<>
		<div className="container">
			<List
		    grid={{
		      gutter: 16,
		      xs: 1,
		      sm: 2,
		      md: 4,
		      lg: 4,
		      xl: 6,
		      xxl: 3,
		    }}
		    dataSource={courses}
		    renderItem={item => (
		      <List.Item>
		        <Card title={item.title}>Card content</Card>
		      </List.Item>
		    )}
		  />
		 </div> 
		</>
	);
};

export default CoursesList;