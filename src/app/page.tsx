'use client';
import React, { useEffect, useState } from 'react';
import Banner from '@/components/banner';
import ServiceSection from '@/components/serviceSection';
import Quiz from '@/components/quiz'; 

export default function Home() {
  const [showQuiz, setShowQuiz] = useState(false);

  const handleQuizClick = () => {
    setShowQuiz(!showQuiz);
  };

  useEffect(() => {
    if (showQuiz) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showQuiz]);

  return (
    <main className="">
      <Banner title="Be good to yourself" subtitle="We’re working around the clock to bring you a holistic approach to your wellness. From top to bottom, inside and out." buttonText="TAKE THE QUIZ" imageUrl="/images/lp_banner.png" logo="/images/logo.png" onQuizButtonClick={handleQuizClick}/>
      <ServiceSection sectionHeading="What we can help with" title="HAIR LOSS" subtitle="Hair loss needn’t be irreversible. We can help!" imageUrl="/images/lp_hairloss.png" content={"We’re working around the clock to bring you a holistic approach to your wellness. From top to bottom, inside and out."} bgText='01'/>
      <ServiceSection title="ERECETILE DYSFUNCTION" subtitle="Erections can be a tricky thing. But no need to feel down!" imageUrl="/images/lp_ed.png" content={"We’re working around the clock to bring you a holistic approach to your wellness. From top to bottom, inside and out."} swapOrder={true} bgText='02'/>
      {showQuiz && <Quiz/>} 
    </main>
  )
}
