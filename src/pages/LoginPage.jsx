import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import service from "../../services/api";
import { useState } from "react";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

function LoginPage() {
  const { activeUserId } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async () => {
    try {
      const userId = activeUserId;
      await service.post("/auth/login", userData, userId);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log(error.response.data);
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };
  return (
    <div>
      <Form className="login-form">
        <label htmlFor="username">Username</label>
        <Form.Control
          type="text"
          id="username"
          value={userData.username}
          name="username"
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <Form.Control
          type="text"
          id="password"
          value={userData.password}
          name="password"
          onChange={handleChange}
        />
        <Button type="button" onClick={() => handleSubmit()}>
          Login
        </Button>
      </Form>
    </div>
  );
}

export default LoginPage;
