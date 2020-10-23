import React, { useState } from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonFab,
    IonHeader,
    IonItem,
    IonList,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonViewWillEnter
} from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { getSession, Session } from '../../data/sessions';
import './SessionDetail.css';

interface SessionDetailProps extends RouteComponentProps<{ id: string; }> { }

const SessionDetail: React.FC<SessionDetailProps> = ({ match }) => {

    const [session, setSession] = useState<Session>();
    const [note] = useState<String>();

    useIonViewWillEnter(() => {
        const s = getSession(parseInt(match.params.id, 10));
        setSession(s);
    });

    return (
        <IonPage id="view-message-page">
            <IonHeader translucent>
                <IonToolbar>
                    <IonButtons>
                        <IonBackButton defaultHref="/session"></IonBackButton>
                    </IonButtons>
                    <IonTitle>Talk Detail</IonTitle>
                    <IonButtons slot="end">
                        <IonMenuButton autoHide={false} />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                {session ?
                    sessionDetails(session)
                    : <div>Whoops, something went wrong !</div>
                }

                <IonItem>
                    <h2>Note</h2>
                </IonItem>
                <div className="ion-padding">
                    {note ?
                        note
                        : <p>You don't have any note for this session yet.</p>}
                </div>


            </IonContent>
        </IonPage>
    );
};

export default SessionDetail;

function sessionDetails(session: Session): React.ReactNode {
    return <>
        <div className="ion-padding">
            <h2>{session.title}</h2>
            <p>{session.description ? session.description : "This session has no description."}</p>
        </div>

        <IonItem>
            <h2>Speakers</h2>
        </IonItem>
        <div className="ion-padding">
            {session.speakers ?
                <IonList>
                    {session.speakers.map(s => s)}
                </IonList>
                : <p>No speaker for this session</p>}
        </div>
        <IonFab vertical="bottom" horizontal="start" slot="fixed">
            <IonButton expand="block" routerLink={`/session/${session.id}`}>
                Add a note for this session.
                    </IonButton>
        </IonFab>

    </>;
}

