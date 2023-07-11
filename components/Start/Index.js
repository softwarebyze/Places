import { useState } from 'react';
import _Navigator from './elements/_Navigator';
import LoadPage from './pages/LoadPage';
import StartPage from './pages/StartPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';

export default function Index() {
  const [pageScreenState, setPageScreenState] = useState('StartPage');

  return (
    <_Navigator 
      screens={{
        'LoadPage': <LoadPage
          setPageScreenState={(_) => setPageScreenState(_)}
        />,
        'StartPage': <StartPage
          setPageScreenState={(_) => setPageScreenState(_)}
        />,
        'SignUpPage': <SignUpPage
          setPageScreenState={(_) => setPageScreenState(_)}
        />,
        'LoginPage': <LoginPage
          setPageScreenState={(_) => setPageScreenState(_)}
        />,
      }}
      screen={pageScreenState}
    />
  );
};
