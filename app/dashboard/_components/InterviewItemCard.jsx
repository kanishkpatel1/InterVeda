import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaTrash } from 'react-icons/fa'; // Ensure react-icons is installed

function InterviewItemCard({ interview, onDelete }) {
  const router = useRouter();

  const onStart = () => {
    router.push('/dashboard/interview/' + interview?.mockId);
  };

  const onFeedbackPress = () => {
    router.push('/dashboard/interview/' + interview.mockId + '/feedback');
  };

  const handleDelete = () => {
    if (typeof onDelete === 'function') { // Check if onDelete is a function
      onDelete(interview.id); // Call the onDelete function passed from the parent
    } else {
      console.error('onDelete is not a function');
    }
  };

  return (
    <div className='border border-gray-300 dark:border-gray-700 shadow-sm rounded-lg p-3 relative bg-white dark:bg-gray-800'>
      <button
        onClick={handleDelete}
        className='absolute top-2 right-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600'
      >
        <FaTrash className='w-5 h-5' />
      </button>
      <h2 className='font-bold text-primary dark:text-white'>{interview?.jobPosition}</h2>
      <h2 className='text-sm text-gray-600 dark:text-gray-400'>{interview?.jobExperience} Years of Experience</h2>
      <h2 className='text-xs text-gray-400 dark:text-gray-500'>Created At: {interview.createdAt}</h2>
      <div className='flex justify-between mt-2 gap-5'>
        <Button size="sm" variant="outline" className="w-full dark:text-white dark:border-gray-600 dark:hover:bg-gray-700" onClick={onFeedbackPress}>
          Feedback
        </Button>
        <Button size="sm" className="w-full dark:text-white dark:bg-primary dark:hover:bg-primary-700" onClick={onStart}>
          Start
        </Button>
      </div>
    </div>
  );
}

export default InterviewItemCard;
