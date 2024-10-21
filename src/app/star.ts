export class Star {
    public state: boolean;
    public dateDeFormation: Date;
    public comments: string[];
    public description: string;
    public categorie:string;
    constructor(public id: number,
        public name: string,
        public photo: string,
        public prix: number,
        state: boolean,
        dateDeFormation: Date,
        comments: string[],
        description: string,
        categorie:string
    ) {
        this.state = state;
        this.dateDeFormation = dateDeFormation;
        this.comments =comments;
        this.description = description;
        this.categorie=categorie;
    }
}