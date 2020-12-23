import React, { useCallback, useRef } from "react";
import Input from "../../components/Input";
import { Container, Content, AnimationContainer } from "../../styles/singup";
import {
  FiArrowLeft,
  FiMail,
  FiLock,
  FiUser,
  FiPhoneCall,
} from "react-icons/fi";

import Button from "../../components/Button";
import * as Yup from "yup";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import getValidationErros from "../../utils/getValidationsErrors";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";
import { useToast } from "../../hooks/ToastContext";

interface SingUpDate {
  name: string;
  email: string;
  password: string;
  cell: string;
}

const SingUp: React.FC = () => {
  const { addToast } = useToast();
  const { push } = useHistory();
  const formRef = useRef<FormHandles>(null);
  const handlesubmit = useCallback(
    async (data: SingUpDate) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required("Nome é obrigatorio!"),
          email: Yup.string()
            .required("E-mail é obrigatorio!")
            .email("Digite um e-mail valido"),
          password: Yup.string().required("Senha é obrigatorio!"),
          cell: Yup.string().required("Telefone orbigatorio"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post("/users", data);

        push("/");
        addToast({
          type: "success",
          title: "Cadastro realizado!",
          description: "Voce ja pode já pode fazer seu login",
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErros(error);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: "error",
          title: "Erro ao realizado cadastro",
          description: "Ocorreu um erro ao realizar cadastro, tente novamente",
        });
      }
    },
    [addToast, push]
  );
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form onSubmit={handlesubmit} ref={formRef}>
            <h1>Faça seu Cadastro</h1>

            <Input name="name" type="text" placeholder="Nome" icon={FiUser} />
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
            <Input
              name="cell"
              type="text"
              placeholder="Celular"
              icon={FiPhoneCall}
            />
            <Button type="submit">Cadastrar</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Voltar para login
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SingUp;
