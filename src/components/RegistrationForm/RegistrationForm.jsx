import React, { useEffect, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import fetchToken from '../Services/tokenService';
import fetchPositions from '../Services/positionService';
import { UserContext } from '../../context/Context';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';

const RegistrationForm = () => {
  const { register, handleSubmit, formState: { isValid } } = useForm({ mode: 'onChange' });
  const { setIsRegistration } = useContext(UserContext);

  const [token, setToken] = useState('');
  const [positions, setPositions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      const token = await fetchToken();
      setToken(token);
    };

    getToken();
  }, []);

  useEffect(() => {
    const getPositions = async () => {
      const positions = await fetchPositions();
      setPositions(positions);
    };

    getPositions();
  }, []);

  const onSubmit = async (formData) => {
    setIsSubmitting(true);

    if (!token) {
      console.error('Token is not available');
      setIsSubmitting(false);
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('email', formData.email);
    formDataObj.append('phone', formData.phone);
    formDataObj.append('position_id', formData.position_id);
    formDataObj.append('photo', formData.photo[0]);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Token': token
      }
    };

    try {
      const response = await axios.post('https://frontend-test-assignment-api.abz.agency/api/v1/users', formDataObj, config);
      console.log('Registration successful!', response.data);

      setIsRegistration(true);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Registration error:', error);
    }

    setIsSubmitting(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  }

  return (
    <>
      {isModalOpen && <Modal closeModal={closeModal} />}
      <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Registration form">
        <input
          type="text"
          {...register('name', { required: true, minLength: 2, maxLength: 60 })}
          placeholder="Name"
          aria-label="Name"
        />
        <input
          type="email"
          {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
          placeholder="Email"
          aria-label="Email"
        />
        <input
          type="tel"
          {...register('phone', { required: true, pattern: /^\+380\d{9}$/ })}
          placeholder="Phone"
          aria-label="Phone"
        />
        {
          positions.map(position => (
            <label key={position.id} aria-label={position.name}>
              {position.name}
              <input
                type="radio"
                {...register('position_id', { required: true })}
                value={position.id}
                aria-label={position.name}
              />
            </label>
          ))
        }
        <input
          type="file"
          {...register('photo', { required: true, validate: (fileList) => fileList && fileList[0]?.type === 'image/jpeg' })}
          accept="image/jpeg"
          aria-label="Photo upload"
        />
        <button type="submit" disabled={!isValid || isSubmitting} aria-label="Register button">Register</button>
      </form>
      {isSubmitting && <Loader />}
    </>
  );
};

export default RegistrationForm;
