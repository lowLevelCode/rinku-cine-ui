export interface BitacoraEntregas {
    id:number;
    folio:string;
    idEmployee:number;
    fechaCaptura:Date;
    cantidadEntregas:number;
    rolId:number;
    tipoId:number;
    cubrioTurnoTo:string;
}

export interface updateBitacoraEntregas {
    cantidadEntregas:number;
}