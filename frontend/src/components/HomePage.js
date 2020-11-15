/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  SubHeading, PageHeader, PageBody, PageContainer, BodyTextLink, BodyText,
} from '../styles';
import QuestionList from './QuestionList';
import Question from './Question';
import AddQuestion from './AddQuestion';

const HomePage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [currQuestion, setCurrQuestion] = useState('');
  const [popUp, setPopUp] = useState(false);
  const [questions, setQuestions] = useState([]);

  const checkLoggedIn = async () => {
    await axios.post('/account/').then(({ status, data }) => {
      if (status === 200) {
        setUsername(data);
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  };

  const isLoggedIn = () => loggedIn;

  useEffect(() => {
    const intervalID = setInterval(async () => {
      try {
        const data = await axios.get('/api/questions');
        setQuestions(data.data);
        checkLoggedIn();
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    }, 2000);

    return () => clearInterval(intervalID);
  }, []);

  const logout = async () => {
    await axios.post('/account/logout');
    setLoggedIn(false);
  };

  return (
    <PageContainer>
      <PageHeader>
        <SubHeading>Campuswire Lite</SubHeading>
        <BodyText>{loggedIn ? `Hi ${username}` : ''}</BodyText>
        <BodyTextLink onClick={() => logout()}>{loggedIn ? 'Log Out' : ''}</BodyTextLink>
      </PageHeader>
      {
        popUp ? <AddQuestion setPopUp={setPopUp} /> : <></>
      }
      <PageBody>
        <QuestionList
          questions={questions}
          setCurrQuestion={setCurrQuestion}
          setPopUp={setPopUp}
          isLoggedIn={isLoggedIn}
        />
        <Question question={currQuestion} isLoggedIn={isLoggedIn} />
      </PageBody>
    </PageContainer>
  );
};

export default HomePage;
