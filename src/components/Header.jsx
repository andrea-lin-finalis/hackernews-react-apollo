import { Link, useNavigate } from 'react-router-dom';

import { AUTH_TOKEN } from '../constants';

const Header = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem(AUTH_TOKEN);

  const onClickLogout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    navigate('/');
  };

  return (
    <div className="flex pal justify-between nowrap orange">
      <div className="flex flex-fixed black">
        <Link to="/" className="no-underline black">
          <div className="fw7 mr1">Hacker News</div>
        </Link>
        <Link to="/" className="ml1 no-underline black">
          new
        </Link>
        <div className="ml1">|</div>
        {authToken && (
          <Link to="/create" className="ml1 no-underline black">
            submit
          </Link>
        )}
        <div className="flex flex-fixed">
          {authToken ? (
            <>
              <div className="ml1">|</div>
              <div className="ml1 pointer black" onClick={onClickLogout}>
                logout
              </div>
            </>
          ) : (
            <Link to="/login" className="ml1 no-underline black">
              login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
