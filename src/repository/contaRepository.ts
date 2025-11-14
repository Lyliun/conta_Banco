import { Conta } from "../model/Conta";

export interface ContaRepository {
    
    //CRUD da Conta
    procurarPorNumero(numbero: number): void;
    listarTodas():void;
    cadastrar(conta: Conta): void;
    atualizar(conta: Conta): void;
    deletar(numero: number): void;

    //Métodos bancários
    sacar(numero: number, valor: number ): void;
    depositar(numero: number, valor: number): void;
    transferir(numeroOrigem: number, numeroDestino: number, valor: number): void;
}