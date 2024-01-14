import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';


function DashBoard() {
  useEffect(() => {
    console.log('Local Storage on dashboard mount:', {
      userName: localStorage.getItem('userName'),
      userEmail: localStorage.getItem('userEmail'),
    });
  
    // ... other initialization code
  
  }, []);
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null); // State to track hovered card

  const cards = [
    {
        title: "Support",
        description: "Interact with our AI chatbot for assistance.",
        route: "/chatbot",
        imageUrl: "../chatbot.jpg", // No need for the path if the image is in the public folder
        bgColor: '#6A994E' // Dark green background
      },
    {
      title: "Reflection",
      description: "Keep track of your thoughts and progress.",
      route: "/journaling",
      imageUrl: "../journals.jpg", // Replace with actual image path
      bgColor: '#6A994E' // Dark green background
    },
    {
      title: "Inspiration",
      description: "Plan and prepare your meals for the week.",
      route: "/recipes",
      imageUrl: "../recipes.jpg", // Replace with actual image path
      bgColor: '#6A994E' // Dark green background
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
        padding: '20px', // Prevents cards from touching the edges
      }}
    >
      {cards.map((card, index) => (
        <Card
        key={index}
        sx={{
          minWidth: 275,
          borderRadius: '16px', // Gives the cards rounded corners
          boxShadow: 3, // Adds a shadow to the cards
          backgroundColor: card.bgColor, // Sets the background color for each card
          color: '#F2E8CF', // Sets the text color
          '&:hover': {
            transform: 'scale(1.05)', // Slightly enlarges cards on hover
            boxShadow: 6, // Makes the shadow more pronounced on hover
            },
            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out', // Smooths the hover effects
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
              sx={{ borderRadius: '16px 16px 0 0' }} // Round the top corners of the image
            />
          )}
          <CardContent sx={{ textAlign: 'center' }}>
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
