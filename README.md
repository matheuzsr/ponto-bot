# ponto-bot
1. Inserir os dados no `.env`
2. Instalar a libnotify-bin
```
sudo apt-get install libnotify-bin
```
3. Alterar o local onde irá salvando o log https://github.com/matheuzsr/ponto-bot/blob/1a04100600c17373893f09b89e9e5b414f53c542/src/NotifyCommand.ts#L18

# Scripts
- dev: `yarn start:dev`
- build: `yarn build`

Basta posteriormente criar um atalho para executar o comando via bash

Por fim, mas não menos importante, é imprescindível alterar o código para clicar no botão de "continuar", alterando o código para selecionar o `:last-child`
https://github.com/matheuzsr/ponto-bot/blob/1a04100600c17373893f09b89e9e5b414f53c542/src/boot-command/MarcarPontoCommand.ts#L31
