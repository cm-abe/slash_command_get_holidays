import { SlashCommandParameter } from './slash-command-parameter';
import { ApplicationError } from '../exceptions/ApplicationError';

export class HolidaySchedule {
    constructor(commandParameter: SlashCommandParameter | null) {
        if(commandParameter != null) {
            
        } else {
            throw new ApplicationError("コマンドパラメータがありません。");
        }
    }
}