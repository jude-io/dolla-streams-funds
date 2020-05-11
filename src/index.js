import { init, Log, purgeLog, sentrify } from "utils-dolla";
import _ from "lodash";

import { ledger } from "./actions";

exports.handler = sentrify(async (event, context, callback) => {
  try {
    const { reqId } = await init(event, context);
    await Promise.all(
      event.items.map(async record => {
        const r = record.eventType === "REMOVE" ? record.old : record.new;
        Log("record", r);
        // Ledger
        if (record.eventType === "INSERT") {
          await ledger(r);
        }
        Log("record.success", record.diff);
      })
    );
    Log("invocation.success", event.items.length);
    return purgeLog().then(() => {
      context.succeed(true);
    });
  } catch (error) {
    Log("invocation.error", error);
    return purgeLog().then(() => {
      context.succeed({ success: false, error });
    });
  }
});
