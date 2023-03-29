import dotenv from "dotenv";
dotenv.config();
import { Page } from "puppeteer";
import AbstractBootCommand from "./AbstractBootCommand";
import NotifyCommand from "../NotifyCommand";

export default class LoginCommand extends AbstractBootCommand {
  constructor(page: Page, notifyHandler: NotifyCommand) {
    super(page, notifyHandler);
  }

  public async execute(): Promise<void> {
    await this.notifyStepEvent("Abrindo page login");

    try {
      const inputLogin = await this.page.waitForSelector("#Login");
      await inputLogin?.type(process.env.LOGIN as string);

      const buttonLoginNextStep = await this.page.waitForSelector(
        ".login__botao-continuar"
      );
      await buttonLoginNextStep?.click();

      const inputPassword = await this.page.waitForSelector("#Senha");
      await inputPassword?.type(process.env.PASSWORD as string);

      await buttonLoginNextStep?.click();
    } catch (e) {
      throw new Error("Erro ao realizar o login");
    }
  }
}
