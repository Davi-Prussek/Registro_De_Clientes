        //ENTRADA

        //INTERAÇÃO COM HTML
        document.getElementById("botaoPrincipal").addEventListener("click", verificarSenha);
        document.getElementById("botaoRegistro").addEventListener("click", novoRegistro);
        document.getElementById("botaoExibir").addEventListener("click", mostrarRegistro);
        document.getElementById("fecharAba").addEventListener("click", fechar);
        document.getElementById("deletarRegistro").addEventListener("click", deletar);

        const atoMostrarOpcoes = document.getElementById("parte-II");
        const atoBotaoPrincipal = document.getElementById("botaoPrincipal");
        const mensagemRegistroVazio = document.getElementById("Mensagem");
        mensagemRegistroVazio.style.display = "none";
        let registro = [];

        //PROCESSAMENTO

          function CPF(cpf) {
                    if (!cpf.includes(".")) {
                        let CPF_p1 = cpf.slice(0, 3);
                        let CPF_p2 = cpf.slice(3, 6);
                        let CPF_p3 = cpf.slice(6, 9);
                        let CPF_p4 = cpf.slice(9, 11);
                return CPF_p1 + "." + CPF_p2 + "." + CPF_p3 + "-" + CPF_p4}
                    else {
                return cpf;}}

        function mostrarProUsuario() {
            const nomesExibir = registro.map(cliente => cliente.nome).sort();
            return nomesExibir;}

        function verificarSenha() {
            let verificar = "senha";
            let tentativas = 0;
            let senha = prompt(
                "Digite a senha");
                if (senha === null) {return; } else {
                    senha = senha.trim();
            while (senha !== verificar && tentativas < 5) {
                alert("SENHA INCORRETA, TENTE NOVAMENTE!");
                senha = prompt("Digite a senha").trim();
                tentativas++;
            }}
            if (senha === verificar) {
                document.getElementById("tituloInicial").innerText = "Controle dos registros";
                alert("Acesso liberado!");
                atoMostrarOpcoes.style.display = "block";
                atoBotaoPrincipal.style.display = "none";
                senha = "";
            }
            if (tentativas === 5) {
                alert("Máximo de tentativas atingido, a página irá ser recarregada");
                location.reload();
            }
        }

        let letraMaiuscula = (nome) => {
            let nomeComeco;
            let restoNome;
            let nomeCompletoMaiusculo = [];
            let primeiraLetra = nome.split(" ");
            for (let i = 0; i < primeiraLetra.length; i++) {
                nomeComeco = primeiraLetra[i].charAt(0);
                restoNome = primeiraLetra[i].substring(1);
                nomeCompletoMaiusculo.push(nomeComeco.toUpperCase() + restoNome);}

            return nomeCompletoMaiusculo.join(" ");};

        function novoRegistro() {
            let repetir = "s";

            while (repetir !== "n") {

                let cliente = {
                    nome: "",
                    idade: 0,
                    email: "",
                    CPF: "",
                    informações: function () { return "Nome: " + this.nome + "\nIdade: " + this.idade + "\nEmail: " + this.email + "\nCPF: " + this.CPF }}

                let nome = prompt("Digite seu nome completo");
                if (nome === null) {return; } else {
                    nome = nome.trim().toLowerCase();
                while (!/^[a-zA-Z\s]+$/.test(nome)) {
                    alert("Digite apenas letras!");
                    nome = prompt("Digite seu nome").trim().toLowerCase();
                }}

                let idade = Number(prompt("Digite sua idade"));
                while (isNaN(idade)) {
                    alert("Digite apenas valores numéricos!");
                    idade = Number(prompt("Digite sua idade"));
                }

                let email = prompt("Digite seu email");
                if (email === null) {return; } else {
                while (!email.includes("@")) {
                    email = email.trim();
                    alert("Digite um email válido!");
                    email = prompt("Digite seu email").trim();
                }}

                let cpf = (prompt("Digite seu CPF"));
                while (/[a-zA-Z]/.test(cpf) || cpf.length < 11) {
                    alert("Digite apenas valores numéricos!");
                    cpf = (prompt("Digite seu CPF"));
                }
  
                cliente.nome = letraMaiuscula(nome);
                cliente.idade = idade;
                cliente.email = email;
                cliente.CPF = CPF(cpf);
                registro.push(cliente);

                repetir = prompt("Você deseja registrar mais algum login?\n\n(Responda com S-Sim ou N-Não)").trim().toLowerCase().charAt();
                while (repetir !== "s" && repetir !== "n") {
                    alert("Responda apenas com S-Sim ou N-Não!");
                    repetir = prompt("Você deseja registrar mais algum login?\n\n(Responda com S-Sim ou N-Não)").trim().toLowerCase().charAt();
                }}}

        function fechar() {
            atoMostrarOpcoes.style.display = "none";
            atoBotaoPrincipal.style.display = "block";
            document.getElementById("tituloInicial").innerText = "Registro de Clientes";}
        
        function deletar() {

            if (registro.length < 1) {
                mensagemRegistroVazio.style.display = "block";
                setTimeout(() => {
                    mensagemRegistroVazio.style.display = "none";
                },4500);}

            else {
            let escolhaDeletar = prompt("Qual registro deseja deletar?\n\n(Usuários: "+mostrarProUsuario().join(", ")+")");
            if (escolhaDeletar === null) {return; } else {
            escolhaDeletar = escolhaDeletar.trim().toLowerCase();
                while (!mostrarProUsuario().includes(letraMaiuscula(escolhaDeletar))) {
                alert("Responda um usuário válido!");
                escolhaDeletar = prompt("Qual registro deseja deletar?\n\n(Usuários: "+mostrarProUsuario().join(", ")+")").trim().toLowerCase();}
                
            registro = registro.filter(cliente => cliente.nome !== letraMaiuscula(escolhaDeletar));
        }}}
        //SAÍDA

        function mostrarRegistro() {

            if (registro.length < 1) {
                mensagemRegistroVazio.style.display = "block";
                setTimeout(() => {
                    mensagemRegistroVazio.style.display = "none";
                },4500);}

            else if (registro.length >= 1) {
            let saida = "s";

            while (saida === "s") {
                let resposta = prompt("Qual dos registros você deseja ver?\n\n(Usuários: "+mostrarProUsuario().join(", ")+")");
                if (resposta === null) {return; } else {
                    resposta = resposta.trim().toLowerCase();

                mostrarProUsuario().join(",");

                while (!mostrarProUsuario().includes(letraMaiuscula(resposta))) {
                    alert("Responda um usuário válido!");
                    resposta = prompt("Qual dos registros você deseja ver?\n\n(Usuários: " + mostrarProUsuario().join(", ") + ")");
                }

                const respostaFinal = registro.find(cliente => cliente.nome === letraMaiuscula(resposta));
                
                alert(respostaFinal.informações());

                saida = prompt("Deseja ver as informaçõs de outro usuário?\n\n(Responda com S-Sim ou N-Não)").trim().toLowerCase().charAt();

                while (saida !== "s" && saida !== "n") {
                    alert("Responda apenas com S-Sim ou N-Não!");
                    saida = prompt("Deseja ver as informaçõs de outro usuário?\n\n(Responda com S-Sim ou N-Não)").trim().toLowerCase().charAt();
                }}}}}
