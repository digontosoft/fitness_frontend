import { useState } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
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
         <Button className="rounded-2xl">
           <FaArrowLeftLong />
         </Button>
         <div className="flex items-center gap-4 w-full overflow-hidden" >
           {/* Text Section */}
           <div className="flex flex-col justify-center w-full max-w-[calc(100%-104px)]" dir='rtl'>
             <h1 className="text-sm font-bold text-[#0A2533] truncate text-center">
               {recurringTasks?.title}
             </h1>
             <h1 className="text-xs font-normal text-[#97A2B0] truncate">
               {recurringTasks?.name}
             </h1>
           </div>
   
           {/* Image Section */}
           <div className="w-[104px] h-[84px] flex-shrink-0">
             {/* <img
               src={taskImage}
               alt=""
               className="w-full h-full object-cover rounded-[16px]"
             /> */}
           </div>
         </div>
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