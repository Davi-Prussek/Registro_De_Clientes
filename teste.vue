<template>
  <div>
    <header>
      <h1>{{ titulo }}</h1>
    </header>
    <main>
      <!-- Parte I -->
      <section v-show="!mostrarControles">
        <button @click="verificarSenha">ENTRAR</button>
      </section>

      <!-- Parte II -->
      <section v-show="mostrarControles" class="principal">
        <h2 id="tituloSecundario">Controle dos registros</h2>
        <button @click="novoRegistro">REGISTRAR</button>
        <button @click="mostrarRegistro">EXIBIR</button>
        <button id="fecharAba" @click="fechar">Fechar Controles</button>
        <button @click="deletar">DELETAR</button>
        <p id="Mensagem" v-show="mensagemVisivel">{{ mensagem }}</p>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: "RegistroClientes",
  data() {
    return {
      titulo: "Registro de Clientes",
      mostrarControles: false,
      registro: [],
      mensagem: "Registre clientes primeiro!",
      mensagemVisivel: false,
    };
  },
  methods: {
    CPF(cpf) {
      if (!cpf.includes(".")) {
        return (
          cpf.slice(0, 3) +
          "." +
          cpf.slice(3, 6) +
          "." +
          cpf.slice(6, 9) +
          "-" +
          cpf.slice(9, 11)
        );
      } else return cpf;
    },
    mostrarProUsuario() {
      return this.registro.map((cliente) => cliente.nome).sort();
    },
    letraMaiuscula(nome) {
      return nome
        .split(" ")
        .map((parte) => parte.charAt(0).toUpperCase() + parte.slice(1))
        .join(" ");
    },
    verificarSenha() {
      let verificar = "senha";
      let tentativas = 0;
      let senha = prompt("Digite a senha");
      if (senha === null) return;
      senha = senha.trim();
      while (senha !== verificar && tentativas < 5) {
        alert("SENHA INCORRETA, TENTE NOVAMENTE!");
        senha = prompt("Digite a senha")?.trim();
        if (!senha) return;
        tentativas++;
      }
      if (senha === verificar) {
        this.titulo = "Controle dos registros";
        alert("Acesso liberado!");
        this.mostrarControles = true;
      } else if (tentativas === 5) {
        alert("Máximo de tentativas atingido, a página será recarregada");
        location.reload();
      }
    },
    novoRegistro() {
      let repetir = "s";
      while (repetir !== "n") {
        let cliente = {
          nome: "",
          idade: 0,
          email: "",
          CPF: "",
          informações() {
            return (
              "Nome: " +
              this.nome +
              "\nIdade: " +
              this.idade +
              "\nEmail: " +
              this.email +
              "\nCPF: " +
              this.CPF
            );
          },
        };

        let nome = prompt("Digite seu nome completo");
        if (nome === null) return;
        nome = nome.trim().toLowerCase();
        while (!/^[a-zA-Z\s]+$/.test(nome)) {
          alert("Digite apenas letras!");
          nome = prompt("Digite seu nome")?.trim().toLowerCase();
          if (!nome) return;
        }

        let idade = Number(prompt("Digite sua idade"));
        while (isNaN(idade)) {
          alert("Digite apenas valores numéricos!");
          idade = Number(prompt("Digite sua idade"));
        }

        let email = prompt("Digite seu email");
        if (email === null) return;
        while (!email.includes("@")) {
          alert("Digite um email válido!");
          email = prompt("Digite seu email")?.trim();
          if (!email) return;
        }

        let cpf = prompt("Digite seu CPF");
        while (/[a-zA-Z]/.test(cpf) || cpf.length < 11) {
          alert("Digite apenas valores numéricos!");
          cpf = prompt("Digite seu CPF");
        }

        cliente.nome = this.letraMaiuscula(nome);
        cliente.idade = idade;
        cliente.email = email;
        cliente.CPF = this.CPF(cpf);
        this.registro.push(cliente);

        repetir = prompt(
          "Você deseja registrar mais algum login?\n\n(Responda com S-Sim ou N-Não)"
        )
          ?.trim()
          .toLowerCase()
          .charAt(0);
        while (repetir !== "s" && repetir !== "n") {
          alert("Responda apenas com S-Sim ou N-Não!");
          repetir = prompt(
            "Você deseja registrar mais algum login?\n\n(Responda com S-Sim ou N-Não)"
          )
            ?.trim()
            .toLowerCase()
            .charAt(0);
        }
      }
    },
    fechar() {
      this.mostrarControles = false;
      this.titulo = "Registro de Clientes";
    },
    deletar() {
      if (this.registro.length < 1) {
        this.mensagemVisivel = true;
        setTimeout(() => (this.mensagemVisivel = false), 4500);
        return;
      }

      let escolhaDeletar = prompt(
        "Qual registro deseja deletar?\n\n(Usuários: " +
          this.mostrarProUsuario().join(", ") +
          ")"
      );
      if (escolhaDeletar === null) return;

      escolhaDeletar = escolhaDeletar.trim().toLowerCase();
      while (
        !this.mostrarProUsuario().includes(this.letraMaiuscula(escolhaDeletar))
      ) {
        alert("Responda um usuário válido!");
        escolhaDeletar = prompt(
          "Qual registro deseja deletar?\n\n(Usuários: " +
            this.mostrarProUsuario().join(", ") +
            ")"
        )
          ?.trim()
          .toLowerCase();
        if (!escolhaDeletar) return;
      }

      this.registro = this.registro.filter(
        (cliente) => cliente.nome !== this.letraMaiuscula(escolhaDeletar)
      );
    },
    mostrarRegistro() {
      if (this.registro.length < 1) {
        this.mensagemVisivel = true;
        setTimeout(() => (this.mensagemVisivel = false), 4500);
        return;
      }

      let saida = "s";
      while (saida === "s") {
        let resposta = prompt(
          "Qual dos registros você deseja ver?\n\n(Usuários: " +
            this.mostrarProUsuario().join(", ") +
            ")"
        );
        if (resposta === null) return;

        resposta = resposta.trim().toLowerCase();
        while (
          !this.mostrarProUsuario().includes(this.letraMaiuscula(resposta))
        ) {
          alert("Responda um usuário válido!");
          resposta = prompt(
            "Qual dos registros você deseja ver?\n\n(Usuários: " +
              this.mostrarProUsuario().join(", ") +
              ")"
          );
          if (!resposta) return;
        }

        const respostaFinal = this.registro.find(
          (cliente) => cliente.nome === this.letraMaiuscula(resposta)
        );
        alert(respostaFinal.informações());

        saida = prompt(
          "Deseja ver as informações de outro usuário?\n\n(Responda com S-Sim ou N-Não)"
        )
          ?.trim()
          .toLowerCase()
          .charAt(0);
        while (saida !== "s" && saida !== "n") {
          alert("Responda apenas com S-Sim ou N-Não!");
          saida = prompt(
            "Deseja ver as informações de outro usuário?\n\n(Responda com S-Sim ou N-Não)"
          )
            ?.trim()
            .toLowerCase()
            .charAt(0);
        }
      }
    },
  },
};
</script>

<style scoped>
header {
  background-color: black;
  color: white;
  padding: 1.5rem;
  text-align: left;
  font-size: 3rem;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
button {
  border: none;
  background-color: black;
  color: white;
  padding: 1vw 2vw;
  border-radius: 1vw;
  font-size: 2rem;
  cursor: pointer;
}
main {
  text-align: center;
  padding: 5vw;
}
#parte-I {
  text-align: center;
  padding: 5vw;
}
#botaoPrincipal {
  display: block;
  margin: 0 auto;
}
#fecharAba {
  position: absolute;
  top: 1.5vw;
  right: 1.5vw;
  background-color: white;
  color: black;
  font-size: 1.3vw;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-weight: bold;
}
#Mensagem {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 43vw;
  font-size: 2vw;
  color: red;
}
#tituloSecundario {
  padding: 2vw;
  font-size: 4vw;
}
</style>
