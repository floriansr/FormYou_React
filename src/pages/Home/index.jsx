import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import Loader from "react-loader";

import SearchBar from "components/SearchBar"
import CoursesList from "components/CoursesList"
import CarouselImages from "tools/Carousel"
import Cookies from 'js-cookie'


import { setCourse } from "../../redux";


const Home = () => {
	const dispatch = useDispatch();
	const logStatus = useSelector(state => state.log.log);

	const checkUser = () => {
		const user = JSON.parse(Cookies.get('token')).status
		if (user === "student") {
			return true
		}
		return null
	}

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
			{logStatus && checkUser() ? <SearchBar/> : "" }
			{courses.length === 0 ? <Loader/> : <CoursesList/> }
		</>
	);
};

export default Home;
