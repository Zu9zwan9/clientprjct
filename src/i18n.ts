import i18n from "i18next";
import {initReactI18next} from "react-i18next";

import uaTranslation from "./i18n/ua/resources.json";

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        lng: "ua",
        resources: {
            ua: {
                translation: uaTranslation
            }
        },
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
