import React from 'react'

const ProfileBoard = () => {
    return (
      
        <div>ProfileBoard
            <p>Welcome to your profile board!</p>
            <p>Here you can manage your account settings, view your bookings, and more.</p>
            {/* Add more profile-related content here */}
            <div style={{ marginTop: '2rem' }}>
                <h2>Profile Details</h2>
                <ul>
                    <li><strong>Name:</strong> John Doe</li>
                    <li><strong>Email:</strong> johndoe@example.com</li>
                    <li><strong>Phone Number:</strong> +1 234 567 8901</li>
                </ul>

                <h2>Confirmed Flight</h2>
                <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
                    <p><strong>Flight:</strong> AY1234</p>
                    <p><strong>From:</strong> New York (JFK)</p>
                    <p><strong>To:</strong> London (LHR)</p>
                    <p><strong>Date:</strong> 2024-07-15</p>
                    <p><strong>Status:</strong> Confirmed</p>
                </div>

                <h2>Previous Bookings</h2>
                <ul>
                    <li>
                        <strong>Flight:</strong> AY5678 | <strong>From:</strong> Paris | <strong>To:</strong> Rome | <strong>Date:</strong> 2024-05-10 | <strong>Status:</strong> Completed
                    </li>
                    <li>
                        <strong>Flight:</strong> AY9101 | <strong>From:</strong> Berlin | <strong>To:</strong> Madrid | <strong>Date:</strong> 2024-03-22 | <strong>Status:</strong> Completed
                    </li>
                </ul>

                <h2>Account Actions</h2>
                <button style={{ marginRight: '1rem' }}>Edit Profile</button>
                <button>Logout</button>
            </div>
    </div>
  )
}

export default ProfileBoard