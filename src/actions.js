import { Log, DollaDB, sendToLambda } from "utils-dolla";

export async function ledger(item) {
  try {
    Log("fn.ledger", item._id);
    await sendToLambda("dolla-ledger", {
      action: "log",
      item
    });
    Log("fn.ledger.success", item._id);
  } catch (error) {
    Log("fn.ledger.error", error);
    throw error;
  }
}
