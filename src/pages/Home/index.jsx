import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import Loader from "react-loader";

import CoursesList from "components/CoursesList"
import CarouselImages from "tools/Carousel"

import { setCourse } from "../../redux";


const Home = () => {
	const dispatch = useDispatch();

	useEffect(() => {

		fetch("https://form-you-back.herokuapp.com/api/v1/courses.json", {
	      method: 'get',
	      headers: {
	        'Content-Type': 'application/json'
	      },
	 	})
	      .then(response => response.json())
	      .then(response => {
	        dispatch(setCourse(response))
	      })
	      .catch(error => console.log(error))
	}, [dispatch])

	const courses = useSelector(state => state.courses.data);

	return (
		<>
			<CarouselImages/>
			{courses.length === 0 ? <Loader/> : <CoursesList/> }
		</>
	);
};

export default Home;
