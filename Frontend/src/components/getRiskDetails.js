export function getRiskDetails(feature, value) {
  switch (feature) {
    case "Transaction Amount":
      if (value < 0.2) return "🟢 Small, low-risk amount";
      if (value < 0.6) return "⚪ Moderate transaction size";
      return "🔴 High amount — potential risk";

    case "Transaction Frequency":
      if (value < 0.2) return "🟢 Infrequent transactions — safe";
      if (value < 0.6) return "⚪ Neutral";
      return "🔴 Very frequent — possible automated activity";

    case "Recipient Blacklist Status":
      return value === 1
        ? "🔴 Receiver on blacklist"
        : "🟢 Receiver not blacklisted";

    case "Device Fingerprinting":
      return value === 0
        ? "⚪ Missing fingerprint, mildly risky"
        : "🟢 Known device — low risk";

    case "VPN or Proxy Usage":
      return value === 1
        ? "🔴 Indicates obfuscation — high fraud risk"
        : "🟢 No VPN detected";

    case "Behavioral Biometrics":
      if (value < 0.3) return "🟢 Normal behavior";
      if (value < 0.7) return "🟡 Moderate anomaly (possible drift)";
      return "🔴 Strong anomaly — user behavior mismatch";

    case "Time Since Last Transaction":
      if (value < 0.3) return "🟢 Frequent, regular user";
      if (value < 0.7) return "⚪ Average — neutral";
      return "🟡 Long inactivity gap — mildly risky";

    case "Social Trust Score":
      if (value < 0.1) return "🔴 Very low trust score";
      if (value < 0.5) return "🟡 Average trust";
      return "🟢 Good trust score";

    case "Account Age":
      if (value < 0.1) return "🔴 Very new account — strong fraud indicator";
      if (value < 0.4) return "🟡 Moderately new account";
      return "🟢 Established account";

    case "High-Risk Transaction Times":
      if (value === 0) return "🟢 Normal time window";
      if (value < 5) return "🟡 Slightly unusual time";
      return "🔴 Extremely abnormal — high-risk pattern";

    case "Past Fraudulent Behavior Flags":
      return value > 0 ? "🔴 Previous fraud behavior" : "🟢 No fraud history";

    case "Normalized Transaction Amount":
      if (value < 0.3) return "🟢 Below average";
      if (value < 0.7) return "⚪ Slightly above average";
      return "🔴 Very high normalized amount";

    case "Transaction Context Anomalies":
      if (value < 0.2) return "🟢 Minimal anomaly";
      if (value < 0.6) return "⚪ Moderate anomaly";
      return "🔴 Strong context deviation";

    case "Fraud Complaints Count":
      if (value === 0) return "🟢 No complaints";
      if (value < 0.5) return "🟡 Mild — some complaints present";
      return "🔴 High complaint history";

    case "Merchant Category Mismatch":
      return value === 1 ? "🔴 Mismatch detected" : "🟢 No mismatch";

    case "User Daily Limit Exceeded":
      return value === 1 ? "🔴 Limit exceeded" : "🟢 Within limit";

    case "Recent High-Value Transaction Flags":
      return value === 1
        ? "🔴 Red flag — unusual high-value activity"
        : "🟢 No recent high-value alerts";

    case "Recipient Verification Status_suspicious":
      return value === 1 ? "🔴 Suspicious receiver" : "🟢 Normal receiver";

    case "Recipient Verification Status_verified":
      return value === 1 ? "🟢 Verified receiver" : "⚪ Not verified";

    case "Geo-Location Flags_normal":
      return value === 1 ? "🟢 Location looks consistent" : "⚪ Not normal";

    case "Geo-Location Flags_unusual":
      return value === 1 ? "🔴 Unusual location" : "🟢 Good";

    default:
      return "⚪ Unknown feature";
  }
}
