
export class Star{
constructor(
        public _id: string,
        public id: number,
        public name: string,
        public photo: string,
        public price: number,
        public state: boolean,
        public dateDeFormation: Date,
        public comments: Comment[],
        public category:string,
        public description: string,
        public likes : number,
    ){

    }}
