import React from 'react';
const CurrentUserContext = React.lazy(() => import("shared/CurrentUserContext"))

function Profile({ onEditProfile, onEditAvatar }) {
    const currentUser = React.useContext(CurrentUserContext);
  
    const imageStyle = { backgroundImage: `url(${currentUser.avatar})` };
  
    return (
        <>
          <div className="profile__image" onClick={onEditAvatar} style={imageStyle}></div>
          <div className="profile__info">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
              <p className="profile__description">{currentUser.about}</p>
          </div>
        </>
    );
  }
  
  export default Profile;