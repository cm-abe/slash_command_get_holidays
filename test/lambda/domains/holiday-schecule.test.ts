// test/lamdba/domains/holiday-schecule.test.ts
import * as assert from 'power-assert';
import 'mocha';
import { ApplicationError } from '../../../src/lambda/exceptions/ApplicationError';
import { HolidaySchedule } from '../../../src/lambda/domains/holiday-schedule';
import { SlashCommandParameter } from '../../../src/lambda/domains/slash-command-parameter';

// 「いつ」「誰が」休みをとるのか
// TODO インプットパラメータのテキストが日付形式ではなかった場合はエラーにする
// TODO インプットパラメータのテキストは日付形式を複数受けることができる
describe("休暇スケジュール", () => {
    it("引数にインプットパラメータを渡さなかった場合はエラーになる", () => {
        assert.throws(
            () => {
                new HolidaySchedule(null);
            },
            (error: ApplicationError) => {
                assert(error.message === "コマンドパラメータがありません。");
                return true;
            }
        )
    });

    describe("コマンド名のバリデーション", () => {
        it("引数のcommand文字列がセットされていなかった場合はエラーになる", () => {
            assert.throws(
                () => {
                    new HolidaySchedule(new class implements SlashCommandParameter{
                        token: string;
                        teamId: string;
                        teamDomain: string;
                        enterpriseId: string;
                        enterpriseName: string;
                        channelId: string;
                        channelName: string;
                        userId: string;
                        userName: string;
                        command: string;
                        text: string;
                        responseUrl: string;
                        triggerId: string;
                    });
                },
                (error: ApplicationError) => {
                    assert(error.message === "コマンドがセットされていません。");
                    return true;
                }
            )
        });
    
        it("引数のcommand文字列がget-holidaysではなかった場合はエラーになる", () => {
            assert.throws(
                () => {
                    new HolidaySchedule(new class implements SlashCommandParameter{
                        token: string;
                        teamId: string;
                        teamDomain: string;
                        enterpriseId: string;
                        enterpriseName: string;
                        channelId: string;
                        channelName: string;
                        userId: string;
                        userName: string;
                        command: string = "error-command";
                        text: string;
                        responseUrl: string;
                        triggerId: string;
                    })
                },
                (error: ApplicationError) => {
                    assert(error.message === "コマンド名が違います。 error-command");
                    return true;
                }
            )
        });    
    })

    describe("コマンドパラメータ(textに指定)のバリデーション", () => {
        it("textに日付が指定されていなかった場合はエラーになる", () => {
            assert.throws(
                () => {
                    new HolidaySchedule(new class implements SlashCommandParameter{
                        token: string;
                        teamId: string;
                        teamDomain: string;
                        enterpriseId: string;
                        enterpriseName: string;
                        channelId: string;
                        channelName: string;
                        userId: string;
                        userName: string;
                        command: string = "get-holidays";
                        text: string;
                        responseUrl: string;
                        triggerId: string;
                    });
                },
                (error: ApplicationError) => {
                    assert(error.message === "日付の指定がありません。");
                    return true;
                }
            )
        });
    })
})