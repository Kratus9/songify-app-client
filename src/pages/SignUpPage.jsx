import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import service from "../../services/api";
import { useState } from "react";

function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData)
  };

  const handleSubmit = async () => {
    try {
      const params = {}
      params.append(formData.name);
      params.append(formData.username);
      params.append(formData.email);
      params.append(formData.password);
      params.append(formData.repeatPassword);
      // const formDataToSend = new FormData();
      // console.log(formData)
      // Object.keys(formData).forEach((key) => {
      //   formDataToSend.append(key, formData[key])
      // })
      console.log("Params antes de envio:", params);
      await service.post(`/auth/register?${params.toString()}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
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
      <Form className="signup-form">
        <label htmlFor="name">Name</label>
        <Form.Control
          type="text"
          id="name"
          value={formData.name}
          name="name"
          onChange={handleChange}
        />
        <label htmlFor="username">Username</label>
        <Form.Control
          type="text"
          id="username"
          value={formData.username}
          name="username"
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <Form.Control
          type="text"
          id="email"
          value={formData.email}
          name="email"
          onChange={handleChange}
        />
        <label htmlFor="Password">Password</label>
        <Form.Control
          type="password"
          id="password"
          value={formData.password}
          name="password"
          onChange={handleChange}
        />
        <label htmlFor="repeatPassword">Repeat Password</label>
        <Form.Control
          type="text"
          id="repeatPassword"
          value={formData.repeatPassword}
          name="repeatPassword"
          onChange={handleChange}
        />
        <Button type="button" onClick={() => handleSubmit()}>
          Sign Up
        </Button>
      </Form>
    </div>
  );
}

export default SignUpPage;
