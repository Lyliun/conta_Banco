import readlinesync = require("readline-sync");
import { colors } from "./src/util/colors/Colors";
import { Conta } from "./src/model/Conta";
import { ContaCorrente } from "./src/model/ContaCorrente";
import { ContaPoupanca } from "./src/model/ContaPoupanca";
import { ContaController } from "./controller/contaController";

/**
 * Função principal do programa.
 * Exibe o menu de opções e executa o loop principal que controla o sistema bancário.
 */
export function main() {
    
    // Var auxiliares
    let contas: ContaController = new ContaController();
    
    let opcao, numero, agencia, tipo, saldo, limite, aniversario: number;
    let titular: string;
    const tipoContas = ['Conta Corrente', 'Conta Poupanca'];

    const contaCorrente: ContaCorrente = new ContaCorrente(2, 123, 1, "Mariana", 15000, 1000);
    contaCorrente.visualizar();
    contaCorrente.sacar(2000);
    contaCorrente.visualizar();
    contaCorrente.depositar(1000);
    contaCorrente.visualizar();

    const contapoupanca: ContaPoupanca = new ContaPoupanca(3, 123, 2, "Victor", 1000, 10);
    contapoupanca.visualizar();
    contapoupanca.sacar(200);
    contapoupanca.visualizar();
    contapoupanca.depositar(1000);
    contapoupanca.visualizar();


    while (true) {

        // Exibição do menu principal com estilização de cores
        console.log(colors.bg.black, colors.fg.yellow, 
                    "*****************************************************");
        console.log("                                                     ");
        console.log("                BANCO DO BRAZIL COM Z                ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ");
        console.log("            1 - Criar Conta                          ");
        console.log("            2 - Listar todas as Contas               ");
        console.log("            3 - Buscar Conta por Numero              ");
        console.log("            4 - Atualizar Dados da Conta             ");
        console.log("            5 - Apagar Conta                         ");
        console.log("            6 - Sacar                                ");
        console.log("            7 - Depositar                            ");
        console.log("            8 - Transferir valores entre Contas      ");
        console.log("            9 - Sair                                 ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ", 
        colors.reset);

        // Solicita a opção do usuário
        console.log("Entre com a opção desejada: ");
        opcao = readlinesync.questionInt("");

        // Encerra o programa quando o usuário escolhe a opção 9
        if (opcao == 9) {
            console.log(colors.fg.greenstrong, 
                "\nBanco do Brazil com Z - O seu Futuro começa aqui!");
            sobre();
            console.log(colors.reset, "");
            process.exit(0);
        }

        // Estrutura de controle para direcionar cada opção
        switch (opcao) {
            case 1:
                console.log(colors.fg.whitestrong, "\n\nCriar Conta\n\n", colors.reset);

                console.log("\nDigite o número da agência: ");
                agencia = readlinesync.questionInt("");

                console.log("Digite o nome do Titular da conta: ");
                titular = readlinesync.question("");

                console.log("Digite o tipo da conta: ");
                tipo = readlinesync.keyInSelect(tipoContas, "", {cancel: false}) + 1;

                console.log("\nDigite o Saldo da conta (R$): ");
                saldo = readlinesync.questionFloat("");

                switch(tipo) {
                    case 1:
                        console.log("Digite o Limite da Conta (R$): ");
                        limite = readlinesync.questionFloat("");
                        contas.cadastrar(
                            new ContaCorrente(contas.gerarNumero(), agencia, tipo, titular, saldo, limite));
                            break;
                    case 2:
                        console.log("Digite o Dia do aniversario da Conta Poupanca: ");
                        aniversario = readlinesync.questionInt("");
                        contas.cadastrar(new ContaPoupanca(contas.gerarNumero(), agencia, tipo, titular, saldo, aniversario));
                        break;
                }

                keyPress()
                break;
            case 2:
                console.log(colors.fg.whitestrong, 
                    "\n\nListar todas as Contas\n\n", colors.reset);
                
                contas.listarTodas();
                keyPress();
                break;
            case 3:
                console.log(colors.fg.whitestrong, "\n\nConsultar dados Conta - por numero\n\n", colors.reset);

                console.log("Digite o numero da Conta: ");
                numero = readlinesync.questionInt("");
                contas.procurarPorNumero(numero);

                keyPress()
                break;
            case 4:
                console.log(colors.fg.whitestrong, "\nAtualizar dados da Conta\n\n", colors.reset);

                console.log("Digite o numero da conta: ");
                numero = readlinesync.questionInt("");

                let conta = contas.buscarNoArray(numero);

                if(conta != null) {
                    console.log("Digite o numero da Agência: ");
                    agencia = readlinesync.questionInt("");

                    console.log("Digite o numero da Titular: ");
                    titular = readlinesync.question("");

                    tipo = conta.tipo;

                    console.log("\nDigite o Saldo da conta (R$): ");
                    saldo = readlinesync.questionFloat("");
                    
                switch(tipo) {
                    case 1:
                        console.log("Digite o Limite da Conta(R$): ");
                        limite = readlinesync.questionFloat("");
                        contas.atualizar(
                            new ContaCorrente(numero, agencia, tipo, titular, saldo, limite));
                            break;
                    case 2:
                        console.log("Digite o Dia do aniversario da Conta Poupanca: ");
                        aniversario  = readlinesync.questionInt("");
                        contas.atualizar(new ContaPoupanca(numero, agencia, tipo, titular, saldo, aniversario));
                        break;
                    }
                } else {
                    console.log(colors.fg.red, "\nA Conta numero: " + numero + " nao foi encontrada!", colors.reset);
                }

                keyPress()
                break;
            case 5:
                console.log(colors.fg.whitestrong, "\nApagar uma Conta\n\n", colors.reset);

                console.log("Digite o numero da Conta: ");
                numero = readlinesync.questionInt("");
                contas.deletar(numero);

                keyPress();
                break;
            case 6:
                console.log(colors.fg.whitestrong, 
                    "\n\nSaque\n\n", colors.reset);
                keyPress();
                break;
            case 7:
                console.log(colors.fg.whitestrong, 
                    "\n\nDepósito\n\n", colors.reset);
                keyPress();
                break;
            case 8:
                console.log(colors.fg.whitestrong, 
                    "\n\nTransferência entre Contas\n\n", colors.reset);
                keyPress();
                break;
            default:
                console.log(colors.fg.whitestrong, 
                    "\nOpção Inválida!\n", colors.reset);
                keyPress();
                break;
        }
    }
}

/**
 * Exibe as informações do projeto e do desenvolvedor.
 */
function sobre(): void {
    console.log("\n*****************************************************");
    console.log("Projeto Desenvolvido por: ");
    console.log("Lilia dos Santos");
    console.log("github.com/Lilyun/conta_Banco");
    console.log("*****************************************************");
}

/**
 * Pausa o programa até o usuário pressionar Enter.
 * Usado para dar tempo de leitura entre as operações.
 */
function keyPress(): void {
    console.log(colors.reset, "");
    console.log("\nPressione enter para continuar...");
    readlinesync.prompt();
}

// Inicia o programa
main();