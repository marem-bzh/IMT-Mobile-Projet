import { Plugins } from "@capacitor/core";
const { Storage } = Plugins;
const sessionsUrl = "https://devfest-nantes-2018-api.cleverapps.io/sessions";
const SESSIONS_STORAGE_KEY = "sessions";
export interface Session {
  id: number;
  title: string;
  image: string;
  speakers?: number[];
  description?: string;
}

export function fetchSessions(): void {
  fetch(sessionsUrl)
    .then((response) => response.json())
    .then((response) => {
      response = Object.keys(response).map((key) => response[parseInt(key)]); // The API returns an object instead of an array so we're fixing that here
      const sessions: Session[] = response.map((s: any) => {
        return {
          id: s.id,
          title: s.title,
          description: s.description,
          speakers: s.speakers,
          image: s.image,
        };
      });
      return Storage.set({
        key: SESSIONS_STORAGE_KEY,
        value: JSON.stringify(sessions),
      });
    })
    .catch((error) => console.log(error));
}

export async function getSessions(): Promise<Session[]> {
  const data = await Storage.get({ key: SESSIONS_STORAGE_KEY });
  if (data.value == null) return [];
  const sessions = JSON.parse(data.value);
  return sessions;
}

export async function getSession(id: number): Promise<Session | undefined> {
  return (await getSessions()).find((s: Session) => s.id === id);
}
