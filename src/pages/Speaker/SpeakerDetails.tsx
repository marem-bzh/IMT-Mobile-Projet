import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonThumbnail,
  useIonViewWillEnter,
} from "@ionic/react";

import { RouteComponentProps } from "react-router";
import { getSpeaker, Speaker } from "../../data/speakers";
import { getSessions, Session } from "../../data/sessions";
import PageHeader from "../../components/PageHeader";
import SessionListItem from "../../components/SessionListItem";

import "./Speaker.css";

interface SpeakerDetailProps extends RouteComponentProps<{ id: string }> { }

const SpeakerDetail: React.FC<SpeakerDetailProps> = ({ match }) => {
  const [speaker, setSpeaker] = useState<Speaker>();
  const [sessions, setSessions] = useState<Session[]>();

  useIonViewWillEnter(() => {
    getSpeaker(parseInt(match.params.id, 10))
      .then(s => setSpeaker(s))
      .catch();
  });

  useEffect(() => {
    getSessions()
      .then((allSessions) =>
        setSessions(allSessions.filter(s => s.speakers?.includes(parseInt("" + speaker?.id))))
      )
      .catch();
  }, [speaker]); // this effect callback will be called only when the speaker state is updated

  return (
    <IonPage id="view-speaker-page">
      <PageHeader title="Speaker" />

      <IonContent>
        {
          speaker ? (
            <>
              <div className="ion-padding">
                <h2>{speaker.name}</h2>

                <IonImg className="speaker-photo" src={speaker.photoUrl} />

                <p>
                  {speaker.bio ? speaker.bio : "This speaker has no biography."}
                </p>
              </div>

              <IonItem>
                <h2>Talks</h2>
              </IonItem>
              <div className="ion-padding">
                {sessions && sessions.length > 0 ? (
                  <IonList>{sessions.map((s) => <SessionListItem session={s} />)}</IonList>
                ) : (
                    <p>No sessions for this speaker</p>
                  )}
              </div>
            </>
          ) : (
              <div className="ion-padding">Whoops, something went wrong !</div>
            )
        }
      </IonContent>
    </IonPage>
  );
};

export default SpeakerDetail;
