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
    sacar(numero: number, valor: number): void {
        try {
            const conta = this.buscarNoArray(numero);

            if (!conta) {
                console.log(colors.fg.red, "\nConta não encontrada!", colors.reset);
                return;
            }

            if (valor <= 0) {
                console.log(colors.fg.yellow, "\nValor de saque inválido!", colors.reset);
                return;
            }

            conta.sacar(valor);
            console.log(colors.fg.green, `\nSaque de R$${valor} realizado com sucesso na conta ${numero}!`, colors.reset);
        } catch (error) {
            console.error(colors.fg.red, "\nErro ao realizar saque:", error, colors.reset);
        }
    }

    depositar(numero: number, valor: number): void {
        try {
            const conta = this.buscarNoArray(numero);

            if (!conta) {
                console.log(colors.fg.red, "\nConta não encontrada!", colors.reset);
                return;
            }

            if (valor <= 0) {
                console.log(colors.fg.yellow, "\nValor de depósito inválido!", colors.reset);
                return;
            }

            conta.depositar(valor);
            console.log(colors.fg.green, `\nDepósito de R$${valor} realizado com sucesso na conta ${numero}!`, colors.reset);
        } catch (error) {
            console.error(colors.fg.red, "\nErro ao realizar depósito:", error, colors.reset);
        }
    }
    
    transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
        try {

            let contaOrigem = this.buscarNoArray(numeroOrigem);
            let contaDestino = this.buscarNoArray(numeroDestino);

            if (contaOrigem != null && contaDestino != null) {

                // Valor inválido
                if (valor <= 0) {
                    console.log(colors.fg.yellow, "\nO valor da transferência deve ser maior que zero!", colors.reset);
                    return;
                }

                // Tenta sacar da conta origem
                if (contaOrigem.sacar(valor) === true) {
                    // Deposita na conta destino
                    contaDestino.depositar(valor);

                    console.log(
                        colors.fg.green,
                        `\nA Transferência da conta número ${numeroOrigem} para a conta número ${numeroDestino} foi efetuada com sucesso!`,
                        colors.reset
                    );

                } else {
                    console.log(colors.fg.red, "\nSaldo insuficiente para realizar a transferência!", colors.reset);
                }

            } else {
                console.log(
                    colors.fg.red,
                    `\nA conta número ${numeroOrigem} e/ou a conta número ${numeroDestino} não foram encontradas!`,
                    colors.reset
                );
            }

        } catch (erro) {
            console.error(
                colors.fg.red,
                "\nErro inesperado ao realizar transferência:",
                erro,
                colors.reset
            );
        }
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