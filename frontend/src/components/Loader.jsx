import {Spinner} from "react-bootstrap";

export const Loader = () => {
  return (
    <Spinner 
        animation = "border"
        role = "status"
        variant="secondary"
        style={{
            width: "100px",
            height: "100px",
            margin: "auto",
            display: "block",
            position: "fixed",
            top: "50%",
            left: "50%",
            marginTop: "-50px",
        }}
        ></Spinner>
  )
}
