import * as AWS from "aws-sdk";
import { calendar_v3 } from "googleapis";
import { HolidaySchedule } from "../domains/holiday-schedule";
import { ApplicationError } from "../exceptions/ApplicationError";

// 認証情報の取得
class GoogleApiKey {
    private clientSecretObjectParameter: any = {
        Bueckt: process.env.GOOGLE_API_CLIENT_SECRET_BUCKET,
        Key: "api_key.txt",
    };

    private s3 = new AWS.S3();

    private value: string;

    constructor() {
        this.s3.getObject(this.clientSecretObjectParameter, (err, data) => {
            if (err) {
                throw new ApplicationError("Google APIキーファイル取得に失敗しました。" + err);
            } else {
                if (data.Body) {
                    this.value = data.Body.toString();
                } else {
                    throw new ApplicationError("GoogleAPIのclient secretの取得に失敗しました。(credential情報なし)");
                }
            }
        });
    }

    get keyValue(): string {
        return this.value;
    }
}

const apiKey = new GoogleApiKey();
const calendar = new calendar_v3.Calendar({
    auth: apiKey.keyValue,
});

// tslint:disable-next-line:max-classes-per-file
export class GoogleCalenderRequest {
    holidaySchedule: HolidaySchedule;

    constructor(holidaySchedule: HolidaySchedule) {
        this.holidaySchedule = holidaySchedule;
    }

    public requestCalendar() {
    // TODO APIのパラメータの作成
    // TODO 結果の整形
    }

    // APIのコール
    private async createHolidayEvent(event: calendar_v3.Schema$Event): Promise<string> {
        // tslint:disable-next-line:max-classes-per-file
        const eventParam = new class implements calendar_v3.Params$Resource$Events$Insert {
            calendarId?: string = process.env.ATTENDANCE_CALENDAR_ID;
            requestBody?: calendar_v3.Schema$Event = event;
        };
        const resultEvent = await calendar.events.insert(eventParam);
        if (resultEvent.data.htmlLink) {
            return resultEvent.data.htmlLink;
        } else {
            return "";
        }
    }
}
