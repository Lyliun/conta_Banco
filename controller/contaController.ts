import { Conta } from "../src/model/Conta";
import { ContaRepository } from "../src/repository/contaRepository";
import { colors } from "../src/util/colors/Colors";

export class ContaController implements ContaRepository {

    private listaContas: Array<Conta> = new Array <Conta>();    
    numero: number = 0;
    
    procurarPorNumero(numero: number): void {
        try {
            const buscaConta = this.buscarNoArray(numero);

            if (buscaConta) {
                buscaConta.visualizar();
            } else {
                console.log(colors.fg.red, `\nConta número: ${numero} não foi encontrada!`, colors.reset);
            }
        } catch (error) {
            console.error(colors.fg.red, "\nErro ao procurar conta:", error, colors.reset);
        }
    }

    listarTodas(): void {
        try {
            if (this.listaContas.length === 0) {
                console.log(colors.fg.yellow, "\nNenhuma conta cadastrada ainda.", colors.reset);
                return;
            }

            for (let conta of this.listaContas) {
                conta.visualizar();
            }
        } catch (error) {
            console.error(colors.fg.red, "\nErro ao listar contas:", error, colors.reset);
        }
    }
    
    cadastrar(conta: Conta): void {
        try {
            this.listaContas.push(conta);
            console.log(colors.fg.green, `\nA Conta número: ${conta.numero} foi criada com sucesso!`, colors.reset);
        } catch (error) {
            console.error(colors.fg.red, "\nErro ao cadastrar conta:", error, colors.reset);
        } finally {
            console.log(colors.fg.cyan, "\nOperação de cadastro finalizada.", colors.reset);
        }
    }

     atualizar(conta: Conta): void {
        try {
            const buscaConta = this.buscarNoArray(conta.numero);

            if (buscaConta) {
                this.listaContas[this.listaContas.indexOf(buscaConta)] = conta;
                console.log(colors.fg.green, `\nA Conta número: ${conta.numero} foi atualizada com sucesso!`, colors.reset);
            } else {
                console.log(colors.fg.red, `\nA Conta número: ${conta.numero} não foi encontrada!`, colors.reset);
            }
        } catch (error) {
            console.error(colors.fg.red, "\nErro ao atualizar conta:", error, colors.reset);
        }
    }
    
    deletar(numero: number): void {
        try {
            const conta = this.buscarNoArray(numero);

            if (conta) {
                this.listaContas.splice(this.listaContas.indexOf(conta), 1);
                console.log(colors.fg.green, `\nA Conta número: ${numero} foi deletada com sucesso!`, colors.reset);
            } else {
                console.log(colors.fg.red, `\nConta número: ${numero} não foi encontrada!`, colors.reset);
            }
        } catch (error) {
            console.error(colors.fg.red, "\nErro ao deletar conta:", error, colors.reset);
        }
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

    //Checa se uma Conta existe
   public buscarNoArray(numero: number): Conta | null {
        try {
            for (let conta of this.listaContas) {
                if (conta.numero === numero)
                    return conta;
            }
        return null;
        } catch (error) {
            console.error(colors.fg.red, "\nErro ao buscar conta no array:", error, colors.reset);
                return null;
        }
    }
}