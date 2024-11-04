#!/bin/bash

# TODO: Alterar aqui o caminho do script
cd /home/logcomex/projects/test-marcacao

git pull origin main

node dist

if ! [ -d .output/ ]; then
  mkdir .output && echo "Creating output directory"
fi

cd .output/

xdg-open "$(ls -1tr | tail -1)"