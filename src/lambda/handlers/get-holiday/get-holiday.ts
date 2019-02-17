import { HolidaySchedule } from "../../domains/holiday-schedule";
import { parseBody } from "../../domains/slash-command-parameter";

exports.handler = async (event: any) => {
    return GetHolidayController.get(event);
};

// TODO 戻り値の対応
export class GetHolidayController {
    public static get(payload: any): string {
        // tslint:disable-next-line:no-console
        console.log(payload);
        const holidaySchedule = new HolidaySchedule(parseBody(payload.body));

        holidaySchedule.insertHolidays();

        return "null";
    }
}
