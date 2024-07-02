/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useForm, } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Link, useOutletContext } from "react-router-dom";
import { Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell } from "@/components/ui/table";
import { DateTimePicker } from "@/wels-components/DateTimePicker/DateTimePicker";
  

const Attendance = ({ onSessionCreate }) => {
  const { handleSessionCreate } = useOutletContext();
  const [courses, setCourses] = useState([]);
  const date = new Date()

  useEffect(() => {
    fetch('data.json') 
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        // console.log("eta koi", data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
    const [isSessionRunning, setIsSessionRunning] = useState(false);
    const [endTime, setEndTime] = useState(null); // Store end time here
    const [timeLeft, setTimeLeft] = useState(null);

    const onSubmit = (data, e) => {
      const { course_name, course_code, date, duration } = data;// Assuming duration is in minutes
      const sessionDetails = {
        course_name,
        course_code,
        date,
        duration
      };

      // Call parent component function to pass session details
      handleSessionCreate(sessionDetails);
      setIsSessionRunning(true);

      console.log("Session created with data:", data);
      e.target.reset();

      const currentTime = new Date();
      const durationInMillis = duration * 60 * 1000; // Convert minutes to milliseconds
      const endSessionTime = new Date(currentTime.getTime() + durationInMillis);
      
      setEndTime(endSessionTime); // Store end time

      const timeoutId = setTimeout(() => {
          setIsSessionRunning(false);
      }, durationInMillis); // Set timeout for duration in minutes

      // Calculate initial time left
      const initialTimeLeft = Math.ceil((endSessionTime.getTime() - currentTime.getTime()) / 1000);
      setTimeLeft(initialTimeLeft);

      // Update time left every second
      const intervalId = setInterval(() => {
          const currentTime = new Date();
          const remainingTime = Math.ceil((endSessionTime.getTime() - currentTime.getTime()) / 1000);
          setTimeLeft(remainingTime);

          if (remainingTime <= 0) {
              clearInterval(intervalId);
          }
      }, 1000);
  };

    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const CreateSessionForm = ({ course, onSubmit }) => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        // formState: { errors },
      } = useForm();
    console.log(watch("date"));

    const handleClosePopover = () => {
      reset(); // Reset form fields
      
    };

  
    return (
         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4  ">
          {/* course code and course name */}
            <div>
              <label htmlFor="courseDetails" className="">Course Name & Course Code</label>
                <div className="mt-1 flex">
                  <Input
                    type="text"
                    id="courseName"
                    defaultValue={`${course.course_name} `}
                    readOnly
                    {...register("course_name")}
                    className=" mr-2"
                  />
                  <Input
                    type="text"
                    id="courseCode"
                    defaultValue={`${course.code}`}
                    readOnly
                    {...register("course_code")}
                    
                  />
                  </div>
            </div>
            {/* date & time */}
            <div>
              <label htmlFor="date" className="">Session Date & Time</label>
              <div className="mt-1">
              <DateTimePicker className="" date={date}  
                type="text"
                id="date"
                defaultValue={new Date().toISOString().slice(0, 16)} 
                {...register("date")}
              />
              </div>
            </div>
            
            {/* Duration */}
            <div>
              <label htmlFor="duration" className="">Duration (in minutes)</label>
              <div className="mt-1">
              <Input
                type="number"
                id="duration"
                {...register("duration", { min: 0, value: 1 })}
              />
              </div>
            </div>
            <Button type="submit" onClick={handleClosePopover}>Create Session</Button>
          </form> 
    );
};



  return (
    <div>
      {/* teachers minimum info */}
      <div className="flex justify-center gap-20">
                <div className="p-10  ">
                    <p className="pb-1 text-3xl font-bold">Teachers' Name: Rudra Pratap Deb Nath</p> 
                    <p className="pt-1 text-xl ">Designation : Designation </p>
                    <p className="pt-1 text-xl ">Assigned Course : {courses.length} </p>
                    
                </div>
                <div className=" flex justify-center items-center">
                    <img className="inline-block h-36 w-36 rounded-full ring-8 ring-slate-400" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt=""/>
                </div>
            </div>
            <div>
                <hr className="border-2 " style={{ borderColor: '#CCCCCC' }} />
            </div>


            {isSessionRunning && (
                <div className="text-center text-2xl font-semibold text-green-500">
                    A session is currently running. Time left: {formatTime(timeLeft)}.
                </div>
            )}

            {/* info about assigned courses */}
            <div>
              <div className="overflow-x-auto p-10">
                <h1 className="text-3xl mb-4 font-bold text-center">Assigned Courses Details</h1>

                <Table>
                  <TableHeader>
                    <TableRow >
                      <TableHead className="p-3 text-center text-lg text-black">S.No</TableHead>
                      <TableHead className="p-3 text-center text-lg text-black">Course Name</TableHead>
                      <TableHead className="p-3 text-center text-lg text-black">Course Code</TableHead>
                      <TableHead className="p-3 text-center text-lg text-black">Program</TableHead>
                      <TableHead className="p-3 text-center text-lg text-black">Which Semester</TableHead>
                      <TableHead className="p-3 text-center text-lg text-black">Details</TableHead>
                      <TableHead className="p-3 text-center text-lg text-black">Action</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {courses.map((course, index) => (
                      <TableRow key={index}>
                        <TableCell className=" text-center ">{index + 1}</TableCell>
                        <TableCell className=" text-center ">{course.course_name}</TableCell>
                        <TableCell className=" text-center ">{course.code}</TableCell>
                        <TableCell className=" text-center ">{course.program}</TableCell>
                        <TableCell className=" text-center ">{course.sem}</TableCell>
                        <TableCell className=" text-center "><Link to={`/courseDetails/${course.id}`}><Button>View details</Button></Link></TableCell>
                        <TableCell className=" text-center "><Popover>
                            <PopoverTrigger><Button >Create Session</Button></PopoverTrigger>
                            <PopoverContent style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-200%, -100%)' }} className="w-96 shadow-slate-950 shadow-2xl"> 
                            {/* form for create session */}
                            <CreateSessionForm course={course} onSubmit={onSubmit} />
                            </PopoverContent>
                          </Popover></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                
              </div>
            </div>
    </div>
  );
};

export default Attendance;
