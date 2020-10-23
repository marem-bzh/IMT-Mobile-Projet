import React from 'react';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
  IonMenuButton,
  IonPage,
  IonRouterLink,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>DevFest Nantes 2018</IonTitle>
          <IonButtons slot="end">
            <IonMenuButton autoHide={false} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>



        <ul>
          <li><span>
            <IonImg src="https://upload.wikimedia.org/wikipedia/commons/6/67/IMT_Atlantique_logo.png" />
          </span></li>
          <li><span>
            <h2>DevFest 2018</h2>
              18th oct - 19th oct
            </span></li>
          <li><span>
            <Link to={`/`}>
              <IonButton expand="block" >See speakers</IonButton>
            </Link>
            <Link to={`/sessions`}>
              <IonButton routerLink={`/session`} expand="block" >See talks</IonButton>
            </Link>
          </span></li>
        </ul>
      </IonContent>
    </IonPage>
  );
};

export default Home;
