export interface ISlashCommandParameter {
    token?: string;
    teamId?: string;
    teamDomain?: string;
    enterpriseId?: string;
    enterpriseName?: string;
    channelId?: string;
    channelName?: string;
    userId?: string;
    userName?: string;
    command?: string;
    text?: string;
    responseUrl?: string;
    triggerId?: string;
}

export function parseBody(body: string): ISlashCommandParameter {
    const bodyKeyValues = parseSettingContext(body);

    return new class implements ISlashCommandParameter {
        public token?: string = getParameterValue(bodyKeyValues, "token");
        public teamId?: string = getParameterValue(bodyKeyValues, "team_id");
        public teamDomain?: string = getParameterValue(bodyKeyValues, "team_domain");
    }();
}

function parseSettingContext(settings: string): Array<{key: string, value: string}> {
    const bodyKeyValues: Array<{key: string, value: string}> = [];

    settings.split("&").forEach((setting) => {
        const parsedSetting = setting.split("=");
        bodyKeyValues.push({
            key: parsedSetting[0],
            value: parsedSetting[1],
        });
    });

    return bodyKeyValues;
}

function getParameterValue(keyValues: Array<{key: string, value: string}>, keyString: string): string|undefined {
    const parameter = keyValues.find((keyValue) => keyValue.key === keyString);
    if (parameter) {
        return parameter.value;
    } else {
        return undefined;
    }
}
