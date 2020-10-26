export interface Speaker {
    id: number;
    name: string;
    photoUrl: string;
    bio: string;
    sessionsIds?: number[];
}
/*

nom + prénom
photo
biographie
présentations

*/

const speakers: Speaker[] = [
    {
        "id": 101,
        "name": "Charlie GERARD",
        "photoUrl": "/images/speakers/charlie-gerard.png",
        "bio": "Hey I’m Charlie, currently Software Developer @ ThoughtWorks in Sydney. I am passionate about Creative Technologies, Creative Coding, Hardware and IoT.",
        "sessionsIds": []
    },
    {
        "id": 102,
        "name": "Florina MUNTENESCU",
        "photoUrl": "/images/speakers/florina-muntenescu.jpg",
        "bio": "Florina works at Google as an Android Developer Advocate. She has been writing code for more than 8 years, mostly for Android.",
        "sessionsIds": []
    },
    {
        "id": 103,
        "name": "Svetlana ISAKOVA",
        "photoUrl": "/images/speakers/svetlana-isakova.png",
        "bio": "Alex Qin is a Brooklyn based programmer, educator, and public speaker.",
        "sessionsIds": []
    },
];

export const getSpeakers = () => speakers;

export const getSpeaker = (id: number) => speakers.find(s => s.id === id);
