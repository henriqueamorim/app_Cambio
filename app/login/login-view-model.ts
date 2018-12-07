import { Observable } from 'tns-core-modules/data/observable';
import * as dialogs from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { Button } from "tns-core-modules/ui/button";

export class LoginViewModel extends Observable {

    private _email: string;
    private _senha: string;

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get senha(): string {
        return this._senha;
    }

    set senha(value: string) {
        this._senha = value;
    }

    constructor() {
        super();
    }

    login(args: any) {
        const email = this.email || ""
        const senha = this.senha || ""

        if (email == "" && senha == "") {

            const button: Button = args.object;
            const page: Page = button.page;
            page.frame.navigate("home/home-page");

        } else {
            dialogs.alert({
                title: "Ops!",
                message: "Email ou senha incorretos",
                okButtonText: "Tentar Novamente"
            }).then(() => {
                console.log("Dialog closed!");
            });
        }

    }
}