// test/lamdba/domains/holiday-schecule.test.ts
import "mocha";
import * as assert from "power-assert";
import { HolidaySchedule } from "../../../src/lambda/domains/holiday-schedule";
import { parseBody } from "../../../src/lambda/domains/slash-command-parameter";
import { ApplicationError } from "../../../src/lambda/exceptions/ApplicationError";

// TODO インプットパラメータnullのケースはありえないので、テストケースと引数のnullパターン削除
// 「いつ」「誰が」休みをとるのか
describe("休暇スケジュール", () => {
    it("引数にインプットパラメータを渡さなかった場合はエラーになる", () => {
        assert.throws(
            () => {
                // tslint:disable-next-line:no-unused-expression
                new HolidaySchedule(null);
            },
            (error: ApplicationError) => {
                assert(error.message === "コマンドパラメータがありません。");
                return true;
            },
        );
    });

    describe("コマンド名のバリデーション", () => {
        it("セットされていなかった場合はエラーになる", () => {
            assert.throws(
                () => {
                    // tslint:disable-next-line:no-unused-expression
                    new HolidaySchedule(parseBody(""));
                },
                (error: ApplicationError) => {
                    assert(error.message === "コマンドがセットされていません。");
                    return true;
                },
            );
        });

        it("get-holidaysではなかった場合はエラーになる", () => {
            assert.throws(
                () => {
                    // tslint:disable-next-line:no-unused-expression
                    new HolidaySchedule(parseBody("command=error-command"));
                },
                (error: ApplicationError) => {
                    assert(error.message === "コマンド名が違います。 error-command");
                    return true;
                },
            );
        });
    });

    describe("コマンドパラメータ(textに指定)のバリデーション", () => {
        it("日付が指定されていなかった場合はエラーになる", () => {
            assert.throws(
                () => {
                    // tslint:disable-next-line:no-unused-expression
                    new HolidaySchedule(parseBody("command=get-holidays"));
                },
                (error: ApplicationError) => {
                    assert(error.message === "日付の指定がありません。");
                    return true;
                },
            );
        });

        it("指定されている文字列が一つで日付ではなかった場合はパースエラーリストに追加される", () => {
            const actual = new HolidaySchedule(parseBody("command=get-holidays&text=not-date-string"));
            assert(actual.parseErrorList.length === 1);
            assert(actual.parseErrorList[0] === "not-date-string");
        });

        it("パースエラーが複数の場合でもパースエラーリストに正しく追加される", () => {
            const actual = new HolidaySchedule(parseBody(
                "command=get-holidays&" +
                "text=2019-03-03 not-date-string 2019-04-25 parse-error 2019-04-30"));
            assert(actual.parseErrorList.length === 2);
            assert(actual.parseErrorList[0] === "not-date-string");
            assert(actual.parseErrorList[1] === "parse-error");
        });
    });

    describe("休暇スケジュールオブジェクトの作成", () => {
        it("正常にパラメータを読み込めた場合は対象者名と日付のリストを得られる", () => {
            const actual = new HolidaySchedule(parseBody(
                "command=get-holidays&" +
                "text=2019-04-03 error-strings 2019-04-25 2019-05-30&" +
                "user_name=Shinsuke-Abe"));
            assert(actual.userName === "Shinsuke-Abe");
            assert(actual.holidayList.length === 3);
            assert(actual.holidayList[0] === "2019-04-03");
            assert(actual.holidayList[1] === "2019-04-25");
            assert(actual.holidayList[2] === "2019-05-30");
            assert(actual.parseErrorList.length === 1);
            assert(actual.parseErrorList[0] === "error-strings");
        });
    });
});
