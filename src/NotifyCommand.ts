import dotenv from "dotenv";
dotenv.config();
import fs from "fs";

export default class MarcarPontoCommand {
  constructor(private spawn: any) {}

  public async send(title: string, message: string) {
    const notify = this.spawn("bash", [
      "-c",
      `'notify-send' '${title}' '${this.getCurrentDate()} | ${message}'`,
    ]);

    notify.on("close", (code: string) => {
      console.log(`Processo filho saiu com o código ${code}`);
    });
    
    fs.appendFileSync('/home/logcomex/projects/ponto-bot/log.txt', `${title} - ${this.getCurrentDate()} | ${message}\n`)
  }

  public getCurrentDate() {
    return new Intl.DateTimeFormat("pt-BR", {
      hour: "numeric",
      minute: "numeric",
    }).format(new Date());
  }
}
