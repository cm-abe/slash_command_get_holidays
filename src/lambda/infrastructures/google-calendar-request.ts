import * as AWS from "aws-sdk";
import { calendar_v3 } from "googleapis";
import { ApplicationError } from "../exceptions/ApplicationError";

// 認証情報の取得
class GoogleApiKey {
    private clientSecretObjectParameter: any = {
        Bucket: process.env.GOOGLE_API_CLIENT_SECRET_BUCKET,
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

// tslint:disable-next-line:max-classes-per-file
export class GoogleCalenderRequest {
    private calendar: calendar_v3.Calendar;

    constructor() {
        this.calendar = new calendar_v3.Calendar({
            auth: new GoogleApiKey().keyValue,
        });
    }

    // CalendarEventの生成
    public generateEvent(userName: string, dateString: string): calendar_v3.Schema$Event {
        // tslint:disable-next-line:max-classes-per-file
        const date = new class implements calendar_v3.Schema$EventDateTime {
            public date: string = dateString;
        }();

        // tslint:disable-next-line:max-classes-per-file
        return new class implements calendar_v3.Schema$Event {
            public description: string = "休暇(" + userName + ")";
            public start: calendar_v3.Schema$EventDateTime = date;
        }();
    }

    // APIのコール
    public async insertHolidayEvent(event: calendar_v3.Schema$Event): Promise<string> {
        // tslint:disable-next-line:max-classes-per-file
        const eventParam = new class implements calendar_v3.Params$Resource$Events$Insert {
            public calendarId?: string = process.env.ATTENDANCE_CALENDAR_ID;
            public requestBody?: calendar_v3.Schema$Event = event;
        }();
        const resultEvent = await this.calendar.events.insert(eventParam);
        if (resultEvent.data.htmlLink) {
            return resultEvent.data.htmlLink;
        } else {
            return "";
        }
    }
}
