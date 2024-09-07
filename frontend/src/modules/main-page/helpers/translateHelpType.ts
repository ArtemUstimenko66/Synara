import {helpTypesMap} from "../../../data/helpTypesMap.ts";

export const translateHelpType = (helpType: string): string => {
    return helpTypesMap[helpType] || 'humanitarian';
};