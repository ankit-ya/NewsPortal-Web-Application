import React from 'react';

const Welcome = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333',
        padding: '20px',
        borderRadius: '10px',
        //backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backgroundColor: "pink",
     
        // Add responsive styles
        '@media (max-width: 768px)': {
          fontSize: '18px',
        },
        '@media (max-width: 480px)': {
          fontSize: '14px',
        },
      }}
    ><>
      Welcome to our News App!
      Enjoy it&#128525;
    </>
    </div>
  );
};

export default Welcome;