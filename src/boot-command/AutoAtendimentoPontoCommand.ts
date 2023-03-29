import dotenv from "dotenv";
dotenv.config();
import { Page } from "puppeteer";
import AbstractBootCommand from "./AbstractBootCommand";
import NotifyCommand from "../NotifyCommand";

export default class AutoAtendimentoPontoCommand extends AbstractBootCommand {
  constructor(page: Page, notifyHandler: NotifyCommand) {
    super(page, notifyHandler);
  }

  public async execute(): Promise<void> {
    await this.notifyStepEvent("Abrindo page autoatendimento");
    try {
      const inputSearch = await this.page.waitForSelector(
        '[aria-label="Informe dois ou mais caracteres para pesquisar por funcionários, serviços ou relatórios"]'
      );
      await inputSearch?.type("Autoatendimento Ponto");

      const buttonSideBar = await this.page.waitForSelector(
        'li[aria-label="Autoatendimento Ponto"]'
      );
      await buttonSideBar?.click();
    } catch (err) {
      throw new Error("Erro ao entrar na page auto atendimento");
    }
  }
}
