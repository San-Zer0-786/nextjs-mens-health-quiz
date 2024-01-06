import React, { useEffect, useState } from 'react';
import '@/styles/quiz.scss'
import Loader from './global/loader';
import Modal from './global/modal';

type QuizProps = {
  questions?: Array<{
    question: string;
    choiceType: string;
    options: Array<{
      display: string;
      value: string | boolean;
      isRejection: boolean;
    }>;
  }>;
};

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentSelectedAnswer, setCurrentSelectedAnswer] = useState<(string | boolean)>('');
  const [answers, setAnswers] = useState<(string | boolean)[]>([]);
  const [quizData, setQuizData] = useState<QuizProps>();
  const [loading, setLoading] = useState(true);
  const [isRejected, setIsRejected] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(
          'https://nextjs-quiz-data.s3.eu-west-1.amazonaws.com/quiz.json'
        );
        const data = await response.json();
        setQuizData(data);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      } finally {
        // make loader show just for visuals!
        setTimeout(() => {
          setLoading(false);
        }, 500)
      }
    };

    fetchQuizData();
  }, []);

  const handleContinue = () => {
    if (answers[currentQuestion] !== undefined && quizData && quizData.questions) {
      const selectedOption = quizData?.questions[currentQuestion].options.find(
        (option) => option.value.toString() === currentSelectedAnswer
      );

      console.log('current answer is...', answers[currentQuestion]);
      console.log('current option is...',  selectedOption);

      if (selectedOption && selectedOption.isRejection) {
        console.warn("isRejected is true! Should show quiz failure rendering")
        setIsRejected(true);
      } else {
        setIsRejected(false);
      }

      setAnswers([...answers.slice(0, currentQuestion), currentSelectedAnswer, ...answers.slice(currentQuestion + 1)]);
      setCurrentQuestion(currentQuestion + 1);
      setCurrentSelectedAnswer('');
      setError("");
    } else {
      setError("Please choose an option before continuing!");
      console.log('no answer selected yet! for question: ', currentQuestion)
    }
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>, selectedAnswer: any) => {
    setError("");
    const selectedValue = event?.target?.value;
    console.log('selected radio: ', selectedValue);
    console.log('selected answer: ', selectedAnswer);
    setCurrentSelectedAnswer(selectedValue);
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = selectedValue;
    setAnswers(updatedAnswers);
  };

  const handlePrevious = () => {
    setCurrentQuestion(currentQuestion - 1)
    // ensure previous selected answer is maintained so isRejection check does not break when continuing
    setCurrentSelectedAnswer(answers[currentQuestion - 1] || '');
    setIsRejected(false);
  }

  const renderQuestion = () => {
    const question = quizData?.questions?.[currentQuestion];
    return (
      <div key={currentQuestion} className="quiz_container">
        <h2>{question?.question}</h2>
        {error && 
          (<h2>{error}</h2>
          )
        }
        <div className={`answer_container ${question?.options && question?.options.length > 2 ? 'multi_row' : ''}`}>
          {question?.options?.map((option, index) => (
              <label htmlFor={`option_${currentQuestion}_${index}`} key={index} className="answer">
              <input
                type="radio"
                name={`question_${currentQuestion}`} 
                id={`option_${currentQuestion}_${index}`} 
                value={option.value.toString()}
                checked={answers[currentQuestion] === option.value.toString()}
                onChange={(e)=>handleRadioChange(e, option)}
                className="answer_option"              
              />
                <div dangerouslySetInnerHTML={{ __html: option.display }}></div>
              </label>
           
          ))}
        </div>
        {currentQuestion > 0 && (
          <button className='answer progress_btn' onClick={() => setCurrentQuestion(currentQuestion - 1)}>Previous</button>
        )}
        <button
        className={`answer progress_btn ${answers[currentQuestion] === undefined ? 'inactive' : ''}`}
        onClick={handleContinue}
        disabled={answers[currentQuestion] === undefined}
        >
          Continue
        </button>
      </div>
    );
  };

  const renderSuccessResult = () => {
    return (
      <div key={currentQuestion} className="quiz_container">
        <h2>Quiz Completed!</h2>
        <p>
          Great news! We have the perfect treatment for your hair loss. Proceed to{' '}
          <a href="https://www.mens-health.co.uk">www.mens-health.co.uk</a>, and prepare to say hello to your new hair!
        </p>
      </div>
    );
  };

  const renderFailureResult = () => {
    return (
      <div key={currentQuestion} className="quiz_container">
        <h2>Quiz Completed!</h2>
        <p>
          Unfortunately, we are unable to prescribe this medication for you. This
          is because finasteride can alter the PSA levels, which may be used to monitor for cancer.
          You should discuss this further with your GP or specialist if you would still like this
          medication.
        </p>
        {/* Maybe remove this to prevent users from forcing their answers to pass the quiz since health related? */}
        <button className='answer progress_btn' onClick={() => handlePrevious()}>Previous</button>
      </div>
    );
  };

  if (loading) {
    return <Loader />;
  }

  return (
  <Modal>
    {isRejected ? renderFailureResult() : (quizData?.questions && currentQuestion < quizData.questions.length ? renderQuestion() : renderSuccessResult())}
  </Modal>
  );
};

export default Quiz;
