import { useState, useEffect } from "react";
import s from "./index.module.css";

const Header = ({ user, onUpdateUser, children }) => {
  const [isShow, setisShow] = useState(false);
  const [nameUser, setName] = useState("");
  const [aboutUser, setAbout] = useState("");
  const handleClickButtonEdit = (e) => {
    e.preventDefault();
    setisShow(false);
    onUpdateUser({ name: nameUser, about: aboutUser });
  };

  useEffect(() => {
    setName(user.name);
    setAbout(user.about);
  }, [user]);
  return (
    <header className={s.header}>
      <div className="container">
        <div className={s.wrapper}>{children}</div>
        <div className={s.profile}>
          {user.email &&
            (isShow ? (
              <input
                type="text"
                value={nameUser}
                onInput={(e) => {
                  setName(e.target.value);
                }}
              />
            ) : (
              <span>{nameUser}</span>
            ))}
          <span> : </span>
          {user.about &&
            (isShow ? (
              <input
                type="text"
                value={aboutUser}
                onChange={(e) => {
                  setAbout(e.target.value);
                }}
              />
            ) : (
              <span>{user.about}</span>
            ))}
          {!isShow ? (
            <button
              onClick={() => setisShow(true)}
              className="btn btn_type_secondary"
            >
              Изменить
            </button>
          ) : (
            <button
              onClick={handleClickButtonEdit}
              className="btn btn_type_secondary"
            >
              Принять
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
