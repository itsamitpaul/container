import React, { lazy, Suspense, useState } from 'react';
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
  const [isSignedIn, setIsSignedIn] = useState(localStorage.getItem('isSignedIn') == 'true' ? true : false);

  const setSignInValue =(val)=>{
    localStorage.setItem('isSignedIn', val);
    setIsSignedIn(val);
  }

  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
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
                {/* <Signin onSignIn={()=>setIsSignedIn(true)} />
              </Route>
              <UnAuthenticatedRoute exact path="/signup">
                <Signup onSignIn={()=>setIsSignedIn(true)} />
              </Route> */}
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};
