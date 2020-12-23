import React from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { TaskData } from "../../pages/Home";
import { Container } from "../../styles/task";

interface TaskProps {
  task: TaskData;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <Container>
      <li>
        <strong>Nome: </strong> {task.task_name}
      </li>
      <li>
        <strong>Descriçao: </strong> {task.description}
      </li>
      <li>
        <strong>Dia de inicio:</strong> {task.initial_date}
      </li>
      <li>
        <strong>Dia final:</strong> {task.end_date}
      </li>
      <div>
        <FiTrash />
        <FiEdit />
      </div>
    </Container>
  );
};

export default Task;
