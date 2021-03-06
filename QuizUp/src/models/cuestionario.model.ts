import { Pregunta } from "./Pregunta.model";

export class Cuestionario{
    fechaCreacion: Date;
    nombre: String;
    preguntas:Pregunta[];
    propietario: String;
    tema: String;
    id: Number;
    activado: boolean;
    aciertosTotales: number;
    totalIntentos: number;
    aprobados: number;
}