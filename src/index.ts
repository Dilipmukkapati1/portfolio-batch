/**
 * Azure Batch task entrypoint.
 * Invoked as: node dist/index.js --job=<name> --householdId=<id> [--scenarioId=<id>]
 */
import { loadRulePack, estimateFederalTax } from "@portfolio/tax-engine";
import type { TaxYearInput } from "@portfolio/contracts";

function parseArgs(): Record<string, string> {
  const args: Record<string, string> = {};
  for (const arg of process.argv.slice(2)) {
    const match = arg.match(/^--([^=]+)=(.*)$/);
    if (match) args[match[1]] = match[2];
  }
  return args;
}

async function runProjection(householdId: string, scenarioId: string): Promise<void> {
  console.log(`[batch] projection household=${householdId} scenario=${scenarioId}`);
  const rules = loadRulePack(2025);
  const input: TaxYearInput = {
    taxYear: 2025,
    filingStatus: "single",
    wages: 100000,
    selfEmploymentIncome: 0,
    interestIncome: 0,
    dividendIncome: 0,
    capitalGainsShort: 0,
    capitalGainsLong: 0,
    otherIncome: 0,
    adjustments: 0,
    dependents: 0,
    retirementContributions: 0,
    hsaContributions: 0,
  };
  const estimate = estimateFederalTax(input, rules);
  console.log(JSON.stringify({ householdId, scenarioId, estimate }));
}

async function main(): Promise<void> {
  const args = parseArgs();
  const job = args.job ?? "echo";
  const householdId = args.householdId ?? "unknown";

  console.log(`[batch] starting job=${job} householdId=${householdId}`);

  switch (job) {
    case "projection":
      await runProjection(householdId, args.scenarioId ?? "default");
      break;
    case "echo":
      console.log(JSON.stringify({ status: "ok", job, householdId, phase: "2+" }));
      break;
    default:
      throw new Error(`Unknown job: ${job}`);
  }

  console.log("[batch] complete");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
