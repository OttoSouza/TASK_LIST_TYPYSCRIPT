import React, { useCallback, useRef } from "react";
import Input from "../../components/Input";
import { AnimationContainer, Container, Content } from "../../styles/singin";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { useAuth } from "../../hooks/AuthContext";
import Button from "../../components/Button";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import getValidationErros from "../../utils/getValidationsErrors";
import { useToast } from "../../hooks/ToastContext";
import { Link, useHistory } from "react-router-dom";
interface SigninForm {
  email: string;
  password: string;
}
const SingIn: React.FC = () => {
  const { signIn } = useAuth();
  const { push } = useHistory();

  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);
  const handlesubmit = useCallback(
    async (data: SigninForm) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required("E-mail é obrigatorio!")
            .email("Digite um e-mail valido"),
          password: Yup.string().required("Senha é obrigatorio!"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        await signIn({
          email: data.email,
          password: data.password,
        });
        push("/home");

        addToast({
          type: "success",
          title: `Seja bem vindo!`
        })
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErros(error);
          formRef.current?.setErrors(errors);
          return;
        }

        // disparar um toask
        addToast({
          type: "error",
          title: "error na autenticaçao",
          description:
            "Ocorreu um erro ao fazer o login , cheque as credenciais",
        });
      }
    },
    [signIn, addToast, push]
  );
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form onSubmit={handlesubmit} ref={formRef}>
            <h1>Faça seu login</h1>

            <Input
              name="email"
              type="text"
              placeholder="E-mail"
              icon={FiMail}
            />
            <Input
              name="password"
              type="password"
              placeholder="Senha"
              icon={FiLock}
            />
            <Button type="submit">Entrar</Button>
          </Form>
          <Link to="/signup">
            <FiLogIn />
            Cadaste-se
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SingIn;
