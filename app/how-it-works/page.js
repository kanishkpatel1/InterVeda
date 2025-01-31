"use client";
import React, { useState, useEffect } from "react";
import { Bot, UserCheck, Settings, Play, Send, BarChart, Repeat } from "lucide-react"; // Changed ChartBar to BarChart
import Header from '../dashboard/_components/Header';

const HowItWorksPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for the user's stored dark mode preference in localStorage
    const storedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(storedDarkMode);

    // Apply the dark mode class to the body
    if (storedDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, []);

  const steps = [
    {
      icon: <UserCheck size={48} className="text-indigo-600 dark:text-indigo-400" />,
      title: "Sign Up or Log In",
      description: "Create an account or log in using Clerk. Build a personalized profile that tracks your interview journey and stores preferences."
    },
    {
      icon: <Settings size={48} className="text-indigo-600 dark:text-indigo-400" />,
      title: "Choose Your Interview Type",
      description: "Select from technical, behavioral, or mixed interviews. Customize difficulty, topics, and duration to match your career goals."
    },
    {
      icon: <Play size={48} className="text-indigo-600 dark:text-indigo-400" />,
      title: "Start the Mock Interview",
      description: "Our AI generates dynamic, contextually relevant questions powered by Gemini. One question at a time keeps you focused and engaged."
    },
    {
      icon: <Send size={48} className="text-indigo-600 dark:text-indigo-400" />,
      title: "Submit Your Answers",
      description: "Respond via text or multiple-choice options. Our intuitive interface tracks your responses and provides a seamless experience."
    },
    {
      icon: <BarChart size={48} className="text-indigo-600 dark:text-indigo-400" />, // Replaced ChartBar with BarChart
      title: "Receive Real-Time Feedback",
      description: "Get instant, AI-powered analysis of your responses. Understand your strengths, areas for improvement, and receive detailed scoring."
    },
    {
      icon: <Repeat size={48} className="text-indigo-600 dark:text-indigo-400" />,
      title: "Continue Practicing",
      description: "Access your interview history, track progress, and keep refining your skills with unlimited mock interviews and adaptive challenges."
    }
  ];

  return (
    <>
      <Header toggleDarkMode={() => setDarkMode(!darkMode)} />

    
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8`}>
      {/* Include the Header component */}

      <div className="container mx-auto px-4 ">
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
            <Bot className="inline-block mr-3 text-indigo-600" size={48} />
            InterVeda: Your Interview Preparation Companion
          </h1>
          <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Master your interviews with AI-powered practice and personalized insights
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.title} 
              className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-transform hover:scale-105 
                          ${darkMode ? 'text-white' : 'text-gray-800'}`
              }
            >
              <div className="flex items-center mb-4">
                {step.icon}
                <h2 className={`ml-4 text-2xl font-semibold`}>
                  Step {index + 1}: {step.title}
                </h2>
              </div>
              <p className={`text-gray-600 dark:text-gray-300`}>{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a 
            href="/dashboard" 
            className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg hover:bg-indigo-700 transition-colors"
          >
            Start Your Interview Journey
          </a>
        </div>
      </div>
    </div>
    <footer className="py-6 text-center bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
        &copy; 2025 InterVeda. All rights reserved.
      </footer>
    </>
  );
};

export default HowItWorksPage;
