import type { DemoPrompt } from "./types";

export const demoPrompts: DemoPrompt[] = [
  // ─────────────────────────────────────────────────────────
  // Standard answwer:
  // Multiple internal sources, includes one flagged/conflicting 
  // source pair (duplicate maintenance logs) to show version handling.
  // ─────────────────────────────────────────────────────────
  {
    id: "fuel-burn",
    question:
      "We're seeing higher than usual fuel burn on tail number G-EZFK over the last few months. Has anything changed with that aircraft, and is it within normal tolerance?",
    searchedCount: 4435,
    noConfidentAnswer: false,
    segments: [
      {
        text: "Engine performance: Fuel burn on this tail has trended 3.8% above the fleet average since March, correlating with a right-hand engine borescope inspection that flagged early-stage compressor blade erosion.",
        citedSourceIds: ["engine-health-report", "fuel-performance-tracker"],
      },
      {
        text: "The finding was rated 'monitor, not yet actionable' at the time.",
        citedSourceIds: ["engine-health-report"],
      },
      {
        text: "Maintenance history: No major overhaul or engine swap has occurred on this tail in the last 18 months, ruling out a hardware change as the cause. The last scheduled engine wash was carried out in January, which is slightly overdue against the 90-day interval.",
        citedSourceIds: ["maintenance-log-march", "maintenance-log-august"],
      },
      {
        text: "Fleet comparison: Cross-referencing against sister aircraft of the same age and engine variant, G-EZFK's fuel burn deviation is the second-highest in the fleet, but still within the 5% tolerance band before a formal engineering escalation is triggered.",
        citedSourceIds: ["fuel-performance-tracker"],
      },
      {
        text: "In short: the increased fuel burn is most likely linked to the compressor erosion and an overdue engine wash, not a fault. Recommend scheduling the wash and rechecking burn rates in 30 days before deciding whether escalation is warranted.",
        citedSourceIds: ["engine-health-report", "fuel-performance-tracker", "maintenance-log-august"],
      },
    ],
    sources: [
      {
        id: "engine-health-report",
        filename: "EngineHealthMonitoringReport.doc",
        location: "Section 2.1, page 17",
        lastEdited: "12 March 2026",
        type: "internal",
        folder: "reports",
      },
      {
        id: "fuel-performance-tracker",
        filename: "FuelPerformanceTracker.xlsl",
        location: "Tab 'Q1 2026 Deviation Summary'",
        lastEdited: "6 April 2026",
        type: "internal",
        folder: "reports",
      },
      {
        id: "maintenance-log-march",
        filename: "maintenance_log_G-EZFK.csv",
        location: "Rows 214–239",
        lastEdited: "6 April 2026",
        type: "internal",
        folder: "maintenance",
        status: "superseded",
      },
      {
        id: "maintenance-log-august",
        filename: "maintenance_log_G-EZFK.csv",
        location: "Rows 214–239",
        lastEdited: "8 August 2026",
        type: "internal",
        folder: "maintenance",
        status: "conflict",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // No confident answer: 
  // Sparse or weak sources, model explicitly declines to answer.
  // ─────────────────────────────────────────────────────────
  {
    id: "apu-removals",
    question:
      "Has G-OJAMM's APU had any repeat unscheduled removals in the last 12 months, and is it trending toward an MEL issue?",
    searchedCount: 812,
    noConfidentAnswer: true,
    segments: [
      {
        text: "I can't give a confident answer to this one. I found a single APU removal entry for G-OJAMM in the last 12 months, logged as a scheduled component-life removal rather than unscheduled — so it doesn't establish a repeat-fault pattern.",
        citedSourceIds: ["component-removal-log"],
      },
      {
        text: "The MEL history file that would normally cover open deferrals for this tail hasn't been re-indexed since a system migration, so I don't have reliable visibility into current MEL status.",
        citedSourceIds: ["mel-index-stale"],
      },
      {
        text: "Rather than infer a trend from one data point, I'd recommend pulling the APU removal history directly from the CAMO system and checking current MEL status manually before drawing any conclusion.",
        citedSourceIds: [],
      },
    ],
    sources: [
      {
        id: "component-removal-log",
        filename: "component_removals_G-OJAMM.csv",
        location: "Row 41",
        lastEdited: "2 February 2026",
        type: "internal",
        folder: "maintenance",
      },
      {
        id: "mel-index-stale",
        filename: "MEL_deferral_index.xlsl",
        location: "Tab 'Active Deferrals'",
        lastEdited: "19 November 2025",
        type: "internal",
        folder: "reports",
        status: "stale",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // External sources answer:
  // Internal records mixed with external regulatory/news source, 
  // needs for "Allow external sources" to be active.
  // ─────────────────────────────────────────────────────────
  {
    id: "ad-compliance",
    question:
      "Does AD 2026-0091 on the CFM56 fan blade inspection apply to our fleet, and are we compliant?",
    searchedCount: 2190,
    noConfidentAnswer: false,
    segments: [
      {
        text: "Yes — AD 2026-0091 applies to four aircraft in the fleet fitted with the affected CFM56-5B fan blade batch. The directive requires a one-time ultrasonic inspection within 3,000 flight cycles of issue.",
        citedSourceIds: ["easa-ad-2026-0091"],
      },
      {
        text: "Internal compliance: three of the four affected tails (G-EZFK, G-EZFL, G-EZFN) have completed the inspection and are logged as compliant. G-EZFP is still outstanding, with 640 cycles remaining before the deadline.",
        citedSourceIds: ["compliance-tracker"],
      },
      {
        text: "External coverage of the directive notes it followed an in-service fan blade fracture event, which is consistent with the inspection scope described in the AD text itself.",
        citedSourceIds: ["aviation-herald-article"],
      },
      {
        text: "Recommend prioritising G-EZFP's inspection given the approaching cycle limit, and flagging it to CAMO for scheduling this week.",
        citedSourceIds: ["compliance-tracker"],
      },
    ],
    sources: [
      {
        id: "compliance-tracker",
        filename: "AD_ComplianceTracker.xlsl",
        location: "Tab 'CFM56 Fan Blade AD'",
        lastEdited: "14 July 2026",
        type: "internal",
        folder: "reports",
      },
      {
        id: "easa-ad-2026-0091",
        filename: "EASA AD 2026-0091",
        location: "Official directive text",
        lastEdited: "3 June 2026",
        type: "external",
      },
      {
        id: "aviation-herald-article",
        filename: "The Aviation Herald",
        location: "Incident report",
        lastEdited: "6 April 2026",
        type: "external",
      },
    ],
  },
];