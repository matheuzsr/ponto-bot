import dotenv from "dotenv";
dotenv.config();

import puppeteer from "puppeteer";
import { spawn } from "child_process";
import NotifyHandlerCommand from "./NotifyCommand";

import LoginCommand from "./boot-command/LoginCommand";
import AutoAtendimentoPontoCommand from "./boot-command/AutoAtendimentoPontoCommand";
import MarcarPontoCommand from "./boot-command/MarcarPontoCommand";

async function robo() {
  const notifyCommand = new NotifyHandlerCommand(spawn);

  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: [`--window-size=${1920},${1080}`],
    timeout: 50000,
  });

  const page = await browser.newPage();
  await page.goto(process.env.URL as string);

  const loginCommand = new LoginCommand(page, notifyCommand);
  const autoAtendimentoCommand = new AutoAtendimentoPontoCommand(
    page,
    notifyCommand
  );
  const marcarPontoCommand = new MarcarPontoCommand(page, notifyCommand);

  try {
    await loginCommand.execute();
    await autoAtendimentoCommand.execute();
    const ultimosPontos = await marcarPontoCommand.execute();

    notifyCommand.send("Registro de ponto", `Ponto registrado com sucesso! ✅ | ${ultimosPontos}`);
  } catch (e: any) {
    await notifyCommand.send("Registro de ponto", `${e.message} ❌`);
    console.log(e.message);
  } finally {
    await browser.close();
  }
}
robo();
