import { SlashCommandParameter } from './slash-command-parameter';
import { ApplicationError } from '../exceptions/ApplicationError';

export class HolidaySchedule {
    constructor(commandParameter: SlashCommandParameter | null) {
        if(commandParameter != null) {
            if(commandParameter.command == null) {
                throw new ApplicationError("コマンドがセットされていません。");
            }
            if(commandParameter.command != "get-holidays") {
                throw new ApplicationError("コマンド名が違います。 " + commandParameter.command);
            }
        } else {
            throw new ApplicationError("コマンドパラメータがありません。");
        }
    }
}