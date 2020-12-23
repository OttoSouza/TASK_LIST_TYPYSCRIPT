import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FiCalendar, FiPower, FiTrash } from "react-icons/fi";
import FormDialog from "../../components/Dialog";
import { useAuth } from "../../hooks/AuthContext";
import api from "../../services/api";
import "react-day-picker/lib/style.css";
import { isToday, format } from "date-fns";
import ptBr from "date-fns/locale/pt-BR";
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Calendar,
  Section,
  ShowTask,
  NoTask
} from "../../styles/home";
import DayPicker, { DayModifiers } from "react-day-picker";
import { parseISO } from "date-fns/esm";
import { Link } from "react-router-dom";

export interface TaskData {
  id: string;
  task_name: string;
  description: string;
  initial_date: string;
  end_date: string;
  initialFormatted: string;
  endFormatted: string;
}

const Home: React.FC = () => {
  const { signOut, user } = useAuth();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSeletectedDate] = useState(new Date());

  const [tasks, setTasks] = useState<TaskData[]>([]);

  useEffect(() => {
    api.get<TaskData[]>("tasks").then((response) => {
      const taskFormatted = response.data.map((task) => {
        return {
          ...task,
          initialFormatted: format(
            parseISO(task.initial_date),
            "dd'/'MM'/'yyyy",
            { locale: ptBr }
          ),
          endFormatted: format(parseISO(task.end_date), "dd'/'MM'/'yyyy", {
            locale: ptBr,
          }),
        };
      });
      setTasks(taskFormatted);
    });
  }, [selectedDate, tasks]);

  const selectDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", { locale: ptBr });
  }, [selectedDate]);

  const selectWeekDay = useMemo(() => {
    return format(selectedDate, "cccc", { locale: ptBr });
  }, [selectedDate]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSeletectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  const handleDeleteTask = useCallback(async (id: string) => {
    await api.delete(`tasks/${id}`);
  }, []);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Profile>
            <span>Bem vindo,</span>
            <Link to="/profile">
              <strong>{user.name}</strong>
            </Link>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Tarefas agendadas</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectDateAsText}</span>
            <span>{selectWeekDay}</span>
          </p>

          <Section>
            <div>
              <strong>Suas tarefas</strong>
              <FormDialog />
            </div>

            {tasks.length ? (
              tasks.map((task) => (
                <ShowTask key={task.id}>
                  <span>
                    <FiCalendar />
                    {task.initialFormatted}
                  </span>

                  <div>
                    <strong>{task.task_name}</strong>
                    <span>{task.description}</span>
                    <span>{task.endFormatted}</span>

                    <FormDialog task={task} />

                    <button onClick={() => handleDeleteTask(task.id)}>
                      <FiTrash color="#ff1100" />
                    </button>
                  </div>
                </ShowTask>
              ))
            ) : (
              <NoTask>
                <span>Sua lista de tarefas esta vazia!</span>
              </NoTask>
            )}
          </Section>
        </Schedule>

        <Calendar>
          <DayPicker
            weekdaysShort={["D", "S", "T", "Q", "Q", "S", "S"]}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0] }]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5, 6] },
            }}
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            months={[
              "Janeiro",
              "Fevereiro",
              "Março",
              "Abril",
              "Maio",
              "Junho",
              "Julho",
              "Agosto",
              "Setembro",
              "Outubro",
              "Novembro",
              "Dezembro",
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Home;
