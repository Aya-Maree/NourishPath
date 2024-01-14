import React, {useState} from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
})

function ChatBot(){
    const [questionType, setQuestionType] = useState('general')

    return(
       <Container className='mt-3'>
        hi {process.env.REACT_APP_OPENAI_API_KEY.slice(0,5)}
       </Container>
    );
}
export default ChatBot;
