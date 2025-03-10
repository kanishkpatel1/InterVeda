"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

function Feedback({ params }) {
    const [feedbackList, setFeedbackList] = useState([]);
    const router = useRouter();

    useEffect(() => {
        GetFeedback();
    }, [])

    const GetFeedback = async () => {
        const result = await db.select()
            .from(UserAnswer)
            .where(eq(UserAnswer.mockIdRef, params.interviewId))
            .orderBy(UserAnswer.id);

        console.log(result);
        setFeedbackList(result);
    }

    return (
        <div className="p-10 bg-white dark:bg-gray-900">
            {feedbackList?.length === 0 ?
                <h2 className='font-bold text-xl text-gray-500 dark:text-gray-300'>No Interview Feedback Record Found</h2>
                :
                <>
                    <h2 className='text-3xl font-bold text-green-500 dark:text-green-400'>Congratulation!</h2>
                    <h2 className='font-bold text-2xl text-gray-900 dark:text-gray-100'>Here is your interview feedback</h2>

                    <h2 className='text-sm text-gray-500 dark:text-gray-400'>Find below interview question with correct answer, Your answer, and feedback for improvement</h2>
                    {feedbackList && feedbackList.map((item, index) => (
                        <Collapsible key={index} className='mt-7'>
                            <CollapsibleTrigger className='p-2 bg-secondary rounded-lg flex justify-between my-2 text-left gap-7 w-full dark:bg-gray-800'>
                                {item.question} <ChevronsUpDown className='h-5 w-5' />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className='flex flex-col gap-2'>
                                    <h2 className='text-red-500 p-2 border rounded-lg dark:text-red-500 dark:bg-red-900'>{/* Dark Mode Rating */}<strong>Rating:</strong> {item.rating}</h2>
                                    <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900 dark:bg-red-800 dark:text-red-300'>
                                        <strong>Your Answer: </strong>{item.userAns}
                                    </h2>
                                    <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900 dark:bg-green-800 dark:text-green-300'>
                                        <strong>Correct Answer: </strong>{item.correctAns}
                                    </h2>
                                    <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-primary dark:bg-blue-900 dark:text-blue-200'>
                                        <strong>Feedback: </strong>{item.feedback}
                                    </h2>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    ))}
                </>
            }

            <Button onClick={() => router.replace('/dashboard')} className="mt-5">Go Home</Button>
        </div>
    )
}

export default Feedback;
