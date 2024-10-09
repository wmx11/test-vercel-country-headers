import React from "react";

const page = ({ params }: { params: { locale: string } }) => {
  return <div>Showing {params.locale || "EN (default)"}</div>;
};

export default page;
