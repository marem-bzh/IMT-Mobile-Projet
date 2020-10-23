import SessionListItem from '../components/SessionListItem';
import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter
} from '@ionic/react';
import './Home.css';
import { Session, getSessions } from '../data/sessions';

const Home: React.FC = () => {

  const [sessions, setSessions] = useState<Session[]>([]);

  useIonViewWillEnter(() => {
    const s = getSessions();
    setSessions(s);
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inbox</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Inbox
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {sessions.map(m => <SessionListItem key={m.id} session={m} />)}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
