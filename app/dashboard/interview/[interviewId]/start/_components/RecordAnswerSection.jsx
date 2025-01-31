"use client";

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAIModal';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
  const [userAnswer, setUserAnswer] = useState('');
  const [inputMethod, setInputMethod] = useState('speak'); // Added state for input method (speak or write)
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: false,
    useLegacyResults: false
  });

  useEffect(() => {
    // Log and process the speech-to-text results
    results?.map((result) => {
      console.log(result);  // Debugging the individual result
      setUserAnswer((prevAns) => prevAns + result?.transcript);
    });
  }, [results]);

  useEffect(() => {
    // Trigger the update of user answer when speech stops and answer is more than 10 characters
    if (!isRecording && userAnswer?.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer, isRecording]);

  const StartStopRecording = async () => {
    console.log('Button clicked, isRecording:', isRecording);  // Log the current recording state
    if (isRecording) {
      console.log('Stopping recording...');
      stopSpeechToText();  // Stop recording
    } else {
      console.log('Starting recording...');
      startSpeechToText(); // Start recording
    }
  };

  const UpdateUserAnswer = async () => {
    console.log('User Answer:', userAnswer); // Debugging the answer
    setLoading(true);

    // Prepare feedback prompt for the AI model
    const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, User Answer: ${userAnswer}, Please give us a rating and feedback in JSON format.`;

    try {
      // Send the feedback prompt to the chat model
      const result = await chatSession.sendMessage(feedbackPrompt);
      console.log('AI Response:', result.response.text()); // Log raw AI response

      const mockJsonResp = result.response.text().replace('```json', '').replace('```', ''); // Clean up response
      const JsonFeedbackResp = JSON.parse(mockJsonResp); // Parse the JSON response
      console.log('Parsed Feedback Response:', JsonFeedbackResp);

      // Save the user answer along with the feedback in the database
      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-yyyy')
      });

      if (resp) {
        toast('User Answer recorded successfully');
        setUserAnswer('');
        setResults([]);
      }

      setResults([]);
      setLoading(false);
    } catch (error) {
      console.error('Error updating user answer:', error); // Handle any errors during the process
      toast.error('Error recording user answer');
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col">
      {/* Input Method Toggle */}
      <div className="flex gap-5 my-5">
        <Button
          variant={inputMethod === 'speak' ? 'outline' : 'default'}
          onClick={() => setInputMethod('speak')}
          className="dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
        >
          Speak Answer
        </Button>
        <Button
          variant={inputMethod === 'write' ? 'outline' : 'default'}
          onClick={() => setInputMethod('write')}
          className="dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
        >
          Write Answer
        </Button>
      </div>

      {/* Conditionally Render Based on Input Method */}
      {inputMethod === 'speak' ? (
        // Webcam and Speech to Text section
        <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5 dark:bg-gray-900">
          <Image
            src={'/webcam.png'}
            width={200}
            height={200}
            className="absolute"
          />
          <Webcam
            mirrored={true}
            style={{
              height: 500,
              width: 500,
              zIndex: 10,
            }}
          />
          {/* Record Answer Button */}
          <Button
            disabled={loading}
            variant="outline"
            className="my-10 dark:text-white dark:border-white dark:hover:bg-gray-700"
            onClick={StartStopRecording}
          >
            {isRecording ? (
              <h2 className="text-red-600 animate-pulse flex gap-2 items-center">
                <StopCircle />
                Stop Recording
              </h2>
            ) : (
              <h2 className="text-primary flex gap-2 items-center">
                <Mic />
                Record Answer
              </h2>
            )}
          </Button>
        </div>
      ) : (
        // Text Input section
        <div className="flex flex-col mt-20">
          <textarea
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your answer here"
            className="p-3 border rounded-lg w-96 h-32 dark:bg-gray-800 dark:text-white dark:border-gray-700"
          />
          <Button
            disabled={loading || userAnswer.length < 1}
            variant="outline"
            className="my-10 dark:text-white dark:border-white dark:hover:bg-gray-700"
            onClick={UpdateUserAnswer}
          >
            Submit Answer
          </Button>
        </div>
      )}
    </div>
  );
}

export default RecordAnswerSection;
