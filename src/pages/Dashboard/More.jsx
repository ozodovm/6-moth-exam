import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import BackIcon from '../../assets/images/back.svg'
import { NotificationIcon } from '../../assets/images/Icons';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import CustomModal from '../../components/CustomModal';


function More() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleConfirmLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className='flex justify-between '>
    <Sidebar />
  <div className="flex  justify-between items-start gap-[1000px] ">
    <div className="mt-10 ml-10">
      <button onClick={() => navigate(-1)} className="w-[50px] font-bold">
        <img src={BackIcon} width={50} />
      </button>
    </div>

    <div className="flex items-center mt-10 mr-10">
      <img src={NotificationIcon} alt="" width={24} />
      <Button
        extraStyle="w-[120px] bg-transparent !text-[#424242] kumbh"
        title="Log out"
        onClick={handleLogoutClick}
      />
    </div>
    </div>
    {isModalOpen && (
          <CustomModal
            title="Chiqishni tasdiqlang"
            message="Haqiqatan ham tizimdan chiqmoqchimisiz?"
            onConfirm={handleConfirmLogout}
            onCancel={handleCloseModal}
          />
        )}
  </div>


  
  )
}

export default More