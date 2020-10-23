import React from 'react';
import {
  IonItem,
  IonLabel
} from '@ionic/react';
import './SessionListItem.css';
import { Session } from '../data/sessions';

interface SessionListItemProps {
  session: Session;
}

const SessionListItem: React.FC<SessionListItemProps> = ({ session }) => {
  return (
    <IonItem routerLink={`/session/${session.id}`} detail={false}>
      <div slot="start" className="dot dot-unread"></div>
      <IonLabel className="ion-text-wrap">
        <h2>{session.title}</h2>
      </IonLabel>
    </IonItem>
  );
};

export default SessionListItem;