import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete'; // Import the delete icon
import EditIcon from '@mui/icons-material/Edit'; // Import the edit icon

function Journal() {
  const [entries, setEntries] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedEntry, setEditedEntry] = useState('');
  const [entry, setEntry] = useState('');
  const [title, setTitle] = useState('');
  const [mood, setMood] = useState('');

  const getMoodImageSrc = (mood) => {
    switch (mood) {
      case 'happy':
        return '/happy.png';
      case 'sad':
        return '/sad.png';
      case 'angry':
        return '/angry.png';
      default:
        return ''; // default image or empty string if no mood is set
    }
  };

  const userEmail = localStorage.getItem('userEmail');
  const toggleEdit = (journal) => {
    setEditId(journal._id);
    setEditedTitle(journal.title);
    setEditedEntry(journal.entry);
  };

  const fetchEntries = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/journals', {
        params: { email: userEmail },
      });
      setEntries(response.data); // Assuming response.data is an array of journal entries
    } catch (error) {
      console.error('Error fetching journal entries:', error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [userEmail]);

  const handleDelete = async (journalId, event) => {
    event.stopPropagation();
    try {
      await axios.delete(`http://localhost:5001/api/delete/journals/${journalId}`);
      setEntries(entries.filter(journal => journal._id !== journalId));
    } catch (error) {
      console.error('Error deleting journal entry:', error);
    }
  };
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5001/api/edit/journals/${editId}`, {
        title: editedTitle,
        entry: editedEntry,
      });
      setEditId(null); // Exit edit mode
      fetchEntries(); // Refresh entries
    } catch (error) {
      console.error('Error updating journal entry:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5001/api/journalss', {
            email: userEmail,
            title,
            entry,
            mood, // include mood in the POST request
          });
    
      console.log(response.data);
      setTitle(''); // Clear the title state
      setEntry(''); // Clear the journal entry on successful save
      fetchEntries();
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error submitting journal entry:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error submitting journal entry: No response from server', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', error.message);
      }
    }
  };
  
  const imageStyle = {
    width: '50px', // Set the width you want for your images
    height: '50px', // Set the height to be the same as the width for a circle
    borderRadius: '50%', // This makes the image circular
    objectFit: 'cover', // This makes sure the image covers the area without distorting aspect ratio
    margin: '0 10px', // Adds some space between the images
  };
  return (
    <div id="journal-container">
        <div id="journal-intro">
        <h2>Why Journaling Matters</h2>
        <p>
          Journaling can be a therapeutic practice that helps you 
          clarify your thoughts and feelings, understand yourself 
          better, reduce stress, and solve problems more effectively. 
          It's a great way to reflect on your day-to-day experiences 
          and track personal growth over time.
        </p>
      </div>
    <div id="journal-form-container">
      <div id="journal-form">
        <h1>Journals</h1>
        <form onSubmit={handleSubmit}>
          <input
            id="journal-title-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title of your entry"
          />
          <textarea
            id="journal-textarea"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Write your feelings here..."
          />
             <div id="mood-selector">
      <div id="happy-mood-container">
        <img src="/happy.png" alt="Happy" id="happy-mood" onClick={() => setMood('happy')} />
        <p id="happy-label">Happy</p>
      </div>
      <div id="sad-mood-container">
        <img src="/sad.png" alt="Sad" id="sad-mood" onClick={() => setMood('sad')} />
        <p id="sad-label">Sad</p>
      </div>
      <div id="angry-mood-container">
        <img src="/angry.png" alt="Angry" id="angry-mood" onClick={() => setMood('angry')} />
        <p id="angry-label">Angry</p>
      </div>
      {/* ... additional moods if necessary ... */}
    </div>
          <button id="save-entry-button" type="submit">Save Entry</button>
        </form>
      </div>
    </div>
    <div id="journal-entries-container">
        <div id="journal-entries">
        {entries.map((journal) => (
        <Accordion key={journal._id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <img
              src={getMoodImageSrc(journal.mood)}
              alt={journal.mood}
              style={imageStyle} // Using the imageStyle for mood images
            />
            {editId === journal._id ? (
              <>
                <input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <button onClick={() => handleUpdate(journal._id)}>Update</button>
              </>
            ) : (
              <>
                <Typography style={{ flex: 1 }}>{journal.title}</Typography>
                <EditIcon
                  style={{ cursor: 'pointer' }}
                  onClick={() => toggleEdit(journal)}
                />
                <DeleteIcon
                  style={{ cursor: 'pointer' }}
                  onClick={(event) => handleDelete(journal._id, event)}
                />
              </>
            )}
          </AccordionSummary>
          <AccordionDetails>
            {editId ===
journal._id ? (
<textarea
value={editedEntry}
onChange={(e) => setEditedEntry(e.target.value)}
rows="4"
cols="50"
/>
) : (
<Typography>{journal.entry}</Typography>
)}
</AccordionDetails>
</Accordion>
))}</div>
</div>
</div>
);
}
export default Journal;
