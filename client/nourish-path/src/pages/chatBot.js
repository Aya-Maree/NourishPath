import React, { useState } from 'react';
import { Button, Container, Form, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import OpenAI from 'openai';
import '../chatbot.css';
import LoadingDots from './loading.js'

const openai = new OpenAI({
  apiKey: 'your-api-key',
  dangerouslyAllowBrowser: true,
});

const triggerPrompt =
  "I'm really sorry to hear that you're feeling triggered right now. It's important to prioritize your well-being. If you need immediate assistance, consider reaching out to a trusted friend, family member, or mental health professional. You can also try engaging in activities that usually bring you comfort, like deep breathing exercises, listening to calming music, or taking a short walk. Remember, it's okay to ask for help. If you'd like, we can continue our conversation in a more positive direction whenever you feel ready. Take care.";

const helpPrompt =
  "If you're looking for help, don't hesitate to reach out to friends, family, or professionals. Your well-being is important. If you're in crisis, consider contacting a crisis hotline or seeking immediate assistance. Remember, there's always support available.";

const physicalActivityPrompt =
  "It's great that you're interested in physical activity! Engaging in regular physical activity has numerous benefits for both physical and mental health. You can try activities like walking, jogging, cycling, swimming, yoga, or even dancing. Remember to choose activities that you enjoy, so it feels more like fun than a chore. If you have any specific preferences or goals, let me know, and I can provide more personalized suggestions.";

function ChatBot() {
  const [questionType, setQuestionType] = useState('general');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hello! I'm here for you. It takes a lot of courage to reach out. How can I assist you on your path to recovery? For emergencies, immediate assistance, or urgent support, please contact your local emergency services or appropriate authorities. For personalized medical advice, please contact your physician.",
    },
    {
        role: 'assistant',
        content:"I'm here to provide quick advice, but please keep in mind that this service is not suitable for emergencies, and I'm not a professional healthcare provider. Think of me as your friendly assistant for helpful tips!"
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let assistantMessage;

    const userInputLower = userInput.toLowerCase();

    if (userInputLower.includes('trigger')) {
      assistantMessage = triggerPrompt;
    } else if (userInputLower.includes('help')) {
      assistantMessage = helpPrompt;
    } else if (userInputLower.includes('physical activity')) {
      assistantMessage = physicalActivityPrompt;
    } else {
      // Add other conditions and prompts as needed
      // For example, you might have a prompt for greetings, specific topics, etc.
      // If none of the specific conditions match, use the general OpenAI response
      const endpoint = 'https://api.openai.com/v1/chat/completions';
      const body = {
        model: 'gpt-3.5-turbo',
        messages: [...messages, { role: 'user', content: userInput }],
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openai.apiKey}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      assistantMessage = data.choices[0].message.content;
    }

    setMessages([
      ...messages,
      { role: 'user', content: userInput },
      { role: 'assistant', content: assistantMessage },
    ]);

    setUserInput('');
    setIsLoading(false);
  };

  return (
    <Container  id="size" className='chat-container mt-3'>
      <div id="chtBx" className='message-container'>
      <div className="chat-title">Chatbox</div> 
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.role === 'user' ? 'user' : 'assistant'}`}
          >
            {msg.content}
          </div>
        ))}
        {isLoading && <LoadingDots className='mt-3' />}
      </div>
      <div id="form">
      <Form onSubmit={handleInput}>
        <Form.Control
          type='text'
          id="srchbr"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <Button id="chatBtn" variant='info' type='submit' className='mt-3'>
          Submit
        </Button>
      </Form>
      
      </div>
    </Container>
  );
}

export default ChatBot;
