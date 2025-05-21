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

# ✨ Visão Geral

O **Sistema de Triagem Médica** é uma aplicação web completa desenvolvida para modernizar o processo de triagem em ambientes de saúde. Este sistema foi projetado para otimizar o fluxo de atendimento médico, permitindo uma avaliação inicial dos pacientes baseada em seus sintomas e condições de saúde.

O processo inicia-se com o preenchimento de um formulário de triagem pelo paciente, onde são coletadas informações sobre suas condições prévias, como:

 ✅ Status de obesidade, hipertensão ou diabetes.

 ✅ Presença de febre e temperatura corporal.

 ✅ Presença, localização e intensidade de dor.

 ✅ Medicamentos em uso.

 ✅ Dados biométricos (peso e idade)

Após o preenchimento do formulário, o sistema implementa uma lógica de classificação que analisa os dados fornecidos e determina a gravidade do caso do paciente. Com base nesta avaliação, o sistema estabelece uma prioridade de atendimento, permitindo que o responsável pela gestão dos agendamentos visualize o resultado de todas as triagens e organize as consultas de acordo com a urgência de cada caso.

Quando o agendamento é concluído, o paciente pode visualizá-lo ao fazer login no sistema, tendo acesso às informações de data, hora, local e médico responsável, além de poder confirmar seu comparecimento. Após a consulta, o administrador ou médico responsável registra o histórico médico do paciente, documentando todo o processo desde a triagem até o resultado final, incluindo diagnóstico, prescrições médicas, orientações e exames solicitados. Este histórico fica permanentemente disponível para acesso pelo paciente.

A solução proporciona uma interface intuitiva que permite a avaliação preliminar automatizada e o acompanhamento de todo o processo, desde a triagem até o atendimento médico e seu histórico clínico. O sistema categoriza os casos por gravidade (crítica, grave ou leve), facilitando a priorização do atendimento e a alocação eficiente de recursos médicos.

---

# 💡 Objetivos

### ***O Sistema de Triagem Médica tem como principais objetivos:***

- Automatizar o processo de triagem médica, reduzindo o tempo de espera dos pacientes
- Otimizar o agendamento de consultas baseado na gravidade dos casos
- Manter um registro completo do histórico médico dos pacientes
- Facilitar o acesso aos dados clínicos para pacientes e profissionais de saúde
- Aumentar a eficiência operacional em ambientes de assistência médica
- Proporcionar uma experiência intuitiva para todos os usuários do sistema
- Reduzir a sobrecarga administrativa das equipes de saúde
- Melhorar a qualidade do atendimento através da priorização adequada de casos
---

# 🎯 Público-alvo

### ***O sistema foi desenvolvido para atender às necessidades de:***

- **Pacientes:** Que necessitam de avaliação médica e desejam um processo simplificado de triagem e agendamento
- **Administradores do sistema:** Responsáveis por gerenciar o fluxo de atendimento, agendamentos e registros médicos
- **Profissionais de saúde:** Médicos e enfermeiros que necessitam de acesso rápido ao histórico dos pacientes
- **Gestores de instituições de saúde:** Interessados em otimizar recursos e melhorar a eficiência operacional
- **Equipe de recepção e acolhimento:** Responsáveis pelo primeiro contato com pacientes e organização do fluxo de atendimento


---

# 🏛️ Arquitetura do Sistema

### ***🔍 Visão Geral da Arquitetura***

O Sistema de Triagem Médica utiliza uma arquitetura cliente-servidor moderna, com separação clara entre frontend e backend:

- **Frontend:** Desenvolvido em React com Vite, proporciona uma interface de usuário responsiva e intuitiva
- **Backend:** Construído com Node.js, gerencia a lógica de negócios, autenticação e comunicação com o banco de dados
- **Banco de Dados:** PostgreSQL, armazena de forma estruturada e relacional todos os dados do sistema
- **API RESTful:** Proporciona comunicação eficiente entre frontend e backend

Esta arquitetura permite escalabilidade, manutenção simplificada e uma experiência de usuário consistente em diferentes dispositivos.

---

## 📋 Requisitos do Sistema

### ***- Requisitos Funcionais***

**RF001 - Autenticação de Usuários**
- O sistema deve permitir o cadastro de novos usuários (pacientes)
- O sistema deve autenticar usuários através de e-mail e senha
- O sistema deve implementar diferentes níveis de acesso (paciente e administrador)

**RF002 - Triagem Automatizada**
- O sistema deve apresentar formulário para coleta de informações de saúde
- O sistema deve processar os dados fornecidos e calcular a gravidade do caso
- O sistema deve classificar os casos em três níveis: crítico, grave e leve
- O sistema deve armazenar todas as informações da triagem

**RF003 - Gestão de Consultas**
- O sistema deve permitir que administradores visualizem todas as triagens
- O sistema deve sugerir prioridades baseadas na gravidade das triagens
- O sistema deve permitir agendamento de consultas com definição de data, hora, local e médico
- O sistema deve notificar pacientes sobre consultas agendadas ao efetuar o seu login

**RF004 - Confirmação de Presença**
- O sistema deve exibir consultas agendadas para o paciente autenticado
- O sistema deve permitir que pacientes confirmem seu comparecimento
- O sistema deve registrar as confirmações e disponibilizá-las para administradores

**RF005 - Histórico Médico**
- O sistema deve permitir registro de informações completas após as consultas
- O sistema deve incluir campos para diagnósticos, medicações e observações
- O sistema deve disponibilizar histórico completo para visualização pelo paciente
- O sistema deve permitir pesquisa e filtro de registros históricos

**RF006 - Notificações**
- O sistema deve alertar administradores sobre casos críticos
- O sistema deve mostrar as consultas próximas

---

### ***- Requisitos Não Funcionais***

**RNF001 - Usabilidade**
- A interface deve ser intuitiva e acessível para todos os perfis de usuários
- O sistema deve ser responsivo e adaptável a diferentes tamanhos de tela
- O tempo médio para completar a triagem não deve exceder 5 minutos
- O sistema deve seguir padrões de acessibilidade

**RNF002 - Segurança**
- Todas as senhas devem ser armazenadas utilizando tokens
- A comunicação entre cliente e servidor deve ser criptografada (HTTPS)
- Os tokens de autenticação devem expirar em 24 horas

**RNF003 - Desempenho**
- O tempo de resposta para operações regulares não deve exceder 2 segundos
- O sistema deve suportar até 100 usuários simultâneos
- O tempo de carregamento inicial não deve exceder 3 segundos em conexões 4G
- As consultas ao banco de dados devem ser otimizadas para evitar gargalos

**RNF004 - Escalabilidade**
- O banco de dados deve ser dimensionado para suportar crescimento de ate 50% ao ano
- O sistema deve ser modular para permitir expansão de funcionalidades

**RNF005 - Disponibilidade**
- O sistema deve estar disponível 99,9% do tempo (downtime máximo de 8,76 horas/ano)
- Manutenções programadas devem ocorrer fora do horário comercial


**RNF006 - Compatibilidade**
- O sistema deve funcionar nos navegadores Chrome, Firefox, Safari e Edge (duas versões mais recentes)
- A interface deve ser responsiva para dispositivos móveis, tablets e desktops


---


# 🏛️ Arquitetura do Sistema

### ***🔎 Visão Geral da Arquitetura***

O Sistema de Triagem Médica utiliza uma arquitetura cliente-servidor moderna, com separação clara entre frontend e backend:

- **Frontend:** Desenvolvido em React com Vite, proporciona uma interface de usuário responsiva e intuitiva
- **Backend:** Construído com Node.js, gerencia a lógica de negócios, autenticação e comunicação com o banco de dados
- **Banco de Dados:** PostgreSQL, armazena de forma estruturada e relacional todos os dados do sistema
- **API RESTful:** Proporciona comunicação eficiente entre frontend e backend

Esta arquitetura permite escalabilidade, manutenção simplificada e uma experiência de usuário consistente em diferentes dispositivos.

---
# Diagramas

## ***Diagrama de Arquitetura***

<div align ="center"  width="70%">
  
  ![alt text](/src/imagens/DiagramaEstrutura.png)
</div>

## ***Diagrama de Casos de Uso***

<div align="center"  width="70%">

  ![alt text](/src/imagens/DiagramaCasoUso.png)

</div>

## ***Diagrama de classe***
<div align="center"  width="70%">

  ![alt text](/src/imagens/diagramadeclasse01.PNG)

</div>


## ***Modelo Entidade-Relacionamento (DER)***
<div align="center"  width="70%">

  ![alt text](/src/imagens/Diagrama.png)

</div>

## ***diagrama de sequencia***
<div align="center"  width="70%">

  ![alt text](/src/imagens/diagramasequen.png)

</div>



---

## 🛠️ Stack Tecnológica

### ***Frontend***
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

---

# Dicionário de Dados

## ***Tabela: Usuario***

***Armazena informações dos usuários do sistema.***

| **Campo** | **Tipo** | **Descrição** | **Restrições** |
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

## ***Tabela: Admin***

***Armazena informações dos administradores do sistema.***

| **Campo** | **Tipo** | **Descrição** | **Restrições** |
|-------|------|-----------|------------|
| id | SERIAL | Identificador único do administrador | Chave primária |
| nome | TEXT | Nome completo do administrador | Não nulo |
| email | TEXT | Endereço de e-mail do administrador | Não nulo, Único |
| senha | TEXT | Senha do administrador | Não nulo |
| criadoEm | TIMESTAMP | Data e hora da criação do registro | Não nulo, Valor padrão: data/hora atual |
| atualizadoEm | TIMESTAMP | Data e hora da última atualização | Não nulo |

## ***Tabela: Triagem***

***Armazena informações sobre as triagens realizadas para os usuários.***

| **Campo** | **Tipo** | **Descrição** | **Restrições** |
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

## ***Tabela: Consulta***

***Armazena informações sobre as consultas médicas.***

| **Campo** | **Tipo** | **Descrição** | **Restrições** |
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

## ***Tabela: HistoricoMedico***

***Armazena informações sobre o histórico médico dos usuários.***

| **Campo** | **Tipo** | **Descrição** | **Restrições** |
|-------|------|-----------|------------|
| id | SERIAL | Identificador único do histórico | Chave primária |
| usuarioId | INTEGER | ID do usuário relacionado | Não nulo, Chave estrangeira (Usuario.id) |
| adminId | INTEGER | ID do administrador relacionado | Não nulo, Chave estrangeira (Admin.id) |
| consultaId | INTEGER | ID da consulta relacionada | Não nulo, Chave estrangeira (Consulta.id), Único |
| diagnostico | TEXT | Diagnóstico médico | Não nulo |
| conclusao | TEXT | Conclusão do atendimento | Não nulo |
| criadoEm | TIMESTAMP | Data e hora da criação do registro | Não nulo, Valor padrão: data/hora atual |
| atualizadoEm | TIMESTAMP | Data e hora da última atualização | Não nulo |

---
# 🔗 Relacionamentos

### ***Triagem → Usuario***
- Uma triagem pertence a um usuário específico
- Um usuário pode ter múltiplas triagens

### ***Consulta → Usuario***
- Uma consulta pertence a um usuário específico
- Um usuário pode ter múltiplas consultas

### ***Consulta → Admin***
- Uma consulta é gerenciada por um administrador específico
- Um administrador pode gerenciar múltiplas consultas

### ***Consulta → Triagem***
- Uma consulta está associada a uma triagem específica
- Uma triagem pode resultar em uma consulta

### ***HistoricoMedico → Usuario***
- Um histórico médico pertence a um usuário específico
- Um usuário pode ter múltiplos históricos médicos

### ***HistoricoMedico → Admin***
- Um histórico médico é registrado por um administrador específico
- Um administrador pode registrar múltiplos históricos médicos

### ***HistoricoMedico → Consulta***
- Um histórico médico está associado a uma consulta específica
- Uma consulta gera apenas um histórico médico (relacionamento 1:1)

---

# 🛠️ Funcionalidades do Sistema

## ⚙️ Gestão de Usuários

***O módulo de Gestão de Usuários permite:***

**1. Cadastro de Novos Usuários**
- Formulário completo para captação de dados pessoais
- Validação de informações em tempo real
- Criação de credenciais de acesso seguras


**2. Autenticação**
- Login seguro com verificação de credenciais
- Diferenciação entre perfis de acesso (paciente/administrador)

**3. Gestão de Perfil**
- Gerenciamento de preferências de notificação
- Visualização de histórico de atividades

**4. Controle de Acesso**
- Permissionamento baseado em perfis
- Acesso restrito a funcionalidades administrativas
- Auditoria de ações sensíveis
---

## ⚙️ Processo de Triagem

***O módulo de Triagem automatiza a avaliação inicial de pacientes:***

**1. Coleta de Informações**
- Questionário estruturado sobre condições de saúde:
  - Condições pré-existentes (diabetes, hipertensão, obesidade)
  - Sintomas atuais (febre, dor)
  - Dados biométricos (peso, temperatura)
- Interface acessível e intuitiva
- Progresso do preenchimento visível ao usuário

**2. Algoritmo de Classificação**
- Processamento das informações coletadas
- Cálculo de pontuação baseado em critérios médicos predefinidos
- Categorização da gravidade (crítica, grave, leve)
- Regras de negócio implementadas para avaliação consistente

**3. Resultado da Triagem**
- Exibição do resultado com classificação de gravidade
- Recomendações iniciais baseadas na classificação
- Armazenamento dos dados para consulta posterior
- Alertas automáticos para casos críticos

**4. Métricas e Relatórios**
- Estatísticas de triagens por período
- Distribuição de casos por gravidade
- Tempo médio entre triagem e atendimento
- Relatórios exportáveis para análise

---

## ⚙️ Agendamento de Consultas

***O módulo de Agendamento gerencia o processo de marcação de consultas:**

**1. Criação de Agendamentos**
- Interface administrativa para definição de:
  - Data e hora
  - Local de atendimento
  - Especialidade médica
  - Profissional responsável

**2. Priorização Baseada em Triagem**
- Sugestão automática de prioridade conforme gravidade
- Alertas para casos críticos
- Visualização de triagens pendentes ordenadas por urgência
- Dashboard com resumo de casos aguardando agendamento

**3. Notificação ao Paciente**
- Comunicação automática sobre detalhes do agendamento
- Solicitação de confirmação de presença

**4. Confirmação de Comparecimento**
- Interface para que o paciente confirme sua presença
- Registro da confirmação no sistema
- Alerta para administradores sobre confirmações pendentes

**5. Gerenciamento de Agenda**
- Visualização de calendário com todas as consultas
- Ajustes em tempo real quando necessário

---

## ⚙️ Histórico Médico

***O módulo de Histórico Médico mantém o registro completo de atendimentos:***

**1. Registro Pós-Consulta**
- Interface para administradores registrarem:
  - Diagnóstico
  - Conclusões médicas
  - Medicamentos prescritos
  - Exames solicitados
  - Orientações ao paciente
- Vinculação automática com a consulta realizada

**2. Visualização do Histórico**
- Interface para pacientes acessarem seu histórico completo
- Organização cronológica dos atendimentos
- Detalhamento de cada consulta e seus resultados
- Visualização de evolução do quadro de saúde

**3. Pesquisa e Filtros**
- Filtros para visualização específica de informações

**4. Privacidade e Segurança**
- Acesso restrito apenas ao próprio paciente e profissionais autorizados
- Logs de acesso para auditoria
- Criptografia de dados sensíveis
- Conformidade com legislações de proteção de dados

---

## 🛢️ Banco de Dados
<p>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/pgAdmin-4-F80000?style=for-the-badge&logo=postgresql&logoColor=white" alt="pgAdmin"/>
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />

</p>

---


# 🏛️ Estrutura do Banco de Dados

***O arquivo de migração criará as seguintes tabelas:***

## ***Tabela: Usuario***

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

## ***Tabela: Admin***

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

## ***Tabela: Triagem***

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

## ***Tabela: Consulta***

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

## ***Tabela: HistoricoMedico***

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

## ***Índices e Chaves Estrangeiras***

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

# 🛠️ Configuração e Instalação

## ***Pré-requisitos***

- Node.js ≥ 18.x
- PostgreSQL ≥ 13.x
- PgAdimin4
- Git

---

# 💾Guia de Instalação - Sistema de Triagem Médica

***Este guia apresenta os passos necessários para instalar e configurar o Sistema de Triagem Médica.***
---
# 🔧 Requisitos Prévios

- Node.js e npm
- PostgreSQL
- pgAdmin 4
- Git

---

# 🔨 Passo a Passo de Instalação

## ***Clone o Repositório***

```bash
git clone https://github.com/valdeircesario/MedTriagem.git

```

## ***Instale as Dependências***

```bash
npm install
```
## ***Instale a Dependência para o envio de email de recuperação de senha***

```bash
npm install nodemailer
```

## ***Configure o Ambiente***

*Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:*

```
DATABASE_URL="postgresql://postgres:sua_senha@localhost:5432/triagem_medica?schema=public"
JWT_SECRET="sua_chave_super_secreta"
```

> **Importante**: Substitua `sua_senha` e `sua_chave_super_secreta` pelos valores adequados ao seu ambiente.
---

# 🛠️ Configure o Banco de Dados com pgAdmin 4

1.  ***Abra o pgAdmin 4***

2. ***Registre um Novo Servidor***
   - Clique com o botão direito em "Servidores"
   - Selecione "Registrar" e depois "Servidor"

3. ***Configure a Aba "Geral"***
   - Nome: `triagem_medica`

4. ***Configure a Aba "Conexão"***
   - Host: `localhost`
   - Porta: `5432`
   - Banco de dados de manutenção: `postgres`
   - Nome de usuário: `postgres`
   - Senha: `sua_senha`
   - Clique em "Salvar"

5. ***Crie um Novo Banco de Dados***
   - No servidor recém-criado, clique com o botão direito em "Bancos de Dados"
   - Selecione "Criar" e depois "Banco de Dados"
   - Nome do banco de dados: `triagem_medica`
   - Proprietário: `postgres`
   - Clique em "Salvar"

---

# 🛠️ Configure o Prisma e Realize a Migração do Banco

```bash
npx prisma migrate
npx prisma migrate dev --name init
npx sequelize-cli db:migrate
```

Após executar estes comandos, será criada uma estrutura de pastas como:

```
migrations/
└─ 20250423024508_create_users_and_posts/
   └─ migration.sql
```



## ***🔑 Inicie o Servidor FontEnd:***

```bash
npm run dev

http://localhost:5173 "ou outra porta".
```
## ***🔨 Inicie o Servidor BeckEnd:***
```bash
npm run server

Servidor rodando na porta 3001
```



## ***⚙️ Prisma Studio (GUI para gerenciamento do banco de dados)***
  ```bash
  npx prisma studio
  Acesse em: `http://localhost:5555`

  ```

# 📱 Demonstração

## ***Principais Telas***

## ***Visualização das Telas***

| *Tela Inicial* | *Paciente* | *Administrador* |
|:------------:|:-------:|:---------:|
| ![Tela Inicial 1](/src/imagens/login01.png) | ![Paciente 1](/src/imagens/user01.png) | ![Administrador 1](/src/imagens/admin01.png) |
| ![Tela Inicial 2](/src/imagens/cadastro.png) | ![Paciente 2](/src/imagens/user02.png) | ![Administrador 2](/src/imagens/admin02.png) |
| ![Tela Inicial 3](/src/imagens/recuperarsenha.png) | ![Paciente 3](/src/imagens/user03.png) | ![Administrador 3](/src/imagens/admin03.png) |
| ![Tela Inicial 4](/src/imagens/login01.png) | ![Paciente 4](/src/imagens/user05.png) | ![Administrador 4](/src/imagens/user06.png) |
| ![Tela Inicial 5](/src/imagens/user07.png) | ![Paciente 5](/src/imagens/user08.png) | ![Administrador 5](/src/imagens/admin03.png) |



## ***Fluxo de Utilização***

1. ***Login no Sistema***
2. ***Preenchimento da Triagem***
   - Informação de sintomas e condições de saúde
   - Cálculo automático da gravidade
3. ***Visualização de Consultas Agendadas***
4. ***Acesso ao Histórico Médico***

---

# 📚 Documentação

***Toda a documentação técnica está disponível na pasta*** `docs`:

- 📘 [Documentação Completa. (PDF)](/src/docs/Documentação_sitema_de_triagem.pdf)

---

# 🤝 Contribuição

***Contribuições são sempre bem-vindas! Para contribuir:***

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das alterações (`git commit -m 'feat: Adiciona nova funcionalidade'`)
4. Faça push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

# 👨‍💻 Desenvolvedor

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

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/valdeircesario2023)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/valdeircesario)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:valdeircesario11@hotmail.com)

---

<div align="center">
  <sub>© 2025 Sistema de Triagem Médica. Todos os direitos reservados.</sub>
</div>