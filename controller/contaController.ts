import { Conta } from "../src/model/Conta";
import { ContaRepository } from "../src/repository/contaRepository";
import { colors } from "../src/util/colors/Colors";

export class ContaController implements ContaRepository {

    private listaContas: Array<Conta> = new Array <Conta>();    
    numero: number = 0;
    
    procurarPorNumero(numbero: number): void {
        throw new Error("Method not implemented.");
    }

    listarTodas(): void{
        for (let conta of this.listaContas){
            conta.visualizar();
        }
    }
    cadastrar(conta: Conta): void {
        this.listaContas.push(conta);
        console.log(colors.fg.green, "\nA Conta número: " + conta.numero + "foi criada com sucesso!", colors.reset);
    }
    atualizar(conta: Conta): void {
        throw new Error("Method not implemented.");
    }
    deletar(numero: number): void {
        throw new Error("Method not implemented.");
    }
    sacar(numbero: number): void {
        throw new Error("Method not implemented.");
    }
    depositar(numero: number, valor: number): void {
        throw new Error("Method not implemented.");
    }
    transferir(numeroOrigigem: number, numeroDestino: number, valor: number): void {
        throw new Error("Method not implemented.");
    }

    public gerarNumero(): number {
        return ++ this.numero;
    }
}
