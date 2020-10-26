import React, { useState } from "react";
import {
  IonContent,
  IonItem,
  IonList,
  IonPage,
  useIonViewWillEnter,
} from "@ionic/react";

import { RouteComponentProps } from "react-router";
import { getSpeaker, Speaker } from "../../data/speakers";
import { Session } from "../../data/sessions";
import PageHeader from "../../components/PageHeader";

interface SpeakerDetailProps extends RouteComponentProps<{ id: string }> { }

const SpeakerDetail: React.FC<SpeakerDetailProps> = ({ match }) => {
  const [speaker, setSpeaker] = useState<Speaker>();
  const [sessions] = useState<Session[]>();

  useIonViewWillEnter(async () => {
    const s = await getSpeaker(parseInt(match.params.id, 10));
    setSpeaker(s);
  });

  return (
    <IonPage id="view-speaker-page">
      <PageHeader title="Speaker details" />

      <IonContent fullscreen>
        {speaker ? (
          <>
            <div className="ion-padding">
              <h2>{speaker.name}</h2>
              <p>
                {speaker.bio ? speaker.bio : "This speaker has no biography."}
              </p>
            </div>

            <IonItem>
              <h2>Sessions</h2>
            </IonItem>
            <div className="ion-padding">
              {sessions && sessions.length > 0 ? (
                <IonList>{sessions.map((s) => s)}</IonList>
              ) : (
                  <p>No sessions for this speaker</p>
                )}
            </div>
          </>
        ) : (
            <div className="ion-padding">Whoops, something went wrong !</div>
          )}
      </IonContent>
    </IonPage>
  );
};

export default SpeakerDetail;
