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
        public enterpriseId?: string = getParameterValue(bodyKeyValues, "enterprise_id");
        public enterpriseName?: string = getParameterValue(bodyKeyValues, "enterprise_name");
        public channelId?: string = getParameterValue(bodyKeyValues, "channel_id");
        public channelName?: string = getParameterValue(bodyKeyValues, "channel_name");
        public userId?: string = getParameterValue(bodyKeyValues, "user_id");
        public userName?: string = getParameterValue(bodyKeyValues, "user_name");
        public command?: string = getParameterValue(bodyKeyValues, "command");
        public text?: string = getParameterValue(bodyKeyValues, "text");
        public responseUrl?: string = getParameterValue(bodyKeyValues, "response_url");
        public triggerId?: string = getParameterValue(bodyKeyValues, "trigger_id");
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
