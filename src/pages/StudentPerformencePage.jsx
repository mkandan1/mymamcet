import React, { useState } from 'react'
import { PageHeader } from '../components/PageHeader'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
    Avatar
  } from "@material-tailwind/react";

export const StudentPerformencePage = () =>{
    return(
        <>
        <PerformenceAnalysis/>
        </>
    )
}

const PerformenceAnalysis = () =>{
    //Defining the Variables
    const SProfileImg = "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    const Sname = "Elamaran E";
    const SRollNo = 812021205013;
    const SDept = "IT"; 
    
    return(
        <div className='min-h-screen w-screen bg-[#EFF2F4] pr-6 pb-10'>
        <div className='h-full pt-24 md:ml-96'>
            <div className="h-full w-full bg-blue-500 grid grid-cols-2">
                <div className='h-auto w-80'>
                <Card className="w-80">
                    <CardHeader floated={false} className='text-center'>
                        <Avatar src= {SProfileImg} alt="avatar" size="xxl" className='mb-4 mt-2' />
                        <Typography variant="h5" color="blue-gray" >
                            {SRollNo}
                        </Typography>
                        <Typography color="blue-gray" variant='h6'>
                            {Sname}
                        </Typography>
                        <Typography color="blue-gray" variant='h6'>
                            {SDept}
                        </Typography>
                    </CardHeader>
                    <CardBody className="text-center">
                        <Typography variant="p" color="blue-gray" className="mb-2">
                        These are in an old style of English. Try to understand them, because the English that we speak today is based on what our great, great, great, great grandparents spoke before!
                        </Typography>
                    </CardBody>
                    <CardFooter></CardFooter>
                    </Card>
                </div>
                <div className='grid grid-rows-2'>
                    <div>
                        g child 1
                    </div>
                    <div>
                        g child 2
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
}