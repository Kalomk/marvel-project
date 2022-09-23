import error from "./error.gif";
const Error = () => {
  return (
    <img
      src={error}
      alt=""
      style={{
        display: "block",
        width: "250px",
        height: "250px",
        margin: "0 auto",
        objectFit: "contain",
      }}
    />
  );
};
export default Error;
