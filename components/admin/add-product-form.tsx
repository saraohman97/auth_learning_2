"use client";

import { useState } from "react";

const AddProductForm = () => {
  const [isLoading, setIsLOading] = useState(false);

  return (
    <>
      <h2 className="text-2xl text-center font-semibold">Add a product</h2>
    </>
  );
};

export default AddProductForm;
