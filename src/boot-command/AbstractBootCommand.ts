import { Page } from "puppeteer";
import NotifyHandler from "../NotifyCommand";

export default abstract class AbstractBootCommand {
  protected page: Page;
  private notifyHandler: NotifyHandler;

  constructor(page: Page, notifyHandler: NotifyHandler) {
    this.page = page;
    this.notifyHandler = notifyHandler;
  }

  public async execute(): Promise<void | any> {}

  protected async notifyStepEvent(message: string) {
    await this.notifyHandler.send("🟡 Executando...", message);
  }
}
