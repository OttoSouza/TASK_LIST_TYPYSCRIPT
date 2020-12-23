import React, { useCallback, useRef } from "react";
import Input from "../../components/Input";
import { Container, Content } from "../../styles/profile";
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
import { useAuth } from "../../hooks/AuthContext";

interface ProfileUpdate {
  name: string;
  email: string;
  old_password: string;
  password: string;
  cell: string;
}

const Profile: React.FC = () => {
  const { addToast } = useToast();
  const { user, updateUser } = useAuth();
  const { push } = useHistory();
  const formRef = useRef<FormHandles>(null);
  const handlesubmit = useCallback(
    async (data: ProfileUpdate) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required("Nome é obrigatorio!"),
          email: Yup.string()
            .required("E-mail é obrigatorio!")
            .email("Digite um e-mail valido!"),
          old_password: Yup.string(),
          password: Yup.string().when("old_password", {
            is: (val) => !!val.length,
            then: Yup.string()
              .required("Confirmação Incorreta")
              .min(6, "No minimo 6 caracteres"),
            otherwise: Yup.string(),
          }),
          cell: Yup.string().required("Telefone obrigatorio!"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        //quando nao precisar alterar a senha
        //precisa-se alterar o nome, email, telefone (ja estou logado)
        //se tiver o old_password que seria a senha atual, entao una todos os valores, se nao altere apenas o (nome | email | celular)
        const formData = Object.assign(
          {
            name: data.name,
            email: data.email,
            cell: data.cell,
          },
          data.old_password
            ? {
                old_password: data.old_password,
                password: data.password,
              }
            : {}
        );
        const response = await api.put("/users", formData);

        updateUser(response.data);
        push("/");
        addToast({
          type: "success",
          title: "Perfil Atualizado",
          description:
            "Suas informaçoes do perfil foram atualizadas com sucesso",
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErros(error);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: "error",
          title: "Erro ao atualizar perfil",
          description:
            "Ocorreu um erro ao realizar seu perfil, tente novamente",
        });
      }
    },
    [addToast, push, updateUser]
  );
  return (
    <Container>
      <header>
        <div>
          <Link to="/home">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        <Form
          onSubmit={handlesubmit}
          ref={formRef}
          initialData={{
            name: user.name,
            email: user.email,
            cell: user.cell,
          }}
        >
          <h1>Meu Perfil</h1>

          <Input name="name" type="text" placeholder="Nome" icon={FiUser} />
          <Input name="email" type="text" placeholder="E-mail" icon={FiMail} />
          <Input
            name="cell"
            type="text"
            placeholder="Celular"
            icon={FiPhoneCall}
          />
          <Input
            contentStyle={{ marginTop: 24 }}
            name="old_password"
            type="password"
            placeholder="Senha atual"
            icon={FiLock}
          />
          <Input
            name="password"
            type="password"
            placeholder="Nova senha"
            icon={FiLock}
          />

          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
