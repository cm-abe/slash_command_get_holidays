import { SlashCommandParameter } from './slash-command-parameter';
import { ApplicationError } from '../exceptions/ApplicationError';
import * as moment from 'moment';

export class HolidaySchedule {
    public parseErrorList: Array<string> = [];

    constructor(commandParameter: SlashCommandParameter | null) {
        if(commandParameter != null) {
            validateCommand(commandParameter);

            if(commandParameter.text == null) {
                throw new ApplicationError("日付の指定がありません。");
            }

            commandParameter.text.split(" ").forEach((dateString) => {
                if(!moment(dateString, "YYYY-MM-DD").isValid()) {
                    this.parseErrorList.push(dateString);
                }
            });
        } else {
            throw new ApplicationError("コマンドパラメータがありません。");
        }
    }
}

function validateCommand(commandParameter: SlashCommandParameter) {
    const commandName = "get-holidays";

    if(commandParameter.command == null) {
        throw new ApplicationError("コマンドがセットされていません。");
    }
    if(commandParameter.command != commandName) {
        throw new ApplicationError("コマンド名が違います。 " + commandParameter.command);
    }
}