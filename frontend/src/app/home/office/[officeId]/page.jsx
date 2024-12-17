import React from "react";

// Assuming this page component is in a dynamic route like '/[officeId]'
const Page = async ({ params }) => {
  return <div>Here is the office map of id: {params.officeId} </div>;
};

export default Page;
