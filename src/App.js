import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';

import Progress from './components/Progress';
import Header from './components/Header';

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
import Dashboard from './components/Dashboard';
import Signin from './components/Signin';
import Signup from './components/Signup';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnAuthenticatedRoute from './components/UnAuthenticatedRoute';

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoadiig] = useState(true);

  useEffect(()=>{
    const isSignedIn = localStorage.getItem('isSignedIn');
    if(isSignedIn == 'true'){
      setIsSignedIn(true);
      setLoadiig(false);
    }
    else{
      setLoadiig(false);
    }
  })

  const setSignInValue =(val)=>{
    localStorage.setItem('isSignedIn', val);
    setIsSignedIn(val);
  }

  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        { (!loading) ?
        <div>
          <Header
            onSignOut={() => setSignInValue(false)}
            isSignedIn={isSignedIn}
          />
          <Suspense fallback={<Progress />}>
            <Switch>
              <AuthenticatedRoute exact path="/" component={Dashboard} props={{isSignedIn: isSignedIn}}/>
              <AuthenticatedRoute path="/marketing" component={MarketingLazy} props={{isSignedIn: isSignedIn}}/>
              <UnAuthenticatedRoute exact path="/signin" component={Signin} props={{isSignedIn: isSignedIn, onSignIn: ()=>setSignInValue(true)}} />
              <UnAuthenticatedRoute exact path="/signup" component={Signup} props={{isSignedIn: isSignedIn, onSignIn: ()=>setSignInValue(true)}} />
            </Switch>
          </Suspense>
        </div> :
        <Progress /> }
      </StylesProvider>
    </BrowserRouter>
  );
};
