import { Switch, Route, Link } from 'react-router-dom';
import logo from '../images/logo-mesto.svg';

export default function Header({ userEmail, handleLogout }) {
  return (
    <header className="header">
      <img
        src={logo}
        alt="Лого Место Россия"
        className="header__logo"
      />
      <Switch>
        <Route path='/signup'>
          <Link to='/signin' className="header__status">Войти</Link>
        </Route>
        <Route path='/signin'>
          <Link to='/signup' className="header__status">Регистрация</Link>
        </Route>
        <Route exact path='/'>
          <>
            <div className="header__menu">
              <p className="header__status">{userEmail}</p>
              <Link
                to='/signin'
                className="header__status"
                onClick={handleLogout}
              >Выйти</Link>
            </div>
          </>
        </Route>
      </Switch>
    </header>
  );
}