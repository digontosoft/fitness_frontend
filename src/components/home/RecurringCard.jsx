import { useState } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import blueLogo from "../../assets/image/blueLogo.svg";
import { Button } from '../ui/button';
import { RecurringTasksCard } from './RecurringTasksCard';

const RecurringCard = ({recurringTasks, setRecurringTasks}) => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [recurringTaskModalOpen, setIsRecurringTaskModalOpen] = useState(false);
  return (
  <>
       <div
         className="sm:w-auto w-full h-24 flex gap-4 items-center justify-between px-4 py-2 bg-white border border-[#efefef] rounded-2xl shadow-lg cursor-pointer"
         onClick={() => {
           setSelectedTask(recurringTasks);
           setIsRecurringTaskModalOpen(true);
         }}
       >
        <div className="w-[95px] h-[84px] flex-shrink-0 overflow-hidden rounded-[16px]">
           <img
             src={blueLogo}
             alt=""
             className="w-full h-full object-cover"
           />
         </div>
        

         <div className="flex flex-col justify-center flex-1 min-w-0 text-right" dir="rtl">
           <h1 className="text-sm font-bold text-[#0A2533] truncate">
             {recurringTasks?.title}
           </h1>
           <h1 className="text-xs font-normal text-[#97A2B0] truncate">
             {recurringTasks?.name}
           </h1>
         </div>
 <Button className="rounded-2xl flex-shrink-0">
           <FaArrowLeftLong />
         </Button>
         
       </div>
       <RecurringTasksCard
         isRecurringModalOpen={recurringTaskModalOpen}
         setIsRecurringModalOpen={setIsRecurringTaskModalOpen}
         selectedTask={selectedTask}
         user_id={recurringTasks?.user_id}
         setRecurringTasks={setRecurringTasks}
       />
  </>
  )
}

export default RecurringCard