import SessionListItem from "../../components/SessionListItem";
import React, { useState } from "react";
import { Session, getSessions } from "../../data/sessions";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";

const Sessions: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);

  useIonViewWillEnter(async () => {
    const s = await getSessions();
    setSessions(s);
  });

  return (
    <IonPage id="sessions-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
          </IonButtons>
          <IonTitle>Sessions</IonTitle>
          <IonButtons slot="end">
            <IonMenuButton autoHide={false} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {sessions.map((m) => (
            <SessionListItem key={m.id} session={m} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Sessions;
