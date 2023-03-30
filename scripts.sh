#!/bin/bash

# TODO: Alterar aqui o caminho do script
cd /home/logcomex/projects/ponto-bot

node dist

 cd .output/

 xdg-open "$(ls -1tr | tail -1)"