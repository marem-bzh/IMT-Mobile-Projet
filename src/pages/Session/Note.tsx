import React, { useState } from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonFab,
    IonFabButton,
    IonGrid,
    IonHeader,
    IonIcon,
    IonImg,
    IonMenuButton,
    IonPage,
    IonRow,
    IonSlide,
    IonSlides,
    IonTextarea,
    IonTitle,
    IonToolbar,
    useIonViewWillEnter
} from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { getNote, saveNote } from '../../data/notes';
import { checkmark } from 'ionicons/icons';
import { usePhotoGallery } from '../../hooks/UsePhotoGalery';
import './Note.css';

interface SessionDetailProps extends RouteComponentProps<{ id: string; }> { }

const Note: React.FC<SessionDetailProps> = ({ match }) => {

    const [note, setNote] = useState<string>();

    const { photos, takePhoto, deletePic } = usePhotoGallery();

    useIonViewWillEnter(() => {
        var n = getNote(parseInt(match.params.id, 10));
        setNote(n);
    });

    function saveNoteState() {
        var n: string = note ? note : "";
        saveNote(parseInt(match.params.id, 10), n);
    }

    return (
        <IonPage id="view-message-page">
            <IonHeader translucent>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={`/session/${match.params.id}`}></IonBackButton >
                    </IonButtons>
                    <IonTitle>Note</IonTitle>
                    <IonButtons slot="end">
                        <IonMenuButton autoHide={false} />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonTextarea value={note} onIonChange={e => setNote(e.detail.value!)} autoGrow={true}>
                </IonTextarea>

                <IonButton onClick={() => takePhoto(match.params.id)}> Add a picture</IonButton>

                <IonGrid>
                    <IonRow>
                        {
                            photos[match.params.id] ? photos[match.params.id].map((photo, index) => (
                                <IonImg src={photo.webviewPath} />
                            ))
                                : ""}

                    </IonRow>
                </IonGrid>



                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={() => saveNoteState()} routerLink={`/session/${match.params.id}`} routerDirection='back'>
                        <IonIcon icon={checkmark} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage >
    );
};

export default Note;
