import React, { useEffect, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import fetchToken from '../Services/tokenService';
import fetchPositions from '../Services/positionService';
import { UserContext } from '../../context/Context';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import styles from './RegistrationForm.module.scss'

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });
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
      <form onSubmit={handleSubmit(onSubmit)} noValidate className={styles.form} aria-label="Registration form">
        <div className={styles.form__inputs}>
          <div className={errors.name && styles.error}>
            <input
              type="text"
              {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Minimum 2 characters' }, maxLength: { value: 60, message: 'Maximum 60 characters' } })}
              placeholder="Your name"
              aria-label="Name"
              className={styles.form__input}
            />
            <p>{errors.name?.message}</p>
          </div>
          <div className={errors.email && styles.error}>
            <input
              type="email"
              {...register('email', { required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "Invalid email address" } })}
              placeholder="Email"
              aria-label="Email"
              className={styles.form__input}
            />
            <p>{errors.email?.message}</p>
          </div>
          <div className={errors.phone && styles.error}>
            <input
              type="tel"
              {...register('phone', { required: 'Phone is required', pattern: { value: /^\+380\d{9}$/, message: "Invalid phone number" } })}
              placeholder="Phone"
              aria-label="Phone"
              className={styles.form__input}
            />
            <p>{errors.phone?.message}</p>
          </div>
        </div>

        <fieldset>
          <legend>Select your position</legend>
          {
            positions.map((position, index) => (
              <label key={position.id} className={styles.lable}>
                <input
                  type="radio"
                  {...register('position_id', { required: 'Position is required' })}
                  value={position.id}
                  defaultChecked={index === 0}
                  aria-label={position.name}
                  id={`radio-${position.id}`}
                  className={styles.radio__hidden}
                />
                <span className={styles.radio__custom} />
                {position.name}
              </label>
            ))
          }
        </fieldset>
        <div className={errors.photo && styles.error}>
          <input
            type="file"
            {...register('photo', {
              required: 'Photo is required',
              validate: (fileList) => (fileList && fileList[0]) ? fileList[0].type === 'image/jpeg' || 'Only jpeg files are accepted' : 'File is required'
            })}
            accept="image/jpeg"
            aria-label="Photo upload"
          />
          <p>{errors.photo?.message}</p>
        </div>

        <button type="submit" className={styles.button} disabled={!isValid || isSubmitting} aria-label="Register button">Sign up</button>
      </form >
      {isSubmitting && <Loader />
      }
    </>
  );
};

export default RegistrationForm;
