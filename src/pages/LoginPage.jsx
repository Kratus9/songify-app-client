import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import service from "../../services/api";

function LoginPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await service.post("/auth/login", userData);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log(error.response.data);
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };
  return (
    <div>
      <Form onSubmit={handleSubmit} className="login-form">
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
          type="password"
          id="password"
          value={userData.password}
          name="password"
          onChange={handleChange}
        />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <Button type="submit">Login</Button>
      </Form>
    </div>
  );
}

export default LoginPage;
