import { Plugins } from "@capacitor/core";
const { Storage } = Plugins;
const SPEAKERS_URL = "https://devfest-nantes-2018-api.cleverapps.io/speakers";
const SPEAKERS_PHOTOS_BASE_URL = "https://devfest2018.gdgnantes.com/";
const SPEAKERS_STORAGE_KEY = "speakers";

export interface Speaker {
  id: number;
  name: string;
  photoUrl: string;
  bio: string;
}

export function fetchSpeakers() {
  fetch(SPEAKERS_URL)
    .then((response) => response.json())
    .then((response) => {
      response = Object.keys(response).map((key) => response[parseInt(key)]); // The API returns an object instead of an array so we're fixing that here
      const speakers: Speaker[] = response.map((s: any) => {
        return {
          id: Number(s.id),
          name: s.name,
          photoUrl: SPEAKERS_PHOTOS_BASE_URL + s.photoUrl,
          bio: s.shortBio,
        };
      });

      return Storage.set({
        key: SPEAKERS_STORAGE_KEY,
        value: JSON.stringify(speakers),
      });
    })
    .catch((error) => console.log(error));
}

export async function getSpeakers(): Promise<Speaker[]> {
  const data = await Storage.get({ key: SPEAKERS_STORAGE_KEY });
  if (data.value == null) return [];

  let speakers = JSON.parse(data.value);
  return speakers;
}

export async function getSpeaker(id: number): Promise<Speaker | undefined> {
  const ret = (await getSpeakers()).find((s: Speaker) => s.id === id);
  return ret;
}
