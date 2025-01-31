'use client';
import { useState, useEffect } from 'react';
import { Users, Target, Award, Briefcase, BookOpen, Rocket } from 'lucide-react';
import Header from '../dashboard/_components/Header';
import { useUser } from '@clerk/nextjs';


const AboutUsPage = () => {
  const [activeTab, setActiveTab] = useState('mission');
  const [darkMode, setDarkMode] = useState(false);

 
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(false);

 

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

  // Toggle dark mode and update localStorage
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());

    // Apply dark mode immediately to the body without reloading
    if (newDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  const tabContent = {
    mission: {
      icon: <Target className="mr-2 text-indigo-600 dark:text-indigo-400" />,
      content: (
        <div className="space-y-4 text-gray-600 dark:text-gray-300">
          <p className="text-base md:text-lg">
            InterVeda is on a mission to revolutionize interview preparation by providing personalized, intelligent AI coaching tailored to individual career aspirations.
          </p>
          <p className="text-base md:text-lg">
            With InterVeda, the goal is to bridge the gap between preparation and success, empowering users to unlock their full potential.
          </p>
        </div>
      )
    },
    story: {
      icon: <BookOpen className="mr-2 text-indigo-600 dark:text-indigo-400" />,
      content: (
        <div className="space-y-4 text-gray-600 dark:text-gray-300">
          <p className="text-base md:text-lg">
            The idea for InterVeda was born from firsthand experiences with the challenges of interview preparation. As developers, we wanted to create a platform that simplifies the process and builds confidence in individuals.
          </p>
          <p className="text-base md:text-lg">
            This journey has been a testament to the power of passion and innovation, leading to the creation of an impactful tool for career growth.
          </p>
        </div>
      )
    },
    approach: {
      icon: <Rocket className="mr-2 text-indigo-600 dark:text-indigo-400" />,
      content: (
        <div className="space-y-4 text-gray-600 dark:text-gray-300">
          <p className="text-base md:text-lg">
            InterVeda leverages advanced AI algorithms to generate dynamic, contextually relevant interview questions based on your professional background and goals.
          </p>
          <p className="text-base md:text-lg">
            Through real-time analysis and feedback, the platform provides actionable insights, enabling users to improve with every mock interview attempt.
          </p>
        </div>
      )
    }
  };

  const coreValues = [
    {
      icon: <Award className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mb-4" />,
      title: "Continuous Learning",
      description: "Always striving to improve and provide better tools for growth."
    },
    {
      icon: <Users className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mb-4" />,
      title: "Empowerment",
      description: "Supporting individuals in building confidence and achieving professional success."
    },
    {
      icon: <Briefcase className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mb-4" />,
      title: "Excellence",
      description: "Delivering high-quality, impactful features to simplify interview preparation."
    }
  ];

  return (
    <>
      <Header toggleDarkMode={toggleDarkMode} />
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              About InterVeda
            </h1>
            <p className={`mt-4 max-w-xl mx-auto text-base sm:text-lg md:text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} px-4`}>
              Empowering professionals to ace interviews through intelligent, personalized AI coaching
            </p>
          </div>

          <div className={`shadow-lg rounded-lg overflow-hidden mb-8 sm:mb-12 md:mb-16 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>

            <div className="flex flex-col sm:flex-row border-b">
              {Object.keys(tabContent).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full sm:flex-1 py-3 sm:py-4 px-4 sm:px-6 flex items-center justify-center 
                    ${activeTab === tab 
                      ? 'bg-indigo-700 text-white border-b-2 border-indigo-600'  // Active tab background color in dark mode (blue)
                      : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'}`}
                >
                  {tabContent[tab].icon}
                  <span className="hidden sm:inline">
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </span>
                </button>
              ))}
            </div>
            <div className="p-4 sm:p-6 md:p-8">
              {tabContent[activeTab].content}
            </div>
          </div>

          <section className={`py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`font-bold text-3xl ${darkMode ? 'text-white' : 'text-black'}`}>Our Developers</h2>
            <h2 className={`text-md ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Our Talented Developers of InterVeda</h2>

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[ 
                { name: "Palak Dhakrey", role: "Frontend Developer", img: "palak1.png" },
                { name: "Govind Sharma", role: "Database Developer", img: "govind.jpg" },
                { name: "Ritik Chauhan", role: "UI Developer", img: "ritik.jpg" },
                { name: "Kanishk Patel", role: "Backend Developer", img: "kanishk.png" }
              ].map((dev, index) => (
                <div key={index} className={`block rounded-xl border ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} border-gray-200 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10`}>
                  <img className="h-26 w-24 rounded-full object-cover mx-auto" src={dev.img} alt={dev.name} />
                  <h2 className={`mt-4 text-xl font-bold text-center ${darkMode ? 'text-white' : 'text-black'}`}>{dev.name}</h2>
                  <p className={`mt-1 text-sm text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{dev.role}</p>
                </div>
              ))}
            </div>
          </section>


        </div>
      </div>
      <footer className="py-6 text-center bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
        &copy; 2025 InterVeda. All rights reserved.
      </footer>
    </>
  );
};

export default AboutUsPage;