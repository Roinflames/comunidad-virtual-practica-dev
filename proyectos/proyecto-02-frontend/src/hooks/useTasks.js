import { useCallback, useState } from "react";
import { createTask, deleteTask, getTasks, updateTask } from "../services/api.js";

export function useTasks({ token, onUnauthorized }) {
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [taskMutationPending, setTaskMutationPending] = useState(false);

  const handleTaskError = useCallback(
    (error) => {
      if (error.status === 401) {
        onUnauthorized();
      }

      throw error;
    },
    [onUnauthorized]
  );

  const loadTasks = useCallback(
    async (tokenOverride) => {
      const currentToken = tokenOverride || token;

      if (!currentToken) {
        setTasks([]);
        return [];
      }

      setLoadingTasks(true);

      try {
        const taskList = await getTasks(currentToken);
        setTasks(taskList);
        return taskList;
      } catch (error) {
        handleTaskError(error);
        return [];
      } finally {
        setLoadingTasks(false);
      }
    },
    [handleTaskError, token]
  );

  const addTask = useCallback(
    async (payload) => {
      setTaskMutationPending(true);

      try {
        await createTask(payload, token);
        await loadTasks();
      } catch (error) {
        handleTaskError(error);
      } finally {
        setTaskMutationPending(false);
      }
    },
    [handleTaskError, loadTasks, token]
  );

  const toggleTask = useCallback(
    async (task) => {
      setTaskMutationPending(true);

      try {
        await updateTask(
          task.id,
          {
            titulo: task.titulo,
            descripcion: task.descripcion || "",
            completada: !task.completada
          },
          token
        );
        await loadTasks();
      } catch (error) {
        handleTaskError(error);
      } finally {
        setTaskMutationPending(false);
      }
    },
    [handleTaskError, loadTasks, token]
  );

  const removeTask = useCallback(
    async (taskId) => {
      setTaskMutationPending(true);

      try {
        await deleteTask(taskId, token);
        await loadTasks();
      } catch (error) {
        handleTaskError(error);
      } finally {
        setTaskMutationPending(false);
      }
    },
    [handleTaskError, loadTasks, token]
  );

  return {
    tasks,
    loadingTasks,
    taskMutationPending,
    loadTasks,
    addTask,
    toggleTask,
    removeTask
  };
}
