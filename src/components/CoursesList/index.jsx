import React from "react";

import { useSelector } from "react-redux";
import { List, Card } from "antd";
import { Link } from "react-router-dom";

const CoursesList = () => {
  const courses = useSelector((state) => state.courses.data);
  const filter = useSelector((state) => state.courses.filter);

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
          dataSource={filter === undefined ? courses : filter}
          renderItem={(item) => (
            <List.Item>
              <Card title={item.title}>
                <Link to={`/course/${item.id}`}>Show more</Link>
              </Card>
            </List.Item>
          )}
        />
      </div>
    </>
  );
};

export default CoursesList;
