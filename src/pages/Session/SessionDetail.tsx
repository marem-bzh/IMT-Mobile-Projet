import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonContent,
  IonFab,
  IonGrid,
  IonImg,
  IonItem,
  IonList,
  IonPage,
  IonRow,
  useIonViewWillEnter,
} from "@ionic/react";
import { RouteComponentProps } from "react-router";
import { getSession, Session } from "../../data/sessions";
import "./SessionDetail.css";
import { getNote } from "../../data/notes";
import { usePhotoGallery } from "../../hooks/UsePhotoGalery";
import { getSpeakers, Speaker } from "../../data/speakers";
import SpeakerListItem from "../../components/SpeakerListItem";
import PageHeader from "../../components/PageHeader";

interface SessionDetailProps extends RouteComponentProps<{ id: string }> {}

const SessionDetail: React.FC<SessionDetailProps> = ({ match }) => {
  const [session, setSession] = useState<Session>();
  const [speakers, setSpeakers] = useState<Speaker[]>();
  const [note, setNote] = useState<string>();
  const { photos } = usePhotoGallery();

  useIonViewWillEnter(async () => {
    const s = await getSession(parseInt(match.params.id, 10));
    setSession(s);
    const n = getNote(parseInt(match.params.id, 10));
    setNote(n);
  });

  useEffect(() => {
    getSpeakers()
      .then((allSpeaker) => {
        return setSpeakers(
          allSpeaker.filter((s) => session?.speakers?.includes(s.id))
        );
      })
      .catch();
  }, [session]);

  return (
    <IonPage id="view-message-page">
      <PageHeader title="Talk detail" />

      <IonContent fullscreen>
        {session ? (
          sessionDetails(session, speakers)
        ) : (
          <div>
            Whoops, something went wrong, we could not find this session!
          </div>
        )}

        <IonItem>
          <h2>Note</h2>
        </IonItem>
        <div className="ion-padding">
          {note ? note : <p>You don't have any note for this session yet.</p>}
        </div>

        <IonItem>
          <h2>Pictures</h2>
        </IonItem>

        <div className="ion-padding">
          {photos[match.params.id] ? (
            <IonGrid>
              <IonRow>
                {photos[match.params.id].map((photo, index) => (
                  <IonImg src={photo.webviewPath} />
                ))}
              </IonRow>
            </IonGrid>
          ) : (
            <p>You don't have any picture attached to this session yet</p>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SessionDetail;

function sessionDetails(
  session: Session,
  speakers?: Speaker[]
): React.ReactNode {
  return (
    <>
      <div className="ion-padding">
        <h2>{session.title}</h2>
        <p>
          {session.description
            ? session.description
            : "This session has no description."}
        </p>
      </div>

      <IonItem>
        <h2>Speakers</h2>
      </IonItem>
      <div className="ion-padding">
        {speakers && speakers.length > 0 ? (
          <IonList>
            {speakers.map((s) => (
              <SpeakerListItem speaker={s} key={s.id} />
            ))}
          </IonList>
        ) : (
          <p>No speaker for this session</p>
        )}
      </div>
      <IonFab vertical="bottom" horizontal="start" slot="fixed">
        <IonButton expand="block" routerLink={`/notes/${session.id}`}>
          Edit note and pictures
        </IonButton>
      </IonFab>
    </>
  );
}
