import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import ViewMessage from './pages/ViewMessage';
import Sessions from './pages/Session/Sessions';
import SessionDetail from './pages/Session/SessionDetail';
import Speakers from './pages/Speaker/Speakers';
import SpeakerDetails from './pages/Speaker/SpeakerDetails';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { fetchSpeakers } from './data/speakers';

if (navigator.onLine) {
  fetchSpeakers();
}

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/home" component={Home} exact={true} />
        <Route path="/message/:id" component={ViewMessage} exact={true} />
        <Route path="/sessions" component={Sessions} exact={true} />
        <Route path="/session/:id" component={SessionDetail} exact={true} />
        <Route path="/speakers" component={Speakers} exact={true} />
        <Route path="/speaker/:id" component={SpeakerDetails} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route render={() => <Redirect to="/home" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;

