import { Lightbulb, Volume2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {
  const [voices, setVoices] = useState([]);

  // Load voices on mount
  useEffect(() => {
    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      setVoices(allVoices);
    };

    loadVoices();

    // Listen for voice list change (needed on some browsers like Chrome)
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const textToSpeach = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);

      // Find an Indian accent voice
      const indianVoice = voices.find(
        (voice) => voice.lang === 'en-IN' || voice.name.includes('India')
      );

      // Use Indian accent if available, otherwise default to the first voice
      speech.voice = indianVoice || voices[0];

      // Set pitch and rate
      speech.pitch = 1; // Normal pitch
      speech.rate = 1;  // Normal rate

      window.speechSynthesis.speak(speech);
    } else {
      alert('Sorry, your browser does not support text-to-speech');
    }
  };

  return (
    mockInterviewQuestion && (
      <div className="p-5 border rounded-lg my-10 bg-white dark:bg-gray-800">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockInterviewQuestion.map((question, index) => (
            <h2
              key={index} // Add the unique 'key' prop here
              className={`p-2 border rounded-full text-xs md:text-sm text-center cursor-pointer ${
                activeQuestionIndex == index && 'bg-primary text-white'
              } dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600`}
            >
              Question #{index + 1}
            </h2>
          ))}
        </div>
        <h2 className="my-5 text-md md:text-lg dark:text-white">
          {mockInterviewQuestion[activeQuestionIndex]?.question}
        </h2>
        <button
          className="cursor-pointer flex items-center gap-2 p-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors dark:bg-primary-900 dark:hover:bg-primary-700"
          onClick={() => textToSpeach(mockInterviewQuestion[activeQuestionIndex]?.question)}
        >
          <Volume2 className="text-white" />
          <span>Listen Audio</span>
        </button>
        
        <div className="border rounded-lg p-5 bg-blue-100 mt-20 dark:bg-blue-900 dark:text-white">
          <h2 className="flex gap-2 items-center text-primary dark:text-white">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className="text-sm text-primary my-2 dark:text-gray-400">{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
        </div>
      </div>
    )
  );
}

export default QuestionsSection;
