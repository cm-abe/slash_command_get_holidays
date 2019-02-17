import "mocha";
import * as assert from "power-assert";
import { parseBody } from "../../../src/lambda/domains/slash-command-parameter";

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
    });

    describe("項目がない場合は値がnullになる", () => {

    });

    describe("全項目チェック", () => {

    })
});
