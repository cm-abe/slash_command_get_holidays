import "mocha";
import * as assert from "power-assert";
import { parseBody } from "../../../src/lambda/domains/slash-command-parameter";

// TODO バリデーションをSlashコマンドのドメインに変更
// TODO バリデーションをmixinしたい

// const bodySample = "token=gIkuvaNzQIHg97ATvDxqgjtO" +
//     "&team_id=T0001" +
//     "&team_domain=example" +
//     "&enterprise_id=E0001" +
//     "&enterprise_name=Globular%20Construct%20Inc" +
//     "&channel_id=C2147483705" +
//     "&channel_name=test" +
//     "&user_id=U2147483697" +
//     "&user_name=Steve" +
//     "&command=/weather" +
//     "&text=94070" +
//     "&response_url=https://hooks.slack.com/commands/1234/5678" +
//     "&trigger_id=13345224609.738474920.8088930838d88f008e0";

describe("SlashCommandのbodyをパースする", () => {
    describe("項目がある場合は値がセットされる", () => {
        it("tokenをパースできる", () => {
            const actual = parseBody("token=testtoken");
            assert(actual.token === "testtoken");
        });

        it("team_idをパースできる", () => {
            const actual = parseBody("team_id=testteam");
            assert(actual.teamId === "testteam");
        });

        it("team_domainをパースできる", () => {
            const actual = parseBody("team_domain=testdomain");
            assert(actual.teamDomain === "testdomain");
        });

        it("enterprise_idをパースできる", () => {
            const actual = parseBody("enterprise_id=testenterprise");
            assert(actual.enterpriseId === "testenterprise");
        });

        it("enterprise_nameをパースできる", () => {
            const actual = parseBody("enterprise_name=testenterprisename");
            assert(actual.enterpriseName === "testenterprisename");
        });

        it("channel_idをパースできる", () => {
            const actual = parseBody("channel_id=testchannel");
            assert(actual.channelId === "testchannel");
        });

        it("channel_nameをパースできる", () => {
            const actual = parseBody("channel_name=testchannelname");
            assert(actual.channelName === "testchannelname");
        });

        it("user_idをパースできる", () => {
            const actual = parseBody("user_id=testuser");
            assert(actual.userId === "testuser");
        });

        it("user_nameをパースできる", () => {
            const actual = parseBody("user_name=Steve");
            assert(actual.userName === "Steve");
        });

        it("commandをパースできる", () => {
            const actual = parseBody("command=/test_command");
            assert(actual.command === "/test_command");
        });

        it("textをパースできる", () => {
            const actual = parseBody("text=test text");
            assert(actual.text === "test text");
        });

        it("response_urlをパースできる", () => {
            const actual = parseBody("response_url=http://notfound.com");
            assert(actual.responseUrl === "http://notfound.com");
        });

        it("trigger_idをパースできる", () => {
            const actual = parseBody("trigger_id=testtrigger");
            assert(actual.triggerId === "testtrigger");
        });
    });

    describe("項目がない場合は値がnullになる", () => {

    });

    describe("全項目チェック", () => {

    });
});
