# 📦 KOZZY Distribuidora - Sistema de Portaria

Este projeto é uma aplicação web (Frontend React) desenvolvida para gerenciar e registrar a entrada e saída de pessoas e veículos na portaria da KOZZY Distribuidora.

## ✨ Visão Geral da Aplicação

O "Sistema de Portaria" é uma ferramenta simples e eficiente focada em registrar o fluxo de entradas. Ele é ideal para porteiros/seguranças que precisam de uma interface rápida para inserir dados de visitantes, fornecedores ou funcionários, acompanhar o status de entrada e realizar ações básicas como editar ou deletar registros.

### 🎯 Principais Funcionalidades

- **Cadastro de Usuário:** Permite que novos usuários da portaria criem suas contas para acessar o sistema.
- **Login/Autenticação:** Acesso seguro às funcionalidades da aplicação.
- **Menu Lateral (Sidebar):** Navegação simplificada entre as telas de Registros e Novo Registro, além da opção de Sair da Conta.
- **Registro de Entradas:** Criação de novos registros com campos essenciais (Nome, Tipo de Pessoa, CPF, Data, Hora, Placa e Foto de Identificação).
- **Visualização da Tabela:** Exibição clara de todos os registros em uma tabela, incluindo a data, nome, status e placa.
- **Ações na Tabela:** Botões para **Editar** e **Deletar** registros diretamente da tabela.
- **Gestão de Status:** Os registros podem ter status como "Pendente" ou "Liberado" (dependendo da sua implementação final).

## 🚀 Como Testar a Aplicação

Este guia pressupõe que você já configurou o ambiente React (utilizando `npm` ou `yarn`) e instalou as dependências necessárias.

### Pré-requisitos

1.  Node.js e npm (ou yarn) instalados.
2.  Dependências do projeto (React, `react-router-dom`, `react-icons`, `axios`, etc.) instaladas via `npm install`.

### 1. Clonar reposítório:

```
git clone https://github.com/allanunus/projeto_react_kozzy.git
```

### 2. Iniciar o Servidor de Desenvolvimento (backend - em um primeiro terminal):

Execute o comando de inicialização da api (pasta backend) no primeiro terminal, faça:

Acesse a pasta projeto_react_kozzy no terminal do vs code:

```
cd projeto_react_kozzy
```

Depois, acesse a pasta backend:

```
cd backend
```

Agora teste a aplicação com o comando:

```
npm start
ou
npm run dev
```

**OBS:** Deixe rodando a aplicação no terminal 1

### 3. Iniciar o Servidor de Desenvolvimento (fronted - em um segundo terminal):

Execute o comando de inicialização do web (pasta frontend) num novo terminal (segundo) -- deixando o primeiro da api rodando tbm, faça:

Depois, acesse a pasta backend:

```
cd frontend
```

Agora teste a aplicação com o comando:

```
npm start
ou
npm run dev
```

---

Nome dos integrantes:

Allana Ap R Ribeiro,
Isabella M Barbosa,
Joaquim Diglio,
Maria Eduarda Torres
