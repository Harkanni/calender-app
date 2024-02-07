import React from 'react';
import ReactLoading, { LoadingType } from 'react-loading';

interface Props {
   type?: LoadingType,
   color?: string,
}

const LoadingScreen = ({ type, color } : Props) => {
  return (
    <div className='flex gap-3'>
      Scheduling hang in there 🐶
      <ReactLoading type={type} color={color} height={30} width={30} className='ml-2' />
    </div>
  );
};

export default LoadingScreen;