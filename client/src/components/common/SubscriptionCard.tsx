import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

// Feature type
interface Feature {
  icon: JSX.Element;
  title: string;
}

// Task type
interface Task {
  appCount: string;
  price: number;
  count: string;
}

import StarIcon from "../../assets/icons/icon_tstar.png";
import AIcon from "../../assets/icons/icon_a.png";
import CheckWhiteIcon from "../../assets/icons/icon_check_white.png";
import CheckBlackIcon from "../../assets/icons/icon_check_black.png";
import ListIcon from "../../assets/icons/icon_list.png";

interface SubscriptionCardProps{
    type: string,
    handleSubscribe: (name: string, plan: number, total: number) => void;
 }

// Card component
const SubscriptionCard: React.FC<SubscriptionCardProps> = ({type, handleSubscribe}) => {

  const [taskButtonState, setTaskState] = useState<boolean[]>([false, false, false, false]);
  const [WorkspaceButtonState, setWorkspaceState] = useState<boolean[]>([false, false, false, false]);
  const [appsButtonState, setAppspaceState] = useState<boolean[]>([false, false, false]);

  const [monthly, setMonthly] = useState(type == 'Mixiflow' ? 29 : 19);

  const [selectedTaskPrice, setTaskPrice] = useState(0);
  const [selectedTaskCount, setTaskCount] = useState('');
  const [selectedAppsPrice, setAppsPrice] = useState(0);
  const [selectedAppsCount, setAppsCount] = useState('');
  const [selectedWorkspacePrice, setWorkspacePrice] = useState(0);
  const [selectedWorkspaceCount, setWorkspaceCount] = useState('');

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const features: Feature[] = [
    { icon: <span><img src={StarIcon} alt="check" className="h-16 w-16 mr-2" /></span>, title: "mAI \n Included" },
    { icon: <span><img src={CheckWhiteIcon} alt="check" className="h-16 w-16 mr-2" /></span>, title: ' 500 tasks \n Per month' },
    { icon: <span><img src={AIcon} alt="check" className="h-16 w-16 mr-2" /></span>, title: '2 apps per \n Workspace' },
    { icon: <span><img src={ListIcon} alt="check" className="h-16 w-16 mr-2" /></span>, title: 'Create up to \n 2 Workspaces' },
  ];

  const tasks: Task[] = [
    { appCount: '1000 Tasks', price: 10, count:"1000" },
    { appCount: '2000 Tasks', price: 30, count:"2000"  },
    { appCount: '3000 Tasks', price: 60, count:"3000"  },
    { appCount: 'Unlimited', price: 99, count:"Unlimited"  },
  ];

  const workspaces: Task[] = [
    { appCount: '5 workspaces', price: 20, count:"5"  },
    { appCount: '10 workspaces', price: 40, count:"10"  },
    { appCount: '20 workspaces', price: 60, count:"20"  },
    { appCount: 'Unlimited', price: 99, count:"Unlimited"  }, //+ꝏ
  ];

  const apps: Task[] = [
    { appCount: '5 apps per workspace', price: 20, count:"5"  },
    { appCount: '10 apps per workspace', price: 40, count:"10"  },
    { appCount: 'Unlimited apps per workspace', price: 99, count:"Unlimited" },
  ];

  const onClickedTasks = (index:number, price:number) =>{

    if(taskButtonState[index]){
      {setTaskCount('500')};
      taskButtonState[index] = false;
      setMonthly(monthly - selectedTaskPrice);
      setTaskPrice(0);
    }else{
      setTaskState(taskButtonState.map((_, i) => (i === index ? true : false)));
      setMonthly(monthly - selectedTaskPrice + price);
      setTaskPrice(price);
    }
    

    setTaskCount(tasks[index].count);
  }

  const onClickedApps = (index:number, price:number) =>{
    
    if(appsButtonState[index]) 
    {
      {setAppsCount('2')};
      appsButtonState[index] = false;
      setMonthly(monthly - selectedAppsPrice);
      setAppsPrice(0);
    }else{
      setAppspaceState(appsButtonState.map((_, i) => (i === index ? true : false)));
      setMonthly(monthly - selectedAppsPrice + price);
      setAppsPrice(price);
    }
    setAppsCount(apps[index].count);
  }

  const onClickedWorkspaces = (index:number, price:number) =>{

    if(WorkspaceButtonState[index]){
      {setWorkspaceCount('2')};
      WorkspaceButtonState[index] = false;
      setMonthly(monthly - selectedWorkspacePrice);
      setWorkspacePrice(0);
    }else{
      setWorkspaceState(WorkspaceButtonState.map((_, i) => (i === index ? true : false)));
      setMonthly(monthly - selectedWorkspacePrice + price);
      setWorkspacePrice(price);
    }
    

    setWorkspaceCount(workspaces[index].count);
  }

  useEffect(()=>{

  },[]);

  return (
    
    <div className="min-w-screen flex flex-col h-screen w-full justify-center items-center">
      {isMobile ? (
        // Mobile layout: left on top, right on bottom
        <>
          {/* top */}
          <div className="flex-col space-y-4 justify-center items-center bg-black text-white h-5/12 pt-8 rounded-lg m-1.5 pb-4 w-full">
              <span className="flex text-2xl text-gray-400 font-semibold font-bold font-sf-pro ml-8">Subscribe to {type}</span>
              <div className="flex items-center mt-3 ml-8">
                <span className="w-6/12 justify-center text-left text-8xl text-white font-semibold mt-2 font-sf-pro">${monthly}</span>
                <span className="w-6/12 text-lg text-gray-400 font-semibold font-sf-pro">Per month <br/> Cancel anytime</span>
              </div>
              <div className="p-4 text-white flex justify-between items-center space-x-4">
                  <div className=" text-white flex flex-col justify-center items-center space-y-4">
                      <span className=""><img src={StarIcon} alt="check" className="h-18 w-20" /></span>
                      {type == 'Mixiflow' && <span className="text-xs text-gray-300 font-semibold font-sf-pro whitespace-pre-line text-center">mAI <br/> Included</span>}
                      {type == 'mAI' && <span className="text-xs text-gray-300 font-semibold font-sf-pro whitespace-pre-line text-center">Powerful <br/> mAI features</span>}
                  </div>
                  <div className=" text-white flex flex-col items-center space-y-4">
                    <span className=""><img src={CheckWhiteIcon} alt="check" className="h-18 w-20" /></span>
                    <span className="text-xs text-gray-300 font-semibold font-sf-pro whitespace-pre-line text-center">{selectedTaskPrice > 0 ? selectedTaskCount : 500} tasks <br/> Per month</span>
                  </div>
                  <div className=" text-white flex flex-col items-center space-y-4">
                    <span className=""><img src={AIcon} alt="check" className="h-18 w-20" /></span>
                    {type == 'Mixiflow' && <span className="text-xs text-gray-300 font-semibold font-sf-pro whitespace-pre-line text-center">{selectedAppsPrice > 0 ? selectedAppsCount : 2} { selectedAppsCount == 'Unlimited' ? <br/> : ''} apps per <br/> Workspace</span>}
                    {type == 'mAI' && <span className="text-xs text-gray-300 font-semibold font-sf-pro whitespace-pre-line text-center">App <br/> Actions</span>}
                  </div>
                  <div className=" text-white flex flex-col items-center space-y-4">
                    <span className=""><img src={ListIcon} alt="check" className="h-18 w-20" /></span>
                    <span className="text-xs text-gray-300 font-semibold font-sf-pro whitespace-pre-line text-center">Create up to<br/>{selectedWorkspacePrice > 0 ? selectedWorkspaceCount : 2 }{ selectedWorkspaceCount == 'Unlimited' ? <br/> : ''}  Workspaces</span>
                  </div>
              </div>
          </div>
          {/* bottom */}
          <div className="flex-1 flex justify-center items-center  bg-white text-black h-1/2 w-full overflow-y-auto mb-20">
              <div className="w-11/12 h-full overflow-y-auto pt-10 scrollbar-hide">
                <h3 className="text-2xl font-semibold font-sf-pro text-black">Need <span className="text-2xl font-semibold text-custom-task-text font-sf-pro">More Tasks?</span> </h3>
                <div className="mt-4">
                  {tasks.map((task, index) => (
                  <div key={index}
                      className={`${
                      taskButtonState[index] ? "bg-custom-gray border-black border-4" : "border-gray-300 border-gray-300 border-2"
                      } rounded-lg  p-8 flex justify-between hover:bg-custom-gray items-center mt-3 cursor-pointer`}  
                      onClick={() => onClickedTasks(index, task.price)}>
                      <span className="text-lg text-left font-sf-pro">{task.appCount}</span>
                      <span className="text-lg text-right font-bold font-sf-pro">+${task.price}</span>
                  </div>
                  ))}
                </div>

                {type == 'Mixiflow' && <>
                  <h3 className="text-2xl font-semibold mt-10 font-sf-pro text-black">Want <span className="text-2xl font-semibold text-custom-task-text font-sf-pro">to Add More Apps?</span></h3>
                <div className="mt-4">
                  {apps.map((task, index) => (
                    <div key={index}
                    className={`${
                          appsButtonState[index] ? "bg-custom-gray border-black border-4" : "border-gray-300 border-gray-300 border-2"
                          } rounded-lg border-2 p-8 flex justify-between hover:bg-custom-gray items-center mt-3 cursor-pointer`}  
                          onClick={() => onClickedApps(index, task.price)}>
                      <span className="text-lg text-left font-sf-pro">{task.appCount}</span>
                      <span className="text-lg text-right font-bold font-sf-pro">+${task.price}</span>
                  </div>
                  ))}
                </div>

                <h3 className="text-2xl font-semibold mt-10 font-sf-pro text-black">Looking <span className="text-2xl font-semibold text-custom-task-text font-sf-pro">for More Workspaces?</span></h3>
                <div className="mt-4 mt-10">
                  {workspaces.map((task, index) => (
                    <div key={index}
                    className={`${
                          WorkspaceButtonState[index] ? "bg-custom-gray border-black border-4" : "border-gray-300 border-gray-300 border-2"
                          } rounded-lg border-2 p-8 flex justify-between hover:bg-custom-gray items-center mt-3 cursor-pointer`}  
                          onClick={() => onClickedWorkspaces(index, task.price)}>
                      <span className="text-lg text-left font-sf-pro">{task.appCount}</span>
                      <span className="text-lg text-right font-bold font-sf-pro">+${task.price}</span>
                  </div>
                  ))}
                </div>
                </>}
              </div>
          </div>
          
          <div className="fixed bottom-0 left-0 w-full flex items-center justify-between px-8 py-3 bg-gray-800 bg-white">
            <div className="w-1/2 flexjustify-center items-center">
              <div className="text-center text-black text-2xl font-bold">{type}</div>
            </div>
            <div className="w-1/2 flex justify-center items-center">
                <button className="bg-black text-lg text-white hover:bg-gray-600 rounded-full m-2 p-2 pl-4 pr-4 font-sf-pro"
                onClick={() => handleSubscribe('name', 29, monthly)}>Subscribe for $ {monthly.toString()}/m</button>
            </div>
          </div>
        </>
      ) : (
        // Desktop layout: left and right side by side
          <>
          {/* Main Content Area */}
          <div className="flex w-full  h-full">
            {/* Left Part */}
            <div className="flex-1 flex justify-end items-center h-screen bg-black text-white h-full ">
              <div className="w-1/2">
                  <h2 className="text-2xl text-gray-500 font-semibold font-bold font-sf-pro">Subscribe to {type}</h2>

                  <div className="flex justify-between items-center mt-3">
                        <span className="w-1/2 text-left text-8xl text-white font-semibold mt-2 font-sf-pro">${monthly}</span>
                        <span className="w-2/3 text-xl text-gray-500 font-semibold font-sf-pro">Per month <br/> Cancel anytime</span>
                  </div>

                  <hr className="border-gray-800 border mt-10 w-8/12" />

                  <ul className="mt-4">
                    <li className="flex items-center mt-10">
                      <span className="mr-2"><img src={StarIcon} alt="check" className="h-20 w-20 mr-2" /></span>
                      <span className="border-l border-gray-800 h-10"></span>
                      { type == 'Mixiflow' && <span className=" ml-8 w-1/2 text-2xl text-gray-300 font-semibold font-sf-pro whitespace-pre-line">mAI <br/> Included</span>}
                      { type == 'mAI' && <span className=" ml-8 w-1/2 text-2xl text-gray-300 font-semibold font-sf-pro whitespace-pre-line">Powerful <br/> mAI features</span>}
                    </li>
                    <li className="flex items-center mt-10">
                      <span className="mr-2"><img src={CheckWhiteIcon} alt="check" className="h-20 w-20 mr-2" /></span>
                      <span className="border-l border-gray-800 h-10"></span>
                      <span className=" ml-8 w-1/2 text-2xl text-gray-300 font-semibold font-sf-pro whitespace-pre-line">{selectedTaskPrice > 0 ? selectedTaskCount : 500} tasks <br/> Per month</span>
                    </li>
                    <li className="flex items-center mt-10">
                      <span className="mr-2"><img src={AIcon} alt="check" className="h-20 w-20 mr-2" /></span>
                      <span className="border-l border-gray-800 h-10"></span>
                      {type == 'Mixiflow' && <span className=" ml-8 w-1/2 text-2xl text-gray-300 font-semibold font-sf-pro whitespace-pre-line">{selectedAppsPrice > 0 ? selectedAppsCount : 2} apps per <br/> Workspace</span>}
                      {type == 'mAI' && <span className=" ml-8 w-1/2 text-2xl text-gray-300 font-semibold font-sf-pro whitespace-pre-line">App <br/> Actions</span>}
                    </li>
                    {type == 'Mixiflow' && <li className="flex items-center mt-10">
                      <span className="mr-2"><img src={ListIcon} alt="check" className="h-20 w-20 mr-2" /></span>
                      <span className="border-l border-gray-800 h-10"></span>
                      <span className=" ml-8 w-1/2 text-2xl text-gray-300 font-semibold font-sf-pro whitespace-pre-line">Create up to <br/> {selectedWorkspacePrice > 0 ? selectedWorkspaceCount : 2} Workspaces</span>
                    </li>}
                  </ul>
              </div>
            </div>
            
            {/* Right Part */}
            <div className="flex-1 flex justify-start  bg-white text-black h-full overflow-y-auto">
              <div className="pl-20 w-4/5 overflow-y-auto scrollbar-hide pt-10">
                <h3 className="text-2xl font-semibold font-sf-pro text-black">Need <span className="text-2xl font-semibold text-custom-task-text font-sf-pro">More Tasks?</span> </h3>
                <div className="mt-4">
                  {tasks.map((task, index) => (
                  <div key={index}
                      className={`${
                      taskButtonState[index] ? "bg-custom-gray border-black border-4" : "border-gray-300 border-gray-300 border-2"
                      } rounded-lg  p-8 flex justify-between hover:bg-custom-gray items-center mt-3 cursor-pointer`}  
                      onClick={() => onClickedTasks(index, task.price)}>
                      <span className="text-lg text-left font-sf-pro">{task.appCount}</span>
                      <span className="text-lg text-right font-bold font-sf-pro">+${task.price}</span>
                  </div>
                  ))}
                </div>
                {type == 'Mixiflow' && <>
                  <h3 className="text-2xl font-semibold mt-10 font-sf-pro text-black">Want <span className="text-2xl font-semibold text-custom-task-text font-sf-pro">to Add More Apps?</span></h3>
                <div className="mt-4">
                  {apps.map((task, index) => (
                    <div key={index}
                    className={`${
                          appsButtonState[index] ? "bg-custom-gray border-black border-4" : "border-gray-300 border-gray-300 border-2"
                          } rounded-lg border-2 p-8 flex justify-between hover:bg-custom-gray items-center mt-3 cursor-pointer`}  
                          onClick={() => onClickedApps(index, task.price)}>
                      <span className="text-lg text-left font-sf-pro">{task.appCount}</span>
                      <span className="text-lg text-right font-bold font-sf-pro">+${task.price}</span>
                  </div>
                  ))}
                </div>

                <h3 className="text-2xl font-semibold mt-10 font-sf-pro text-black">Looking <span className="text-2xl font-semibold text-custom-task-text font-sf-pro">for More Workspaces?</span></h3>
                <div className="mt-4 mt-10">
                  {workspaces.map((task, index) => (
                    <div key={index}
                    className={`${
                          WorkspaceButtonState[index] ? "bg-custom-gray border-black border-4" : "border-gray-300 border-gray-300 border-2"
                          } rounded-lg border-2 p-8 flex justify-between hover:bg-custom-gray items-center mt-3 cursor-pointer`}  
                          onClick={() => onClickedWorkspaces(index, task.price)}>
                      <span className="text-lg text-left font-sf-pro">{task.appCount}</span>
                      <span className="text-lg text-right font-bold font-sf-pro">+${task.price}</span>
                  </div>
                  ))}
                </div>
                </>}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="fixed bottom-0 left-0 w-full flex items-center justify-between px-8 py-3 bg-gray-800 bg-white">
            <div className="w-1/2 flexjustify-center items-center">
              <div className="text-center text-black text-2xl font-bold">{type}</div>
            </div>
            <div className="w-1/2 flex justify-center items-center">
                <button className="bg-black text-2xl text-white hover:bg-gray-600 rounded-full m-2 p-2 pl-4 pr-4 font-sf-pro"
                onClick={() => handleSubscribe('name', 29, monthly)}>Subscribe for $ {monthly.toString()}/m</button>
            </div>
          </div>
          </>
      )}
    </div>

  );
};

export default SubscriptionCard;



