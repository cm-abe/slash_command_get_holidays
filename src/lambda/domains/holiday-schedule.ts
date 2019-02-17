import * as moment from "moment";
import { ApplicationError } from "../exceptions/ApplicationError";
import { GoogleCalenderRequest as Calendar } from "../infrastructures/google-calendar-request";
import { ISlashCommandParameter } from "./slash-command-parameter";

export class HolidaySchedule {
    public userName: string;
    public holidayList: string[] = [];
    public parseErrorList: string[] = [];
    public insertSuccessList: string[] = [];
    public insertErrorList: string[] = [];
    private calendar: Calendar;

    constructor(commandParameter: ISlashCommandParameter | null) {
        if (commandParameter != null) {
            validateCommand(commandParameter);

            if (commandParameter.text == null) {
                throw new ApplicationError("日付の指定がありません。");
            }

            commandParameter.text.split(" ").forEach((dateString) => {
                if (moment(dateString, "YYYY-MM-DD").isValid()) {
                    this.holidayList.push(dateString);
                } else {
                    this.parseErrorList.push(dateString);
                }
            });

            if (commandParameter.userName) {
                this.userName = commandParameter.userName;
            }
        } else {
            throw new ApplicationError("コマンドパラメータがありません。");
        }
    }

    // カレンダーへのリクエスト
    public insertHolidays() {
        if (!this.calendar) {
            this.calendar = new Calendar();
        }
        this.holidayList.forEach((dateString) => {
            this.calendar.insertHolidayEvent(
                this.calendar.generateEvent(this.userName, dateString)).then((eventHtml) => {
                this.insertSuccessList.push(eventHtml);
            }).catch(() => {
                this.insertErrorList.push(dateString);
            });
        });
    }
}

function validateCommand(commandParameter: ISlashCommandParameter) {
    const commandName = "get-holidays";

    if (commandParameter.command == null) {
        throw new ApplicationError("コマンドがセットされていません。");
    }
    if (commandParameter.command !== commandName) {
        throw new ApplicationError("コマンド名が違います。 " + commandParameter.command);
    }
}
