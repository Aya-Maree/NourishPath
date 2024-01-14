import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

function DashBoard() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null); // State to track hovered card

  const cards = [
    {
        title: "Chatbot",
        description: "Interact with our AI chatbot for assistance.",
        route: "/chatbot",
        imageUrl: "../chatbot.jpg" // No need for the path if the image is in the public folder
      },
    {
      title: "Journals",
      description: "Keep track of your thoughts and progress.",
      route: "/journaling",
      imageUrl: "../journals.jpg" // Replace with actual image path
    },
    {
      title: "Meal Prep",
      description: "Plan and prepare your meals for the week.",
      route: "/recipes",
      imageUrl: "../recipes.jpg" // Replace with actual image path
    }
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        gap: '20px',
      }}
    >
      {cards.map((card, index) => (
        <Card
          key={index}
          sx={{
            minWidth: 275,
            transition: 'transform 0.3s',
            transform: hoveredCard === index ? 'scale(1.1)' : 'scale(1)',
            ':hover': {
              cursor: 'pointer',
            }
          }}
          onClick={() => navigate(card.route)}
          onMouseEnter={() => setHoveredCard(index)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {hoveredCard === index && (
            <CardMedia
              component="img"
              height="250"
              image={card.imageUrl}
              alt={card.title}
            />
          )}
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              {card.title}
            </Typography>
            <Typography variant="body2">
              {card.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default DashBoard;
