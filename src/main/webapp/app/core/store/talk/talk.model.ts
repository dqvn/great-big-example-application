export interface Talk {
    id: number,
    title: string,
    speaker: string,
    description: string,
    yourRating: number,
    rating: number,
    deleteMe?: boolean
}
