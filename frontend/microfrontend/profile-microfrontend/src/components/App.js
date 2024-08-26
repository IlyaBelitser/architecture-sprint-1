import React from 'react';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';

import '../blocks/profile/profile.css';

function App({ onUpdateAvatar, onUpdateUser, currentUser }) {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
        React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
        React.useState(false);

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
    }

    const imageStyle = { backgroundImage: `url(${currentUser.avatar})` };

    return (
        <>
            <Profile    
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
            />
            <EditProfilePopup
                currentUser={currentUser}
                isOpen={isEditProfilePopupOpen}
                onUpdateUser={(props) => { closeAllPopups(); if (typeof onUpdateUser === "function") onUpdateUser(props) }}
                onClose={closeAllPopups}
            />
            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onUpdateAvatar={(props) => { closeAllPopups(); if (typeof onUpdateAvatar === "function") onUpdateAvatar(props) }}
                onClose={closeAllPopups}
            />
        </>
    )
}

export default App;