import { useState } from "react";
import TaskCard from "./TaskCard";
import { useSelector } from "react-redux";
import { selectAllTasks } from "../store/taskSlice";
import { Link } from "react-router-dom";
import { IoFilterSharp, IoClose } from "react-icons/io5";
import { motion } from "framer-motion";

const AllTasks = () => {
  const tasks = useSelector(selectAllTasks);
  const [startDate, setStartDate] = useState(null);
  const [toggle, settoggle] = useState(false);
  const [endDate, setEndDate] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTasks = tasks.filter((task) => {
    const taskDate = new Date(task.startDate);
    const isDateInRange =
      (!startDate || taskDate >= startDate) &&
      (!endDate || taskDate <= endDate);
    const isStatusMatch =
      statusFilter === "All" || task.status === statusFilter;
    const isPriorityMatch =
      priorityFilter === "All" || task.priority === priorityFilter;
    const isSearchMatch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());

    return isDateInRange && isStatusMatch && isPriorityMatch && isSearchMatch;
  });

  return (
    <div className="w-[70%] mx-auto">
      <div className="mt-10">
        <h1 className="text-3xl ubuntu-bold my-8 text-center">
          <motion.h1
            initial={{ y: -200 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            whileHover={{ scale: 1.1 }}
          >
            Task Manager App
          </motion.h1>
        </h1>
        <div className="flex justify-between items-center">
          <div
            onClick={() => {
              settoggle(!toggle);
            }}
            className="flex justify-center items-center p-2 bg-indigo-500 rounded-xl"
          >
            {toggle ? (
              <IoClose className="text-xl text-white" />
            ) : (
              <IoFilterSharp className="text-xl text-white" />
            )}
          </div>
          <input
            className="bg-gray-200 p-2 w-full sm:w-[50%] rounded-xl"
            type="text"
            placeholder="Search tasks by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="text-indigo-500 font-semibold">
            All Task ({filteredTasks.length})
          </div>
        </div>
        <div
          className={`${
            toggle ? "flex" : "hidden"
          } mt-10 justify-between items-center sm:flex-row gap-4 flex-col-reverse`}
        >
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex flex-col sm:flex-row gap-2 items-center">
              <p className="font-bold text-xl #282c34">Filter </p>
              <div className="flex justify-center gap-[10px] sm:gap-2 flex-col sm:flex-row items-center">
                <input
                  className="bg-gray-200 p-2 rounded-xl w-[60vw] sm:w-auto appearance-none"
                  type="date"
                  value={startDate ? startDate.toISOString().split("T")[0] : ""}
                  onChange={(e) => setStartDate(new Date(e.target.value))}
                />
                <input
                  className="bg-gray-200 p-2 rounded-xl w-[60vw] sm:w-auto appearance-none"
                  type="date"
                  value={endDate ? endDate.toISOString().split("T")[0] : ""}
                  onChange={(e) => setEndDate(new Date(e.target.value))}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-col sm:flex-row items-center">
            <p className="font-bold text-xl #282c34">Sort </p>
            <div className="flex justify-center gap-[10px] sm:gap-3 flex-row items-center">
              <select
                className="bg-gray-200 p-2 rounded-xl"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <select
                className="bg-gray-200 p-2 rounded-xl"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="All">All Priority</option>
                <option value="P0">High</option>
                <option value="P1">Medium</option>
                <option value="P2">Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {filteredTasks.length > 0 ? (
        <div className="flex flex-wrap gap-y-4 gap-x-14 justify-center overflow-y-scroll mt-5 h-[80vh] sm:h-[80vh]">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
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
};

export default AllTasks;
