import { describe, it, expect } from "vitest";
import { loadRulePack, estimateFederalTax } from "@portfolio/tax-engine";

describe("portfolio-batch", () => {
  it("can run tax projection logic", () => {
    const rules = loadRulePack(2025);
    const estimate = estimateFederalTax(
      {
        taxYear: 2025,
        filingStatus: "single",
        wages: 50000,
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
      },
      rules
    );
    expect(estimate.federalTax).toBeGreaterThanOrEqual(0);
  });
});
