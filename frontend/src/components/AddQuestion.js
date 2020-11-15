/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import axios from 'axios';

import {
  PopUp, BodyText, InputArea, ActionButton, CloseButton,
} from '../styles';

const AddQuestion = (props) => {
  const { setPopUp } = props;
  const [questionText, setQuestionText] = useState('');

  const addQuestion = async () => {
    try {
      await axios.post('/api/questions/add', { questionText });
      setPopUp(false);
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert('Failed to Add Question');
    }
  };

  return (
    <PopUp>
      <BodyText>Add Question:</BodyText>
      <InputArea onChange={(e) => setQuestionText(e.target.value)} value={questionText} />
      <ActionButton type="submit" onClick={() => addQuestion()}>Submit Question</ActionButton>
      <CloseButton onClick={() => setPopUp(false)}>Close</CloseButton>
    </PopUp>
  );
};

export default AddQuestion;
