import { SlashCommandParameter } from './slash-command-parameter';
import { ApplicationError } from '../exceptions/ApplicationError';

export class HolidaySchedule {
    constructor(commandParameter: SlashCommandParameter | null) {
        if(commandParameter != null) {
            if(commandParameter.command == null) {
                throw new ApplicationError("コマンドがセットされていません。");
            }
        } else {
            throw new ApplicationError("コマンドパラメータがありません。");
        }
    }
}