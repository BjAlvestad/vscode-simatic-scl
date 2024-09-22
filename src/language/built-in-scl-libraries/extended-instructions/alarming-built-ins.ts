import { createGeneralFunction } from "../built-in-utils.js";

export const Ack_Alarms = createGeneralFunction(
    'Ack_Alarms',
    ['MODE : UINT'],
    ['ERROR : BOOL', 'STATUS : WORD'],
    undefined,
    'Void'
)