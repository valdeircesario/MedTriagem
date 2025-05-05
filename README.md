# 🩺 Sistema de Triagem Médica

<div align="center">
  
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
![Status](https://img.shields.io/badge/status-active-success.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](#-documentação)

</div>

<p align="center">
  <b>Um sistema inteligente para automatizar e otimizar o processo de triagem médica</b>
</p>

---

## ✨ Visão Geral

O Sistema de Triagem Médica é uma aplicação web completa desenvolvida para modernizar o processo de triagem em ambientes médicos, possibilitando agendamentos eficientes. O sistema conta com um processo de triagem inteligente que capta informações do paciente e gera um resultado sobre a gravidade, como critica, grave ou leve. Assim, o responsável, que será o administrador, poderá acompanhar essas informações e, com base nelas, agendar uma consulta para o paciente solicitante. O sistema gera para o paciente as informações do agendamento, incluindo data, horário, local, especialidade e médico responsável, cabendo ao paciente confirmar seu comparecimento.

O sistema também permite ao administrador armazenar o histórico médico do paciente no banco de dados. Após a consulta, o responsável lançará no histórico médico do paciente as informações geradas, como diagnóstico, medicação, contraindicações, entre outros. Dessa forma, o paciente poderá sempre acompanhar e verificar seu histórico de cada consulta finalizada.

A solução permite que usuários relatem seus sintomas, recebam avaliações iniciais baseadas em critérios médicos, gerenciem consultas e acessem seu histórico médico de forma intuitiva e segura.

### 🌟 Características Principais

- **Triagem Inteligente**: Avaliação automatizada baseada nos sintomas relatados, categorizando-os como grave, médio e crítico.
- **Gerenciamento de Consultas**:  O administrador fará o agendamento da consulta, definindo data, horário, local, especialidade e médico, com base no resultado da triagem.
- **Confirmação de Comparecimento** O paciente deverá confirmar seu comparecimento à consulta agendada. 
- **Registro Clínico Completo**: Administrador registrara o um historico sobre todas as informações do inicio ao fim do processo.
- **Acesso Clínico Completo**: O paciente poderá visualizar todo o seu histórico, mantendo essas informações arquivadas em um banco de dados. 
- **Segurança Avançada**: Autenticação robusta via JWT e proteção de dados sensíveis

---

## 📋 Requisitos do Sistema

### Funcionais

- ✅ Autenticação segura (login/logout)
- ✅ O sistema deve permitir a avaliação automatizada dos sintomas relatados pelos pacientes, classificando-os como grave, médio ou crítico.
- ✅ O administrador deve ser capaz de agendar consultas, definindo data, horário, local, especialidade e médico, com base nos resultados da triagem.
- ✅ O sistema deve enviar notificações de agendamento para os pacientes.

- ✅ O paciente deve ter a opção de confirmar seu comparecimento à consulta agendada.
- ✅ O administrador deve registrar todas as informações relevantes no histórico clínico do paciente, incluindo diagnósticos, medicações e contraindicações.
- ✅ O paciente deve poder visualizar seu histórico clínico completo a qualquer momento.
- ✅ O sistema deve oferecer autenticação segura via JWT para acesso a funcionalidades restritas.

### Não Funcionais
- ✅ A interface do usuário deve ser intuitiva e acessível, permitindo fácil navegação para pacientes e administradores.
- ✅ Os dados sensíveis dos pacientes devem ser protegidos através de criptografia e práticas de segurança robustas
- ✅ O sistema deve ser capaz de lidar com múltiplos usuários simultaneamente, mantendo um tempo de resposta máximo de 2 segundos para ações críticas.
- ✅ O sistema deve ser projetado para suportar um aumento no número de usuários e volume de dados sem perda de desempenho.
- ✅ O sistema deve ser compatível com os principais navegadores web e dispositivos móveis.
- ✅ O código deve ser modular e bem documentado, facilitando futuras manutenções e atualizações.

## 📊 Arquitetura do Sistema

### Diagrama de Casos de Uso
<div align ="center"  width="70%">
  
  ![alt text](/src/imagens/casodeusotriagem.PNG)
</div>

### Diagrama de classe
<div align="center"  width="70%">

  ![alt text](/src/imagens/diagramaclasse.PNG)

</div>

### Modelo Entidade-Relacionamento (DER)
<div align="center"  width="70%">

  ![alt text](/src/imagens/DERRRR.PNG)

</div>

### Diagrama de Sequencia
<div align="center"  width="70%">

  ![alt text](/src/imagens/diagramasequencia.PNG)

</div>

---

## 🛠️ Stack Tecnológica

### Frontend
<p>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite"/>
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios"/>
</p>

### Backend
<p>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma"/>
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="JWT"/>
</p>

# Dicionário de Dados

## Tabela: Usuario

Armazena informações dos usuários do sistema.

| Campo | Tipo | Descrição | Restrições |
|-------|------|-----------|------------|
| id | SERIAL | Identificador único do usuário | Chave primária |
| nome | TEXT | Nome completo do usuário | Não nulo |
| email | TEXT | Endereço de e-mail do usuário | Não nulo, Único |
| senha | TEXT | Senha do usuário | Não nulo |
| endereco | TEXT | Endereço completo do usuário | Não nulo |
| telefone | TEXT | Número de telefone do usuário | Não nulo |
| dataNascimento | TIMESTAMP | Data de nascimento do usuário | Não nulo |
| criadoEm | TIMESTAMP | Data e hora da criação do registro | Não nulo, Valor padrão: data/hora atual |
| atualizadoEm | TIMESTAMP | Data e hora da última atualização | Não nulo |

## Tabela: Admin

Armazena informações dos administradores do sistema.

| Campo | Tipo | Descrição | Restrições |
|-------|------|-----------|------------|
| id | SERIAL | Identificador único do administrador | Chave primária |
| nome | TEXT | Nome completo do administrador | Não nulo |
| email | TEXT | Endereço de e-mail do administrador | Não nulo, Único |
| senha | TEXT | Senha do administrador | Não nulo |
| criadoEm | TIMESTAMP | Data e hora da criação do registro | Não nulo, Valor padrão: data/hora atual |
| atualizadoEm | TIMESTAMP | Data e hora da última atualização | Não nulo |

## Tabela: Triagem

Armazena informações sobre as triagens realizadas para os usuários.

| Campo | Tipo | Descrição | Restrições |
|-------|------|-----------|------------|
| id | SERIAL | Identificador único da triagem | Chave primária |
| usuarioId | INTEGER | ID do usuário relacionado | Não nulo, Chave estrangeira (Usuario.id) |
| diabetico | BOOLEAN | Indica se o usuário é diabético | Não nulo |
| hipertenso | BOOLEAN | Indica se o usuário é hipertenso | Não nulo |
| obeso | BOOLEAN | Indica se o usuário é obeso | Não nulo |
| febre | BOOLEAN | Indica se o usuário está com febre | Não nulo |
| temperatura | DOUBLE PRECISION | Temperatura corporal do usuário | Pode ser nulo |
| temDor | BOOLEAN | Indica se o usuário sente dor | Não nulo |
| localDor | TEXT | Descrição do local da dor | Pode ser nulo |
| peso | DOUBLE PRECISION | Peso do usuário | Não nulo |
| idade | INTEGER | Idade do usuário | Não nulo |
| pontuacao | DOUBLE PRECISION | Pontuação da triagem | Não nulo |
| gravidade | TEXT | Classificação da gravidade da triagem | Não nulo |
| criadoEm | TIMESTAMP | Data e hora da criação do registro | Não nulo, Valor padrão: data/hora atual |
| atualizadoEm | TIMESTAMP | Data e hora da última atualização | Não nulo |

## Tabela: Consulta

Armazena informações sobre as consultas médicas.

| Campo | Tipo | Descrição | Restrições |
|-------|------|-----------|------------|
| id | SERIAL | Identificador único da consulta | Chave primária |
| usuarioId | INTEGER | ID do usuário relacionado | Não nulo, Chave estrangeira (Usuario.id) |
| adminId | INTEGER | ID do administrador relacionado | Não nulo, Chave estrangeira (Admin.id) |
| triagemId | INTEGER | ID da triagem relacionada | Não nulo, Chave estrangeira (Triagem.id) |
| data | TIMESTAMP | Data da consulta | Não nulo |
| hora | TEXT | Hora da consulta | Não nulo |
| local | TEXT | Local da consulta | Não nulo |
| especialidade | TEXT | Especialidade médica da consulta | Não nulo |
| medico | TEXT | Nome do médico responsável | Não nulo |
| confirmada | BOOLEAN | Indica se a consulta foi confirmada | Não nulo, Valor padrão: false |
| criadoEm | TIMESTAMP | Data e hora da criação do registro | Não nulo, Valor padrão: data/hora atual |
| atualizadoEm | TIMESTAMP | Data e hora da última atualização | Não nulo |

## Tabela: HistoricoMedico

Armazena informações sobre o histórico médico dos usuários.

| Campo | Tipo | Descrição | Restrições |
|-------|------|-----------|------------|
| id | SERIAL | Identificador único do histórico | Chave primária |
| usuarioId | INTEGER | ID do usuário relacionado | Não nulo, Chave estrangeira (Usuario.id) |
| adminId | INTEGER | ID do administrador relacionado | Não nulo, Chave estrangeira (Admin.id) |
| consultaId | INTEGER | ID da consulta relacionada | Não nulo, Chave estrangeira (Consulta.id), Único |
| diagnostico | TEXT | Diagnóstico médico | Não nulo |
| conclusao | TEXT | Conclusão do atendimento | Não nulo |
| criadoEm | TIMESTAMP | Data e hora da criação do registro | Não nulo, Valor padrão: data/hora atual |
| atualizadoEm | TIMESTAMP | Data e hora da última atualização | Não nulo |

## Relacionamentos

### Triagem → Usuario
- Uma triagem pertence a um usuário específico
- Um usuário pode ter múltiplas triagens

### Consulta → Usuario
- Uma consulta pertence a um usuário específico
- Um usuário pode ter múltiplas consultas

### Consulta → Admin
- Uma consulta é gerenciada por um administrador específico
- Um administrador pode gerenciar múltiplas consultas

### Consulta → Triagem
- Uma consulta está associada a uma triagem específica
- Uma triagem pode resultar em uma consulta

### HistoricoMedico → Usuario
- Um histórico médico pertence a um usuário específico
- Um usuário pode ter múltiplos históricos médicos

### HistoricoMedico → Admin
- Um histórico médico é registrado por um administrador específico
- Um administrador pode registrar múltiplos históricos médicos

### HistoricoMedico → Consulta
- Um histórico médico está associado a uma consulta específica
- Uma consulta gera apenas um histórico médico (relacionamento 1:1)


### Banco de Dados
<p>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/pgAdmin-4-F80000?style=for-the-badge&logo=postgresql&logoColor=white" alt="pgAdmin"/>
</p>

---


## 🚀 Configuração e Instalação

### Pré-requisitos
- Node.js ≥ 18.x
- PostgreSQL ≥ 13.x
- PgAdimin4
- Git

# Guia de Instalação - Sistema de Triagem Médica

Este guia apresenta os passos necessários para instalar e configurar o Sistema de Triagem Médica.

## Requisitos Prévios

- Node.js e npm
- PostgreSQL
- pgAdmin 4
- Git

## Passo a Passo de Instalação

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/sistema-triagem-medica.git
cd sistema-triagem-medica
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Configure o Ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```
DATABASE_URL="postgresql://postgres:sua_senha@localhost:5432/triagem_medica?schema=public"
JWT_SECRET="sua_chave_super_secreta"
```

> **Importante**: Substitua `sua_senha` e `sua_chave_super_secreta` pelos valores adequados ao seu ambiente.

### 4. Configure o Banco de Dados com pgAdmin 4

1. **Abra o pgAdmin 4**

2. **Registre um Novo Servidor**
   - Clique com o botão direito em "Servidores"
   - Selecione "Registrar" e depois "Servidor"

3. **Configure a Aba "Geral"**
   - Nome: `triagem_medica`

4. **Configure a Aba "Conexão"**
   - Host: `localhost`
   - Porta: `5432`
   - Banco de dados de manutenção: `postgres`
   - Nome de usuário: `postgres`
   - Senha: `sua_senha`
   - Clique em "Salvar"

5. **Crie um Novo Banco de Dados**
   - No servidor recém-criado, clique com o botão direito em "Bancos de Dados"
   - Selecione "Criar" e depois "Banco de Dados"
   - Nome do banco de dados: `triagem_medica`
   - Proprietário: `postgres`
   - Clique em "Salvar"

### 5. Configure o Prisma e Realize a Migração do Banco

```bash
npx prisma migrate
npx prisma migrate dev --name init
```

Após executar estes comandos, será criada uma estrutura de pastas como:

```
migrations/
└─ 20250423024508_create_users_and_posts/
   └─ migration.sql
```

### 6. Estrutura do Banco de Dados

O arquivo de migração criará as seguintes tabelas:

#### Tabela: Usuario
```sql
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);
```

#### Tabela: Admin
```sql
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);
```

#### Tabela: Triagem
```sql
CREATE TABLE "Triagem" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "diabetico" BOOLEAN NOT NULL,
    "hipertenso" BOOLEAN NOT NULL,
    "obeso" BOOLEAN NOT NULL,
    "febre" BOOLEAN NOT NULL,
    "temperatura" DOUBLE PRECISION,
    "temDor" BOOLEAN NOT NULL,
    "localDor" TEXT,
    "peso" DOUBLE PRECISION NOT NULL,
    "idade" INTEGER NOT NULL,
    "pontuacao" DOUBLE PRECISION NOT NULL,
    "gravidade" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Triagem_pkey" PRIMARY KEY ("id")
);
```

#### Tabela: Consulta
```sql
    CREATE TABLE "Consulta" 
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "adminId" INTEGER NOT NULL,
    "triagemId" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "hora" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "especialidade" TEXT NOT NULL,
    "medico" TEXT NOT NULL,
    "confirmada" BOOLEAN NOT NULL DEFAULT false,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Consulta_pkey" PRIMARY KEY ("id")
```

#### Tabela: HistoricoMedico
```sql
CREATE TABLE "HistoricoMedico" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "adminId" INTEGER NOT NULL,
    "consultaId" INTEGER NOT NULL,
    "diagnostico" TEXT NOT NULL,
    "conclusao" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HistoricoMedico_pkey" PRIMARY KEY ("id")
);
```

#### Índices e Chaves Estrangeiras
```sql
-- Índices únicos

  CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
  CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
  CREATE UNIQUE INDEX "HistoricoMedico_consultaId_key" ON "HistoricoMedico"("consultaId");

-- Chaves Estrangeiras

  ALTER TABLE "Triagem" ADD CONSTRAINT"Triagem_usuarioId_fkey"
  FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Consulta" ADD CONSTRAINT "Consulta_usuarioId_fkey" 
    FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Consulta" ADD CONSTRAINT "Consulta_adminId_fkey" 
    FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Consulta" ADD CONSTRAINT "Consulta_triagemId_fkey" 
    FOREIGN KEY ("triagemId") REFERENCES "Triagem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "HistoricoMedico" ADD CONSTRAINT "HistoricoMedico_usuarioId_fkey" 
    FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "HistoricoMedico" ADD CONSTRAINT "HistoricoMedico_adminId_fkey" 
    FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "HistoricoMedico" ADD CONSTRAINT "HistoricoMedico_consultaId_fkey" 
    FOREIGN KEY ("consultaId") REFERENCES "Consulta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
```

### 7. Inicie o Servidor FontEnd:

```bash
npm run dev

http://localhost:5173 "ou outra porta".
```
### 9. Inicie o Servidor BeckEnd:
```bash
npm run server

Servidor rodando na porta 3001
```



### 10. Prisma Studio (GUI para gerenciamento do banco de dados)
  ```bash
  npx prisma studio
  Acesse em: `http://localhost:5555`

  ```

## 📱 Demonstração

# Principais Telas

## Visualização das Telas

| Tela Inicial | Paciente | Administrador |
|:------------:|:-------:|:---------:|
| ![Tela Inicial 1](./src/imagens/login01.PNG) | ![Paciente 1](./src/imagens/44787.PNG) | ![Administrador 1](./src/imagens/admin01.PNG) |
| ![Tela Inicial 2](./src/imagens/login02.PNG) | ![Paciente 2](./src/imagens/user01.PNG) | ![Administrador 2](./src/imagens/admin02.PNG) |
| ![Tela Inicial 3](./src/imagens/cadastrar.PNG) | ![Paciente 3](./src/imagens/user02.PNG) | ![Administrador 3](./src/imagens/admin03.PNG) |
| ![Tela Inicial 4](./src/imagens/login02.PNG) | ![Paciente 4](./src/imagens/user03.PNG) | ![Administrador 4](./src/imagens/admin04.PNG) |
| ![Tela Inicial 5](./src/imagens/login02.PNG) | ![Paciente 5](./src/imagens/user04.PNG) | ![Administrador 5](./src/imagens/admin05.PNG) |
| ![Tela Inicial 6](./src/imagens/login02.PNG) | ![Paciente 6](./src/imagens/user05.PNG) | ![Administrador 6](./src/imagens/admin06.PNG) |
### Fluxo de Utilização

1. **Login no Sistema**
2. **Preenchimento da Triagem**
   - Informação de sintomas e condições de saúde
   - Cálculo automático da gravidade
3. **Visualização de Consultas Agendadas**
4. **Acesso ao Histórico Médico**

---

## 📚 Documentação

Toda a documentação técnica está disponível na pasta `docs`:

- 📘 Manual do Usuário (PDF)
- 🧱 Modelo Entidade-Relacionamento (DER)
- ⚙️ Diagrama de Casos de Uso

---

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Para contribuir:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das alterações (`git commit -m 'feat: Adiciona nova funcionalidade'`)
4. Faça push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

## 👨‍💻 Desenvolvedor

<div align="center">
  <table>
    <tr>
      <td align="center">
        <a href="https://github.com/valdeircesario">
          <img src="https://github.com/valdeircesario.png" width="100px;" alt="Foto do desenvolvedor"/><br>
          <sub>
            <b>Valdeir Cesario</b>
          </sub>
        </a>
      </td>
    </tr>
  </table>
</div>

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/seu-linkedin)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/seu-usuario)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:seu-email@example.com)

---

<div align="center">
  <sub>© 2025 Sistema de Triagem Médica. Todos os direitos reservados.</sub>
</div>