import SpeakerListItem from '../../components/SpeakerListItem';
import React, { useState } from 'react';
import { Speaker, getSpeakers } from '../../data/speakers';
import {
    IonButtons,
    IonContent,
    IonHeader,
    IonList,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonViewWillEnter
} from '@ionic/react';

const Sessions: React.FC = () => {

    const [speakers, setSpeakers] = useState<Speaker[]>([]);

    useIonViewWillEnter(() => {
        const p = getSpeakers();
        setSpeakers(p);
    });

    return (
        <IonPage id="speakers-page">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Speakers</IonTitle>
                    <IonButtons slot="end">
                        <IonMenuButton autoHide={false} />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    {speakers.map(s => <SpeakerListItem key={s.id} speaker={s} />)}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Sessions;
