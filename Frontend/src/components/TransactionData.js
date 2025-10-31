export const transactionData = {
  transactionDetails: [
    { feature: "Transaction Amount", value: 0.1148, risk: "🟢 Small, low-risk amount" },
    { feature: "Transaction Frequency", value: 0.23, risk: "⚪ Neutral" },
    { feature: "Recipient Blacklist Status", value: 0, risk: "🟢 Receiver not blacklisted" },
    { feature: "Device Fingerprinting", value: 0, risk: "⚪ Missing fingerprint, mildly risky" },
    { feature: "VPN or Proxy Usage", value: 1, risk: "🔴 Indicates obfuscation — high fraud risk" },
    { feature: "Behavioral Biometrics", value: 0.65, risk: "🟡 Moderate anomaly (possible behavior drift)" },
    { feature: "Time Since Last Transaction", value: 0.489, risk: "⚪ Average — neutral" },
    { feature: "Social Trust Score", value: 0.0246, risk: "🔴 Very low trust score" },
    { feature: "Account Age", value: 0.052, risk: "🔴 Very new account — strong fraud indicator" },
    { feature: "High-Risk Transaction Times", value: 10, risk: "🔴 Extremely abnormal — high-risk pattern" },
    { feature: "Past Fraudulent Behavior Flags", value: 0, risk: "🟢 No fraud history" },
    { feature: "Normalized Transaction Amount", value: 0.592, risk: "⚪ Slightly above average" },
    { feature: "Transaction Context Anomalies", value: 0.034, risk: "🟢 Minimal anomaly" },
    { feature: "Fraud Complaints Count", value: 0.4, risk: "🟡 Mild — some complaints present" },
    { feature: "Merchant Category Mismatch", value: 0, risk: "🟢 No mismatch" },
    { feature: "User Daily Limit Exceeded", value: 0, risk: "🟢 Within limit" },
    { feature: "Recent High-Value Transaction Flags", value: 1, risk: "🔴 Red flag — unusual high-value activity" },
    { feature: "Recipient Verification Status_suspicious", value: 1, risk: "🔴 Suspicious receiver" },
    { feature: "Recipient Verification Status_verified", value: 0, risk: "⚪ Not verified" },
    { feature: "Geo-Location Flags_normal", value: 1, risk: "🟢 Location looks consistent" },
    { feature: "Geo-Location Flags_unusual", value: 0, risk: "🟢 Good" }
  ]
};
