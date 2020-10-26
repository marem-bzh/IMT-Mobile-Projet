import SpeakerListItem from "../../components/SpeakerListItem";
import React, { useState } from "react";
import { Speaker, getSpeakers } from "../../data/speakers";
import {
  IonContent,
  IonList,
  IonPage,
  useIonViewWillEnter,
} from "@ionic/react";
import PageHeader from "../../components/PageHeader";

const Sessions: React.FC = () => {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);

  /*useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(response => {
                setSpeakers(response.map(speaker => {
                    return {

                    };
                }))
            })
            .catch(error => console.log(error));
    });*/

  useIonViewWillEnter(async () => {
    const p = await getSpeakers();
    setSpeakers(p);
  });

  return (
    <IonPage id="speakers-page">
      <PageHeader title="Speakers" />
      <IonContent fullscreen>
        <IonList>
          {speakers.map((s) => (
            <SpeakerListItem key={s.id} speaker={s} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Sessions;
