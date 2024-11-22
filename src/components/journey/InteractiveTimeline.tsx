'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image';
import { useTheme } from '@/components/general/GradientBackground'

interface TimelineEvent {
  date: string
  title: string
  description: string
  icon: string
}

const timelineEvents: TimelineEvent[] = [
  {
    date:"2022-01 - Present",
    title: "Daffodil International University",
    description: "Currently a university student at Daffodil International University, pursuing a degree in Computer Science and Engineering (CSE) since 2022. Passionate about Machine Learning, Competitive Programming, UI/UX designing, and software development, with a strong drive for innovation and problem-solving in technology.",
    icon: "/journey_logo/ml.svg"
  },
  {
    date: "2018-2020",
    title: "Birshrestha Noor Mohammad Public College",
    description: "Science student from 2018 to 2020, with a strong academic foundation and a passion for learning. Developed analytical and problem-solving skills during college, fostering a keen interest in technology and design.",
    icon: "/journey_logo/uiux.svg"
  },
  {
    date: "2016-2018",
    title: "Shibchar Nandakumar Institution",
    description: "Completed SSC at 2018, achieving a GPA of 5, showcasing academic excellence and a strong foundation in education.",
    icon: "/journey_logo/school.svg"
  },
  {
    date: "2015-2016",
    title: "Shibchar Nandakumar Institution",
    description: "Completed JSC in 2016, followed by SSC from 2016 to 2018 with a GPA of 5, reflecting consistent academic excellence.",
    icon: "/journey_logo/school.svg"
  },
  // {
  //   date: "2022-07",
  //   title: "Internship at Arab Bank",
  //   description: "Gained practical experience working with data and analytics, and building machine learning models.",
  //   icon: "/journey_logo/arabbank.svg"
  // },
  // {
  //   date: "2021-05",
  //   title: "Google Professional Certified",
  //   description: "Achieved the Google Professional Data Analytics Certificate, mastering the foundations of data analytics, data visualization, and data quality.",
  //   icon: "https://images.credly.com/size/340x340/images/7abb071f-772a-46fe-a899-5a11699a62dc/GCC_badge_DA_1000x1000.png"
  // },
  // {
  //   date: "2019-09",
  //   title: "University",
  //   description: "Embarked on a transformative journey in Data Science and Artificial Intelligence at Princess Sumaya University for Technology, culminating in a successful graduation in 2023 with a commendable 3.23 GPA.",
  //   icon: "/journey_logo/psut.svg"
  // },
]

const TimelineEvent: React.FC<{ event: TimelineEvent; isActive: boolean; isLeft: boolean; index: number }> = ({ 
  event, 
  isActive, 
  isLeft,
}) => {
  const containerVariants = {
    offscreen: { 
      opacity: 0,
      y: 50
    },
    onscreen: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.1,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.5,
        ease: "easeIn"
      }
    }
  }

  const contentVariants = {
    inactive: {
      scale: 1,
      opacity: 0.9,
      transition: {
        duration: 0.3
      }
    },
    active: {
      scale: 1.02,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  }

  const iconVariants = {
    inactive: {
      scale: 1,
      transition: {
        duration: 0.3
      }
    },
    active: {
      scale: 1.1,
      transition: {
        duration: 0.3
      }
    }
  }
  const { isDark } = useTheme()

  return (
    <motion.div 
      className={`mb-12 flex items-center ${isLeft ? 'flex-row-reverse' : 'flex-row'}`}
      variants={containerVariants}
      initial="offscreen"
      whileInView="onscreen"
      exit="exit"
      viewport={{ 
        once: false, 
        margin: "-100px",
        amount: 0.2 
      }}
    >
      <motion.div 
        className={`w-1/2 ${isLeft ? 'text-right pr-8' : 'text-left pl-8'}`}
        variants={contentVariants}
        animate={isActive ? "active" : "inactive"}
      >
        <div className={`text-sm font-semibold ${isDark? 'text-indigo-400':'text-indigo-600'} mb-1`}>{event.date}</div>
        <h3 className={`text-xl font-bold mb-2 ${isDark? 'text-white':'text-black'}`}>{event.title}</h3>
        <p className={`${isDark? 'text-gray-300':'text-gray-500'} text-sm`}>{event.description}</p>
      </motion.div>
      <motion.div 
        className={`flex items-center justify-center w-16 h-16 rounded-full ${isDark? 'bg-gray-800':'bg-gray-300'} border-4 border-indigo-700 text-2xl z-10 overflow-hidden`}
        variants={iconVariants}
        animate={isActive ? "active" : "inactive"}
      >
        <Image 
          src={event.icon} 
          width={36} 
          height={36} 
          alt="Logo" 
          className="object-contain"
        />
      </motion.div>
      <div className="w-1/2"></div>
    </motion.div>
  )
}

const InteractiveTimeline: React.FC = () => {
  const [activeEvent, setActiveEvent] = useState<string | null>(null)

  const lineVariants = {
    offscreen: { 
      height: 0, 
      opacity: 0 
    },
    onscreen: { 
      height: "100%", 
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.2
      }
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <div className="relative py-8">
      <motion.div 
        className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-r from-blue-600 to-purple-600"
        variants={lineVariants}
        initial="offscreen"
        whileInView="onscreen"
        exit="exit"
        viewport={{ once: false }}
      />
      {timelineEvents.map((event, index) => (
        <div 
          key={event.date} 
          className="relative z-10"
          onMouseEnter={() => setActiveEvent(event.date)}
          onMouseLeave={() => setActiveEvent(null)}
        >
          <TimelineEvent 
            event={event} 
            isActive={activeEvent === event.date} 
            isLeft={index % 2 === 0}
            index={index}
          />
        </div>
      ))}
    </div>
  )
}

export default InteractiveTimeline