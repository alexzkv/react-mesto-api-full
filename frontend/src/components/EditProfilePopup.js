import { useState, useContext, useEffect } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const[name, setName] = useState('');
  const[description, setDescription] = useState('');

  useEffect(() => {
    if (currentUser) {
      setName(currentUser?.name);
      setDescription(currentUser?.about);
    }
  }, [currentUser, isOpen]);

  const handleChangeName = (e) => { setName(e.target.value) }
  const handleChangeDescription = (e) => { setDescription(e.target.value) }
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({ name, about: description });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      aria-label="Кнопка закрытия"
      textButton={isLoading ? 'Сохранение...' : 'Создать'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <input
        name="profile-name"
        id="input-name"
        type="text"
        placeholder="Имя"
        required
        minLength={2}
        maxLength={40}
        value={name} 
        onChange={handleChangeName}
        className="popup__input popup__input_profile_name"
      />
      <span id="input-name-error" className="popup__error"></span>
      <input
        name="profile-about"
        id="input-about"
        type="text"
        placeholder="О себе"
        required
        minLength={2}
        maxLength={200}
        value={description} 
        onChange={handleChangeDescription}
        className="popup__input popup__input_profile_about"
      />
      <span id="input-about-error" className="popup__error"></span>
    </PopupWithForm>
  )
}