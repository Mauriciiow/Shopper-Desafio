# Monorepo

Este projeto é um monorepo que agrupa os serviços necessários para a aplicação de solicitação de viagem.

## Como Rodar o Projeto

Para iniciar todos os serviços, utilize o comando abaixo:

```bash
docker compose up
```

## Variáveis de Ambiente do Frontend

As variáveis de ambiente específicas do frontend devem ser colocadas no arquivo `.env` dentro do diretório do próprio frontend.

### Exemplo de Configuração

Um exemplo de variável de ambiente no arquivo `.env` do frontend:

```env
VITE_GOOGLE_API_KEY=your-google-api-key
```
