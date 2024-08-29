import React, { useState } from 'react';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    age: '',
    religion: '',
    experience: '',
    services: [],
    location: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [aadharImage, setAadharImage] = useState(null);

  const servicesOptions = ['Cooking', 'Mopping', 'Cleaning'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setProfileData(prevState => {
      const services = checked
        ? [...prevState.services, value]
        : prevState.services.filter(service => service !== value);
      return { ...prevState, services };
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      if (name === 'profileImage') {
        setProfileImage(URL.createObjectURL(files[0]));
      } else if (name === 'aadharImage') {
        setAadharImage(URL.createObjectURL(files[0]));
      }
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    console.log('Profile updated:', profileData);
    console.log('Profile image:', profileImage);
    console.log('Aadhar image:', aadharImage);
  };

  return (
    <div style={styles.profileContainer}>
      <div style={styles.detailsContainer}>
        <h1 style={styles.header}>Your Profile</h1>
        <form onSubmit={handleSubmit}>
          {Object.entries(profileData).map(([key, value]) => {
            if (key === 'services') {
              return (
                <div key={key} style={styles.formGroup}>
                  <label style={styles.label}>Enter Your Services and Skill</label>
                  <div style={styles.checkboxGroup}>
                    {servicesOptions.map(service => (
                      <label key={service} style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          value={service}
                          checked={value.includes(service)}
                          onChange={handleCheckboxChange}
                          disabled={!isEditing}
                        />
                        {service}
                      </label>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <div key={key} style={styles.formGroup}>
                <label htmlFor={key} style={styles.label}>
                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
                </label>
                {isEditing ? (
                  <input
                    id={key}
                    name={key}
                    type={key === 'age' ? 'number' : 'text'}
                    value={value}
                    onChange={handleChange}
                    style={styles.input}
                  />
                ) : (
                  <p style={styles.paragraph}>{value || 'Please Enter Your Details'}</p>
                )}
              </div>
            );
          })}

          <div style={styles.formGroup}>
            <label htmlFor="aadharImage" style={styles.label}>Please Upload Your Aadhaar Card</label>
            {isEditing ? (
              <input
                id="aadharImage"
                name="aadharImage"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={styles.input}
              />
            ) : (
              aadharImage && <img src={aadharImage} alt="Aadhar Card" style={styles.imagePreview} />
            )}
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="profileImage" style={styles.label}>Please Upload Your Profile Picture</label>
            {isEditing ? (
              <input
                id="profileImage"
                name="profileImage"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={styles.input}
              />
            ) : (
              profileImage && <img src={profileImage} alt="Profile" style={styles.imagePreview} />
            )}
          </div>

          <div style={styles.buttonGroup}>
            <button
              type="button"
              onClick={handleEditToggle}
              style={styles.button}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
            {isEditing && (
              <button
                type="submit"
                style={styles.button}
              >
                Save
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Profile Picture Container */}
      <div style={styles.profilePictureContainer}>
        {profileImage && (
          <img src={profileImage} alt="Profile" style={styles.profilePicture} />
        )}
        {/* {aadharImage && !isEditing && (
          <img src={aadharImage} alt="Aadhar Card" style={styles.profilePicture} />
        )} */}
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  profileContainer: {
    maxWidth: '800px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row',
    backgroundImage: 'url("../src/assets/bg.jpeg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  detailsContainer: {
    flex: '2',
    marginRight: '20px',
  },
  profilePictureContainer: {
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  profilePicture: {
    width: '150px',
    height: '150px',
    border: '1px solid #ddd',
    objectFit: 'cover',
    backgroundColor: '#f0f0f0',
    marginBottom: '20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  paragraph: {
    margin: '0',
    padding: '8px',
    border: '1px solid #eee',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
  },
  checkboxGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  checkboxLabel: {
    marginBottom: '5px',
  },
  buttonGroup: {
    textAlign: 'center',
  },
  button: {
    padding: '10px 20px',
    margin: '0 10px',
    border: 'none',
    borderRadius: '4px',
    color: 'white',
    backgroundColor: '#007bff',
    cursor: 'pointer',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  buttonDisabled: {
    backgroundColor: '#6c757d',
    cursor: 'not-allowed',
  },
  imagePreview: {
    maxWidth: '100%',
    maxHeight: '150px',
    display: 'block',
    margin: '10px 0',
  },
};

export default Profile;
