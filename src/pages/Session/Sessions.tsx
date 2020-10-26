import SessionListItem from "../../components/SessionListItem";
import React, { useState } from "react";
import { Session, getSessions } from "../../data/sessions";
import {
  IonContent,
  IonList,
  IonPage,
  useIonViewWillEnter,
} from "@ionic/react";
import PageHeader from "../../components/PageHeader";

const Sessions: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);

  useIonViewWillEnter(async () => {
    const s = await getSessions();
    setSessions(s);
  });

  return (
    <IonPage id="sessions-page">
      <PageHeader title="Talks" />
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
