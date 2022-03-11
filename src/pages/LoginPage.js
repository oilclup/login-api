import {useContext} from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { UserStoreContext } from '../context/UserContext'

const schema = yup.object().shape({
    email: yup
      .string()
      .required("อีเมล์ห้ามว่าง")
      .email("รูปแบบอีเมล์ไม่ถูกต้อง"),
    password: yup
      .string()
      .required("รหัสผ่านห้ามว่าง")
      .min(3, "รหัสผ่านต้อง 3 ตัวอักษรขึ้นไป"),
  });

  
const LoginPage = () => {
    const history = useHistory();

    const userStore = useContext(UserStoreContext)

    
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema),
      });
    
    const onSubmit = async (data) => {
        try {
          
            const apiUrl = "http://localhost:8080/user/login"
            const resp = await axios.post(apiUrl, {
                email: data.email,
                password: data.password
            })
           localStorage.setItem('token', JSON.stringify(resp.data))
           console.log(resp.data);

           const urlProfile = 'http://localhost:8080/user/me'
           const respProfile = await axios.get(urlProfile, {
           headers: {
             Authorization: 'Bearer ' + resp.data.access_token
           }
          })
          localStorage.setItem('profile', JSON.stringify(respProfile.data.user))
           console.log(respProfile.data.user);
          
          const profileValue = JSON.parse(localStorage.getItem('profile'))
          userStore.updateProfile(profileValue)
          history.replace("/")

        } catch (err) {
         console.log(err.response.data.error);
        }
    }



    return (
        <Container className="mt-4">
        <Row>
          <Col xs={12} md={8}>
          <Form onSubmit={handleSubmit(onSubmit)}>
  
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  ref={register}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                />
                {errors.email && (
                  <Form.Control.Feedback type="invalid">
                    {errors.email.message}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
  
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  ref={register}
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                />
                {errors.password && (
                  <Form.Control.Feedback type="invalid">
                    {errors.password.message}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
  
              <Button variant="primary" type="submit">
                เข้าสู่ระบบ
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      )
};

export default LoginPage;
