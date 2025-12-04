# Ass Podologia - Landing Page e Sistema de Agendamento

Este projeto é uma aplicação **Full Stack** desenvolvida como estudo e caso prático para consolidar conhecimentos em **Laravel (backend)** e **React (frontend)**.

O sistema permite que clientes agendem consultas de podologia de maneira prática e rápida, enviando também uma confirmação automática por e-mail.

---

## 🚀 Tecnologias utilizadas

### Backend (API RESTful)
- PHP 8.2
- Laravel 12
- MySQL
- Mailtrap (para testes de envio de e-mail)

### Frontend
- React 18 (com Vite)
- Bootstrap 5
- Axios (para comunicação com API)

---

## 📌 Funcionalidades atuais
- ✅ Calendário com datas ocupadas destacadas
- ✅ Formulário com seleção de horário e validação
- ✅ Botão de voltar do agendamento para o calendário
- ✅ Envio de dados para API + persistência no banco
- ✅ Integração com Mailtrap para envio de e-mails de confirmação
- ✅ Controle de estado entre os componentes
---
## 🔮 Próximas implementações
🔐 Área administrativa para controle dos agendamentos

🔍 Busca e filtros por data/cliente

🌐 Deploy com integração contínua via GitHub Actions

☁️ Publicação do projeto na Hostinger
---
## 🔗 APIs disponíveis

Método	Endpoint	Descrição
POST	/api/appointments	Agendar uma nova consulta
GET	/api/appointments	Listar todas as consultas agendadas

---

## 📬 Email
As confirmações de agendamento são enviadas automaticamente para o e-mail informado pelo cliente.

⚡ Para testes locais foi utilizado o serviço Mailtrap.io.

---

## ✨ Próximas funcionalidades planejadas
- Filtros e busca de agendamentos
- Painel administrativo
- Integração de pagamento (para consultas pagas)
- Deploy automatizado com CI/CD (GitHub Actions)

---

## 🧑‍💻 Autor
Desenvolvido com ❤️ por Misael Marcelino.

[LinkedIn](https://www.linkedin.com/in/misael-marcelino/) | [GitHub](https://github.com/misaelmarcelino)