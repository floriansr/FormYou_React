import React from "react";

const CategoriesList = ({ categories }) => {

  return categories.map((e, index) => (
    <>{index === categories.length - 1 ? e.name : <>{e.name}, </>} </>
  ));
};

export default CategoriesList;
