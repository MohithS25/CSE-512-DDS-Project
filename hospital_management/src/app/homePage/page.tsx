import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// Sample data for the cards
const cardData = [
  { title: "Card 1", description: "This is the description for card 1" },
  { title: "Card 2", description: "This is the description for card 2" },
  { title: "Card 3", description: "This is the description for card 3" },
  { title: "Card 4", description: "This is the description for card 4" },
  { title: "Card 5", description: "This is the description for card 5" },
  { title: "Card 6", description: "This is the description for card 6" }
];

const CardComponent = () => {
  return (
    <Box sx={{ p: 4 }}>
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
      {cardData.map((card, index) => (
        <Card key={index}
        sx={{ 
          backgroundColor: index % 2 === 0 ? '#B1B1B1' : '#808286',
          color: 'black',
          boxShadow: 3,
        }}>
          <CardContent>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
              Word of the Day
            </Typography>
            <Typography variant="h5" component="div">
              {card.title}
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
            <Typography variant="body2">
              {card.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      ))}
    </Box>
    </Box>
  );
}

export default CardComponent;
