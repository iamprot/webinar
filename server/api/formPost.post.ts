export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        if (body.website.trim() !== "") {
            console.log("бот");
            return;
        }

        const config = useRuntimeConfig();
        const token = config.yandexUserToken;
        const formId = config.yandexFormId;
        const orgId = config.yandexOrgId;

        const yandexApiUrl = `https://api.forms.yandex.net/v1/surveys/${formId}/form`;

        const yandexPayload = {
            'ks-web-name': body.name,
            'ks-web-surname': body.surname,
            'ks-web-company': body.company,
            'ks-web-position': body.position,
            'ks-web-email': body.email,
            'ks-web-phone': body.phone,
        };

        const response = await $fetch(yandexApiUrl, {
            method: "POST",
            headers: {
                Authorization: `OAuth ${token}`,
                'X-Org-Id': orgId,
                'Content-Type': 'application/json',
            },
            body: yandexPayload,
        });

        return {
            success: true,
            message: "Заявка успешно отправлена",
            // data: response
        };
    } catch (error: any) {
        console.log(error);

        if (error) {
            throw error;
        }

        throw createError({
            statusCode: 500,
            message: "Ошибка при обработке заявки",
        });
    }
});
