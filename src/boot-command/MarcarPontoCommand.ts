import dotenv from "dotenv";
dotenv.config();
import { Page } from "puppeteer";
import AbstractBootCommand from "./AbstractBootCommand";
import NotifyCommand from "../NotifyCommand";

export default class MarcarPontoCommand extends AbstractBootCommand {
  constructor(page: Page, notifyHandler: NotifyCommand) {
    super(page, notifyHandler);
  }

  public async execute(): Promise<string> {
    await this.notifyStepEvent("Realizando tarefa de bater do ponto");

    try {
      const framePonto = await this.page.waitForFrame(async (frame) => {
        return frame.url().includes("/FrequenciaCoreWeb/home");
      });

      const marcarPontoButton = await framePonto?.waitForSelector(
        ".hour-counter + button"
      );
      await marcarPontoButton?.click();

      // TODO: Alterar aqui de "first-child" p/ "last-child"
      const confirmarMarcarPontoButton = await framePonto?.waitForSelector(
        ".jss10 + div + div > button:first-child"
      );
      await confirmarMarcarPontoButton?.click();

      await framePonto?.waitForSelector(".people-infos__punches");

      const ultimosPontos = (await framePonto?.evaluate(() => {
        return document.querySelector(".people-infos__punches")?.textContent;
      })) as string;

      await new Promise((resolve) => setTimeout(resolve, 2000));

      await this.page.screenshot({
        path: `.output/${new Date().getTime()}-page-button-register.png`,
      });

      return ultimosPontos;
    } catch (e) {
      throw new Error("Erro ao marcar o ponto!");
    }
  }
}
