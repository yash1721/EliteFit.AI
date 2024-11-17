import TaskCard from "./TaskCard";
import { useSelector } from 'react-redux';
import { selectAllTasks } from '../store/taskSlice';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PendingTask = () => {

    const tasks = useSelector(selectAllTasks);
    const completedTasks = tasks.filter(task => task.status === 'Pending');
    return (
      <div className="w-[70%] mx-auto">
        <div className="mt-10">
          <h1 className="text-3xl font-bold my-8 text-center">
            <motion.h1
              initial={{ y: -200 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
            >
              Pending Tasks
            </motion.h1>
          </h1>
        </div>
        {completedTasks.length > 0 ? (
          <div className="flex flex-wrap gap-y-4 gap-x-14 overflow-y-scroll mt-5 h-[50vh] sm:h-[80vh] justify-center">
            {completedTasks.map((task) => (
              <TaskCard
                key={task.id}
                title={task.title}
                description={task.description}
                startDate={task.startDate}
                endDate={task.endDate}
                status={task.status}
                assignee={task.assignee}
                priority={task.priority}
              />
            ))}
          </div>
        ) : (
          <div className="text-center mt-[17vh] sm:mt-[30vh]">
            <p>
              No tasks found.{" "}
              <Link to="/addTask" className="text-white">
                Add a new task
              </Link>
            </p>
          </div>
        )}
      </div>
    );
}

export default PendingTask
