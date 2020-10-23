export interface Session {
    id: number;
    title: string;
    titleMobile: string;
    image: string;
    speakers?: number[];
    description?: string;
    type?: string;
}

const sessions: Session[] = [
    {
        "id": 101,
        "title": "Gates open / Ouverture des portes",
        "titleMobile": "Gates open",
        "image": "https://devfest2018.gdgnantes.com/images/backgrounds/opening.jpg",
        "type": "break"
    },
    {
        "id": 102,
        "title": "Opening keynote / Keynote d'ouverture",
        "titleMobile": "Opening keynote",
        "image": "https://devfest2018.gdgnantes.com/images/backgrounds/keynote.jpg",
        "description": "",
        "type": "📣 Keynote",
        "speakers": [
            181
        ]
    },
    {
        "id": 103,
        "title": "Lunch / Déjeuner",
        "titleMobile": "Lunch",
        "description": "Foooooood !!!",
        "image": "https://devfest2018.gdgnantes.com/images/backgrounds/lunch.jpg",
        "type": "break"
    },
];

export const getSessions = () => sessions;

export const getSession = (id: number) => sessions.find(m => m.id === id);
