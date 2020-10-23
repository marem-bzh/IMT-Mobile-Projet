import React, { useState } from 'react';
import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonViewWillEnter
} from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { getSession, Session } from '../../data/sessions';
import { getNote } from '../../data/notes';

interface SessionDetailProps extends RouteComponentProps<{ id: string; }> { }

const Note: React.FC<SessionDetailProps> = ({ match }) => {

    const [session, _] = useState<Session>();
    const [note, setNote] = useState<String>();

    useIonViewWillEnter(() => {
        const n = getNote(parseInt(match.params.id, 10));
        setNote(n);
    });

    return (
        <IonPage id="view-message-page">
            <IonHeader translucent>
                <IonToolbar>
                    <IonButtons>
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>New note</IonTitle>
                    <IonButtons slot="end">
                        <IonMenuButton autoHide={false} />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>

            </IonContent>
        </IonPage>
    );
};

export default Note;