import React from "react"
import { Toaster } from "react-hot-toast";
import DeleteProduct from "../../_components/DeleteProduct";

  const page = () => {
    return (
      <>
        <Toaster />
        <DeleteProduct productId={""} />
      </>
    )
}
  

export default page;
  