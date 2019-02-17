import { ISlashCommandParameter } from './slash-command-parameter';
import { ApplicationError } from '../exceptions/ApplicationError';
import * as moment from 'moment';
import { GoogleCalenderRequest as Calendar } from '../infrastructures/google-calendar-request';

export class HolidaySchedule {
    public userName: string;
    public holidayList: Array<string> = [];
    public parseErrorList: Array<string> = [];
    public insertSuccessList: Array<string> = [];
    public insertErrorList: Array<string> = [];

    constructor(commandParameter: ISlashCommandParameter | null) {
        if(commandParameter != null) {
            validateCommand(commandParameter);

            if(commandParameter.text == null) {
                throw new ApplicationError("日付の指定がありません。");
            }

            commandParameter.text.split(" ").forEach((dateString) => {
                if(moment(dateString, "YYYY-MM-DD").isValid()) {
                    this.holidayList.push(dateString);
                } else {
                    this.parseErrorList.push(dateString);
                }
            })

            this.userName = commandParameter.userName;
        } else {
            throw new ApplicationError("コマンドパラメータがありません。");
        }
    }

    // カレンダーへのリクエスト
    insertHolidays() {
        this.holidayList.forEach((dateString) => {
            Calendar.insertHolidayEvent(Calendar.generateEvent(this.userName, dateString)).then((eventHtml) => {
                this.insertSuccessList.push(eventHtml);
            }).catch(() => {
                this.insertErrorList.push(dateString);
            });
        })
    }
}

function validateCommand(commandParameter: ISlashCommandParameter) {
    const commandName = "get-holidays";

    if(commandParameter.command == null) {
        throw new ApplicationError("コマンドがセットされていません。");
    }
    if(commandParameter.command != commandName) {
        throw new ApplicationError("コマンド名が違います。 " + commandParameter.command);
    }
}
