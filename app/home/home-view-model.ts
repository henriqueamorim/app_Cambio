import { Observable } from 'tns-core-modules/data/observable';
import * as http from 'http';
import * as appSettings from "tns-core-modules/application-settings";

export class HomeViewModel extends Observable {

    private _valorFornecido: number
    private _resultado: string
    private _resultadoSalvo: string
    
    get valorFornecido(): number {
        return this._valorFornecido;
    }

    set valorFornecido(value: number) {
        this._valorFornecido = value;
    }

    get resultado(): string {
        return this.get('_resultado');
    }

    set resultado(value: string) {
        this.set('_resultado', value);
    }

    get resultadoSalvo(): string {
        return appSettings.getString('resultadoSalvo')
    }

    set resultadoSalvo(value: string) {
        appSettings.setString('resultadoSalvo', value)
        this.set('resultadoNow', value)
    }
    

    constructor() {
        super();
    }

    getCotacao() {
        return new Promise((resolve, rejected) => {
            http.getJSON("https://api.hgbrasil.com/finance?format=json&key=60df7606").then((response) => {
                resolve(response);
            },
            (e) => {
                    rejected(e)
            });
        })
    }

    async converterParaDolar() {
        const data = <any>await this.getCotacao()
        const dolar = <number>data.results.currencies.USD.buy || 0
        console.log(this.valorFornecido)
        const resultado = (this.valorFornecido / dolar).toFixed(2)
        this.set('resultado', `USD ${resultado}`)
    }

    async converterParaEuro() {
        let data = <any>await this.getCotacao()
        const euro = <number>data.results.currencies.EUR.buy || 0
        const resultado = (this.valorFornecido / euro).toFixed(2)
        this.set('resultado', `EUR ${resultado}`)
    }

    salvarStorage() {
        try {
            const valorFornecido = String(this.valorFornecido)
            let isThereDot = valorFornecido.includes(".")
            let valorAlterado = isThereDot ? valorFornecido : `${valorFornecido}.00`
            let valorResultado = this.resultado
            const strResposta = `R$ ${valorAlterado} para ${valorResultado}`
            this.resultadoSalvo = strResposta;
        } catch (ex) {
            console.log(ex)
        }
    }

}