"use client";
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAIModal'
import { LoaderCircle } from 'lucide-react'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { useRouter } from 'next/navigation'

function AddNewInterview() {
    const [openDailog, setOpenDailog] = useState(false)
    const [jobPosition, setJobPosition] = useState();
    const [jobDesc, setJobDesc] = useState();
    const [jobExperience, setJobExperience] = useState();
    const [questionCount, setQuestionCount] = useState(5); // New state for the number of questions
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setJsonResponse] = useState([]);
    const router = useRouter();
    const { user } = useUser();

    const onSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        console.log(jobPosition, jobDesc, jobExperience, questionCount);

        // Update the input prompt with the questionCount
        const InputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}, Number of Questions: ${questionCount}. Based on the job position, description, and experience, generate ${questionCount} interview questions along with answers in JSON format. Provide the question and answer fields in JSON.`

        // AI generation
        const result = await chatSession.sendMessage(InputPrompt);
        const MockJsonResp = (result.response.text()).replace('```json', '').replace('```', '')
        console.log(JSON.parse(MockJsonResp));
        setJsonResponse(MockJsonResp);

        if (MockJsonResp) {
            const resp = await db.insert(MockInterview)
                .values({
                    mockId: uuidv4(),
                    jsonMockResp: MockJsonResp,
                    jobPosition: jobPosition,
                    jobDesc: jobDesc,
                    jobExperience: jobExperience,
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format('DD-MM-yyyy')
                }).returning({ mockId: MockInterview.mockId });

            console.log("Inserted ID:", resp)
            if (resp) {
                setOpenDailog(false);
                router.push('/dashboard/interview/' + resp[0]?.mockId)
            }
        } else {
            console.log("ERROR");
        }
        setLoading(false);
    }

    return (
        <div>
            <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all border-dashed dark:bg-gray-800 dark:border-gray-700 dark:text-white'
                onClick={() => setOpenDailog(true)}
            >
                <h2 className='text-lg text-center'>+ Add New</h2>
            </div>
            <Dialog open={openDailog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl dark:text-white">Tell us more about your job interview</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>
                                <div>
                                    <h2 className="dark:text-gray-400">Add Details about your job position/role, Job description, years of experience, and number of interview questions</h2>

                                    <div className='mt-7 my-3'>
                                        <label className="dark:text-gray-300">Job Role/Job Position</label>
                                        <Input placeholder="Ex. Full Stack Developer" required
                                            onChange={(event) => setJobPosition(event.target.value)}
                                            className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                        />
                                    </div>
                                    <div className=' my-3'>
                                        <label className="dark:text-gray-300">Job Description/ Tech Stack (In Short)</label>
                                        <Textarea placeholder="Ex. React, Angular, NodeJs, MySql etc"
                                            required
                                            onChange={(event) => setJobDesc(event.target.value)}
                                            className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                        />
                                    </div>
                                    <div className=' my-3'>
                                        <label className="dark:text-gray-300">Years of experience</label>
                                        <Input placeholder="Ex. 5" type="number" max="100"
                                            required
                                            onChange={(event) => setJobExperience(event.target.value)}
                                            className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                        />
                                    </div>
                                    <div className=' my-3'>
                                        <label className="dark:text-gray-300">Number of Interview Questions</label>
                                        <Input placeholder="Ex. 5" type="number" min="1" max="20"
                                            required
                                            onChange={(event) => setQuestionCount(event.target.value)}
                                            value={questionCount}
                                            className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                        />
                                    </div>
                                </div>
                                <div className='flex gap-5 justify-end'>
                                    <Button type="button" variant="ghost" onClick={() => setOpenDailog(false)} className="dark:text-white">Cancel</Button>
                                    <Button type="submit" disabled={loading} className="dark:text-white">
                                        {loading ? 
                                            <><LoaderCircle className='animate-spin' /> Generating from AI</> : 'Start Interview'
                                        }
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewInterview;
