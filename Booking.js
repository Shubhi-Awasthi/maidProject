import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure you have this dependency
import MaidCard from './MaidCard';
import background from './Assets/background.jpg';
import maid1 from './Assets/maid.png';
import maid2 from './Assets/maid.png';
import maid3 from './Assets/maid.png';
import maid4 from './Assets/maid.png';
import maid5 from './Assets/maid.png';
import maid6 from './Assets/maid.png';
import checkmarkImg from './Assets/checkmark.jpg'; // Add your checkmark image here

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [maids, setMaids] = useState([
    { name: 'maid1', age: 30, location: 'Greater Noida', experience: 5, image: maid1 },
    { name: 'maid2', age: 25, location: 'Delhi', experience: 3, image: maid2 },
    { name: 'maid3', age: 28, location: 'Etawah', experience: 4, image: maid3 },
    { name: 'maid4', age: 32, location: 'Noida', experience: 6, image: maid4 },
    { name: 'maid5', age: 29, location: 'Faridabad', experience: 7, image: maid5 },
    { name: 'maid6', age: 27, location: 'Ghaziabad', experience: 2, image: maid6 },
  ]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedMaid, setSelectedMaid] = useState(null);
  const [showSlotSelection, setShowSlotSelection] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]); // Time slots fetched from backend
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Simulating a backend call to fetch time slots
    const fetchTimeSlots = async () => {
      // This would be replaced with an actual API call
      const fetchedTimeSlots = ['09:00 AM - 11:00 AM', '11:00 AM - 01:00 PM', '01:00 PM - 03:00 PM', '03:00 PM - 05:00 PM', '05:00 PM - 07:00 PM'];
      setTimeSlots(fetchedTimeSlots);
    };
    fetchTimeSlots();
  }, []);

  const filteredMaids = maids.filter(maid =>
    maid.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const loadMoreMaids = () => {
    setVisibleCount(prevCount => prevCount + 6);
  };

  const handleViewDetails = (maid) => {
    setSelectedMaid(maid);
  };

  const handleBookNow = () => {
    setShowSlotSelection(true);
  };

  const handleSlotSelection = () => {
    if (selectedTimeSlot && selectedDate) {
      setShowSlotSelection(false);
      setShowPopup(true);
    } else {
      alert('Please select a time slot and a date.');
    }
  };

  const closeDetails = () => {
    setSelectedMaid(null);
    setSelectedTimeSlot('');
    setSelectedDate('');
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div style={styles.container}>
      <button onClick={() => navigate(-1)} style={styles.backButton}>Back</button>
      <div style={styles.searchBar}>
        <input
          type="text"
          placeholder="Search for your location"
          value={searchTerm}
          onChange={handleSearch}
          style={styles.searchInput}
        />
      </div>
      <div style={styles.grid}>
        {filteredMaids.slice(0, visibleCount).map((maid, index) => (
          <MaidCard
            key={index}
            maid={maid}
            onViewDetails={handleViewDetails}
            onBookNow={handleBookNow}
          />
        ))}
      </div>
      {filteredMaids.length > visibleCount && (
        <button onClick={loadMoreMaids} style={styles.loadMoreButton}>
          See More
        </button>
      )}
      {selectedMaid && (
        <div style={styles.detailsOverlay}>
          <div style={styles.detailsContainer}>
            <button onClick={closeDetails} style={styles.closeButton}>Close</button>
            <img src={selectedMaid.image} alt={selectedMaid.name} style={styles.detailsImage} />
            <h2>{selectedMaid.name}</h2>
            <p>Age: {selectedMaid.age}</p>
            <p>Location: {selectedMaid.location}</p>
            <p>Experience: {selectedMaid.experience} years</p>
            <button onClick={handleBookNow} style={styles.bookNowButton}>Book Now</button>
          </div>
        </div>
      )}
      {showSlotSelection && (
        <div style={styles.slotSelectionOverlay}>
          <div style={styles.slotSelectionContainer}>
            <button onClick={() => setShowSlotSelection(false)} style={styles.closeButton}>Close</button>
            <h2>Select a Time Slot</h2>
            <select
              value={selectedTimeSlot}
              onChange={(e) => setSelectedTimeSlot(e.target.value)}
              style={styles.slotSelect}
            >
              <option value="">Select a time slot</option>
              {timeSlots.map((slot, index) => (
                <option key={index} value={slot}>{slot}</option>
              ))}
            </select>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={styles.dateInput}
            />
            <button onClick={handleSlotSelection} style={styles.doneButton}>Done</button>
          </div>
        </div>
      )}
      {showPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupContainer}>
            <div style={styles.checkmarkContainer}>
              <img src={checkmarkImg} alt="Success" style={styles.checkmark} />
            </div>
            <p style={styles.popupMessage}>Your booking request has been sent successfully. We will contact you soon.</p>
            <button onClick={closePopup} style={styles.popupCloseButton}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: 'auto',
    padding: '20px',
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
  },
  searchBar: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  searchInput: {
    padding: '10px',
    width: '80%',
    maxWidth: '600px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  loadMoreButton: {
    display: 'block',
    margin: '20px auto',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
  },
  detailsOverlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '1000',
  },
  detailsContainer: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    maxWidth: '500px',
    position: 'relative',
  },
  detailsImage: {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#ff5c5c',
    color: 'white',
    cursor: 'pointer',
  },
  bookNowButton: {
    marginTop: '10px',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
  },
  slotSelectionOverlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '1000',
  },
  slotSelectionContainer: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    maxWidth: '500px',
    position: 'relative',
  },
  slotSelect: {
    padding: '10px',
    margin: '10px 0',
    width: '80%',
    maxWidth: '400px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  dateInput: {
    padding: '10px',
    margin: '10px 0',
    width: '80%',
    maxWidth: '400px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  doneButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
  },
  popupOverlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '1000',
  },
  popupContainer: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    maxWidth: '400px',
    position: 'relative',
  },
  checkmarkContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  checkmark: {
    width: '60px', // Adjust size as needed
    height: '60px',
  },
  popupMessage: {
    marginBottom: '20px',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  popupCloseButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
  },
};

export default HomePage;
