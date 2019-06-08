import { DocumentMonths } from './DocumentMonths';

export class TreeData{
    data : Inside [] = [];
}

export class Inside{
    documentYear : number;
    documentMonth : DocumentMonths []= [];
}