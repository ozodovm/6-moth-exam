import React from 'react';
import Sidebar from '../../components/Sidebar';
import Soon from '../../assets/images/coming-soon.png';

function Students() {
  return (
    <div className='flex'>
      <Sidebar />
      <div className="">
        <h1 className="text-5xl font-bold mt-[50px] ml-10">Students</h1>
        <img className='ml-[450px] mt-[150px]' src={Soon} alt="soon" width={250} />
      </div>
    </div>
  );
}

export default Students;
