import React from 'react';
import {
    IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonMenuButton
} from '@ionic/react';
import { Session } from '../data/sessions';

interface SessionListItemProps {
    session: Session;
}

type PageHeaderProps = {
    title: string
};

const PageHeader = ({ title }: PageHeaderProps) => {
    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons>
                    <IonBackButton defaultHref="/home"></IonBackButton>
                </IonButtons>
                <IonTitle>{title}</IonTitle>
                <IonButtons slot="end">
                    <IonMenuButton autoHide={false} />
                </IonButtons>
            </IonToolbar>
        </IonHeader>
    );
};

export default PageHeader;
