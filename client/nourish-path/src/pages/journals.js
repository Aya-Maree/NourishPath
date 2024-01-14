import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Journal() {
    useEffect(() => {
        // Read the values as soon as the component mounts
        const userName = localStorage.getItem('userName');
        const userEmail = localStorage.getItem('userEmail');

        console.log('Journal component mount:', { userName, userEmail });
    
      }, []);
  const [entry, setEntry] = useState('');
  const userEmail = localStorage.getItem('userEmail'); // Retrieve email from local storage
  const [title, setTitle] = useState(''); // State for the journal title

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/journals', {
        email: userEmail, // Send email along with the entry
        title, // Include the title in the POST request
        entry,
      });
      console.log(response.data);
      setTitle(''); // Clear the title state
      setEntry(''); // Clear the journal entry on successful save
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
  
  return (
    <div>
      <h1>Journals</h1>
      <form onSubmit={handleSubmit}>
  <input
    type="text"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    placeholder="Title of your entry"
  />
  <textarea
    value={entry}
    onChange={(e) => setEntry(e.target.value)}
    placeholder="Write your feelings here..."
    rows="10"
    cols="50"
  />
  <button type="submit">Save Entry</button>
</form>

    </div>
  );
}

export default Journal;
