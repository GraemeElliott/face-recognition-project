import React from 'react';

const User = ({name}) => {
  return (
    <div>
      <div className='white f1'>
        {`Welcome, ${name}!`}
      </div>
    </div>
  );
}

export default User;