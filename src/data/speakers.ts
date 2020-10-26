import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;


export interface Speaker {
    id: number;
    name: string;
    photoUrl: string;
    bio: string;
    sessionsIds: number[];
}

const speakersUrl = 'https://devfest-nantes-2018-api.cleverapps.io/speakers';

export function fetchSpeakers() {
    fetch(speakersUrl)
        .then(response => response.json())
        .then(response => {
            response = Object.keys(response).map((key) => response[parseInt(key)]); // The API returns an object instead of an array so we're fixing that here

            const speakers = response.map((s: any) => {
                return {
                    id: s.id,
                    name: s.name,
                    photoUrl: s.photoUrl,
                    bio: s.shortBio,
                    sessionsIds: []
                };
            });

            return Storage.set({
                key: 'speakers',
                value: JSON.stringify(speakers),
            });
        })
        .catch(error => console.log(error));
}

export async function getSpeakers() {
    const data = await Storage.get({ key: 'speakers' });
    if (data.value == null) return [];

    let speakers = JSON.parse(data.value);
    return speakers;
};

export async function getSpeaker(id: number) {
    alert("finding speaker of id " + id);
    return (await getSpeakers()).find((s: Speaker) => s.id === id);
};

