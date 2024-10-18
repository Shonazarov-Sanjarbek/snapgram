export interface CounterState {
    value: number;
}

export interface Product {
    id: number;
    title: string;
    price: number;
    images: string[];
}

export interface User {
    _id: string;
    fullName: string;
    photo: string;
    username: string;
    followers: [
        {
            _id: string;
        }
    ];
}

export interface IPost {
    content: string[];
    content_alt: string;
    caption: string;
    location: string;
    createdAt: string;
}
