import React from 'react';

const MaidCard = ({ maid, onViewDetails, onBookNow }) => {
  return (
    <div style={styles.card}>
      <img src={maid.image} alt={maid.name} style={styles.image} />
      <div style={styles.details}>
        <h3 style={styles.name}>{maid.name}</h3>
        <p style={styles.info}>Age: {maid.age}</p>
        <p style={styles.info}>Location: {maid.location}</p>
        <p style={styles.info}>Experience: {maid.experience} years</p>
        <div style={styles.buttonContainer}>
          <button onClick={() => onViewDetails(maid)} style={styles.button}>View Details</button>
          <button onClick={() => onBookNow(maid)} style={styles.button}>Book Now</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'white', // Ensure the background is white
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    margin: '10px',
    width: '100%',
    maxWidth: '300px',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  details: {
    padding: '10px',
  },
  name: {
    margin: '0',
    fontSize: '1.2em',
  },
  info: {
    margin: '5px 0',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '10px',
  },
  button: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
    fontSize: '0.9em',
  },
};

export default MaidCard;
