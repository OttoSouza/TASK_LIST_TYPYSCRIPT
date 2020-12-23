import React, { useCallback, useRef, useState } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FiPlusCircle, FiEdit3, FiCalendar, FiEdit2 } from "react-icons/fi";
import Input from "../Input";
import { Form } from "@unform/web";
import { Container, ButtonDialog } from "../../styles/dialog";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import getValidationErros from "../../utils/getValidationsErrors";
import { useToast } from "../../hooks/ToastContext";
import api from "../../services/api";

interface TaskProps {
  id?: string;
  task_name?: string;
  description?: string;
  initial_date?: string;
  end_date?: string;
}

interface FormProps {
  task?: TaskProps;
}

const FormData: React.FC<FormProps> = ({ task }) => {
  const [open, setOpen] = useState(false);

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const handleSubmit = useCallback(
    async (data: TaskProps) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          task_name: Yup.string().required("O nome da tarefa é obrigatoria."),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // eslint-disable-next-line no-lone-blocks
        {
          task
            ? await api.put(`tasks/${task.id}`, data)
            : await api.post("tasks", data);
        }

        handleClose();

        addToast({
          type: "success",
          title: "Cadastro realizado!",
          description: `O cadastro da tarefa ${data.task_name} foi realizado com sucesso`,
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErros(error);
          formRef.current?.setErrors(errors);
          return;
        }

        // disparar um toask
        addToast({
          type: "error",
          title: "Erro ao cadastrar uma tarefa.",
          description: "Por favor informe o nome da tarefa para continuar.",
        });
      }
    },
    [addToast, task]
  );
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      {task ? (
        <button onClick={handleClickOpen}>
          <FiEdit2 color="#efff00 "/>
        </button>
      ) : (
        <button onClick={handleClickOpen}>
          <FiPlusCircle color="#ff9000" />
        </button>
      )}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth={true}>
        <DialogTitle style={{ background: "#28262e", color: "white" }}>
          Cadastrar tarefa!
        </DialogTitle>
        <DialogContent style={{ background: "#312e38" }}>
          <DialogContentText style={{ color: "#fff" }}>
            Preencha os campos abaixo para cadastrar uma tarefa.
          </DialogContentText>
          <Form
            onSubmit={handleSubmit}
            ref={formRef}
            initialData={{
              task_name: task?.task_name,
              description: task?.description,
            }}
          >
            <Input
              name="task_name"
              type="text"
              placeholder="Nome da tarefa"
              icon={FiEdit3}
            />
            <Input
              name="description"
              type="text"
              placeholder="Descriçao"
              icon={FiEdit3}
            />
            <Input
              name="initial_date"
              type="date"
              placeholder="Data de inicio"
              icon={FiCalendar}
            />
            <Input
              name="end_date"
              type="date"
              placeholder="Data de conclusão"
              icon={FiCalendar}
            />

            <DialogActions style={{ background: "#312e38" }}>
              <ButtonDialog onClick={handleClose}>Cancelar</ButtonDialog>
              <ButtonDialog type="submit">
                {task ? "Atualizar" : "Cadastrar"}
              </ButtonDialog>
            </DialogActions>
          </Form>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default FormData;
