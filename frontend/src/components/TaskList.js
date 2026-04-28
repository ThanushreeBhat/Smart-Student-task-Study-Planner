import TaskCard from "./TaskCard";

export default function TaskList({ tasks }) {
  return (
    <>
      {tasks.map(t => (
        <TaskCard key={t._id} task={t} />
      ))}
    </>
  );
}