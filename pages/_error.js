import React from "react";

const NotFound = ({ statusCode }) => {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src="/images/pokecenter.jpg"
          alt="Logo"
          onClick={() => {
            router.push("/");
          }}
        />
      </div>
      <p style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>
        An Poke-error occurred code: {statusCode}
      </p>
    </div>
  );
};
NotFound.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default NotFound;
