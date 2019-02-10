// test/lamdba/domains/holiday-schecule.test.ts
import * as assert from 'power-assert';
import 'mocha';
import { ApplicationError } from '../../../src/lambda/exceptions/ApplicationError';
import { HolidaySchedule } from '../../../src/lambda/domains/holiday-schedule';

// 「いつ」「誰が」休みをとるのか
// TODO 引数にインプットパラメータを渡さなかった場合はエラーになる
// TODO インプットパラメータのコマンド名がget_holidaysではなかった場合はエラーにする
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
})