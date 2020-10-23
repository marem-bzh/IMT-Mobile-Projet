import React from 'react';
import {
  IonItem,
  IonLabel
} from '@ionic/react';
import { Speaker } from '../data/speakers';

interface SpeakerListItemProps {
  speaker: Speaker;
}

const SpeakerListItem: React.FC<SpeakerListItemProps> = ({ speaker }) => {
  return (
    <IonItem routerLink={`/session/${speaker.id}`} detail={false}>
      <IonLabel className="ion-text-wrap">
        <h2>{speaker.title}</h2>
      </IonLabel>
    </IonItem>
  );
};

export default SpeakerListItem;

