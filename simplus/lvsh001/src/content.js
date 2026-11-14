export const products={
  "lvsh001": {
    "icon": "pitcher",
    "confirmationNotice": "This records your review only; it does not confirm drinking readiness.",
    "name": "Water filter pitcher",
    "model": "LVSH001",
    "short": "Fresh water, a little simpler.",
    "figure": "01",
    "manual": "https://pc.simplus.online/pages/water-filter-pitcher-lvsh001-user-manual-english-version",
    "sourceLabel": "Official LVSH001 English manual",
    "parts": {
      "lid": [
        "Lid",
        "Covers the reservoir. Lift it to reach the filter and water bucket."
      ],
      "reservoir": [
        "Water reservoir",
        "Holds tap water above the filter. Wait until filtration finishes before pouring."
      ],
      "filter": [
        "Filter element",
        "Seats firmly in the reservoir. Prepare a replacement before use."
      ],
      "indicator": [
        "Filter-life indicator",
        "Four bars show the nominal 60-day interval. Water quality and usage affect filter life; this is not a water-quality test."
      ],
      "body": [
        "Pitcher body & handle",
        "Collects the filtered water. Pour only after the reservoir has finished draining."
      ]
    },
    "safety": [
      "Use municipal tap water. Do not filter water above 40°C.",
      "Wait until all water is filtered before pouring. Use filtered water promptly.",
      "If tap water is unusually cloudy, do not filter it immediately.",
      "Preparation and reset instructions conflict in the source. Ask Simplus to confirm the procedure for your unit."
    ],
    "journeys": {
      "first": {
        "title": "First use",
        "summary": "Get to know your pitcher, one step at a time.",
        "steps": [
          {
            "id": "wash",
            "title": "Start with clean parts",
            "body": "Unpack the pitcher and filter. Clean the body, lid and reservoir before assembly.",
            "focus": "lid",
            "pose": "open",
            "action": "Lift the lid",
            "safety": "",
            "note": "The drawing is a practice model. Confirm a step only after doing it with your pitcher."
          },
          {
            "id": "prepare",
            "title": "Prepare the filter",
            "body": "Immerse the unpacked filter in cold water and gently shake it 10–15 times.",
            "focus": "filter",
            "pose": "filter",
            "action": "Remove the filter",
            "safety": "",
            "note": "Preparation conflict: the usage section also adds an approximately 12-hour immersion; the replacement section omits it. Confirm the full preparation sequence with Simplus."
          },
          {
            "id": "seat",
            "title": "Seat the filter firmly",
            "body": "Press the prepared filter into the reservoir so it fits securely.",
            "focus": "filter",
            "pose": "seat",
            "action": "Seat the filter",
            "safety": "",
            "note": ""
          },
          {
            "id": "discard-one",
            "title": "Discard the first filtered fill",
            "body": "Let the first fill filter through, then discard it.",
            "focus": "reservoir",
            "pose": "fill",
            "action": "Preview filtration",
            "safety": "Use municipal tap water; no water above 40°C. Wait for filtration to finish before pouring.",
            "note": ""
          },
          {
            "id": "discard-two",
            "title": "Discard the second filtered fill",
            "body": "Repeat the fill, filter and discard cycle. The first two filtered fills are not for drinking.",
            "focus": "reservoir",
            "pose": "fill",
            "action": "Replay the fill",
            "safety": "",
            "note": "The manual gives inconsistent preparation endpoints. This guide cannot confirm drinking readiness after this step; check the original instructions with Simplus."
          },
          {
            "id": "activate",
            "title": "Meet your filter-life indicator",
            "body": "The documented initial activation is to press START for about 3 seconds until the dot flashes.",
            "focus": "indicator",
            "pose": "indicator",
            "action": "Practise 3-second activation",
            "safety": "",
            "note": "Four bars represent a nominal 60-day interval, affected by water quality and usage. This demo does not start a real replacement reminder. Reset instructions conflict; see Get help."
          }
        ]
      },
      "everyday": {
        "title": "Everyday use",
        "summary": "Fill, filter and pour with care.",
        "steps": [
          {
            "id": "fill",
            "title": "Fill the reservoir",
            "body": "Use municipal tap water. Lift the lid to access the reservoir.",
            "focus": "reservoir",
            "pose": "open",
            "action": "Lift the lid",
            "safety": "No water above 40°C. Do not immediately filter unusually cloudy tap water.",
            "note": ""
          },
          {
            "id": "wait",
            "title": "Give the filter time",
            "body": "Let all water pass through before pouring, so unfiltered water cannot pour out with it.",
            "focus": "filter",
            "pose": "fill",
            "action": "Preview filtration",
            "safety": "",
            "note": "The water animation is illustrative; it does not time your real filter."
          },
          {
            "id": "pour",
            "title": "Pour after filtration",
            "body": "Use the filtered water promptly. Check the filter-life bars as part of your routine.",
            "focus": "body",
            "pose": "closed",
            "action": "View the pitcher",
            "safety": "",
            "note": "The indicator estimates an interval. It does not measure water safety."
          }
        ]
      },
      "care": {
        "title": "Cleaning & care",
        "summary": "Care for the pitcher and replace the filter.",
        "steps": [
          {
            "id": "clean",
            "title": "Open and clean",
            "body": "Remove the old filter. Clean the body, reservoir and lid.",
            "focus": "lid",
            "pose": "filter",
            "action": "Open the pitcher",
            "safety": "",
            "note": ""
          },
          {
            "id": "replace",
            "title": "Fit a new filter",
            "body": "Prepare and seat a replacement filter, then discard the first two filtered fills.",
            "focus": "filter",
            "pose": "seat",
            "action": "Seat the new filter",
            "safety": "",
            "note": "The source disagrees on the complete preparation sequence. Confirm it with Simplus before drinking."
          },
          {
            "id": "life",
            "title": "Check the filter-life bars",
            "body": "Replace the filter when all four bars disappear. The nominal interval is 60 days, subject to water quality and usage.",
            "focus": "indicator",
            "pose": "indicator",
            "action": "Explore the four bars",
            "safety": "",
            "note": "Reset conflict: the timer section names START; the FAQ names the lower-right black point. Both mention about 8 seconds. No reset is simulated or prescribed here."
          }
        ]
      },
      "help": {
        "title": "Get help",
        "summary": "Resolve the source questions before proceeding.",
        "steps": [
          {
            "id": "preparation-conflict",
            "title": "Which preparation sequence?",
            "body": "The usage section includes an approximately 12-hour immersion. The replacement section instead ends after discarding two fills. Ask Simplus which applies to your unit.",
            "focus": "filter",
            "pose": "filter",
            "action": "View the filter",
            "safety": "",
            "note": "There is no drinking-readiness confirmation in this demo."
          },
          {
            "id": "reset-conflict",
            "title": "Which control resets the indicator?",
            "body": "The timer section names START, while the FAQ names the lower-right black point. Both describe about 8 seconds. Ask Simplus to identify the correct control.",
            "focus": "indicator",
            "pose": "indicator",
            "action": "View the indicator",
            "safety": "",
            "note": "Only the documented 3-second initial activation is demonstrated. No reset procedure is inferred."
          },
          {
            "id": "support",
            "title": "Keep your model number handy",
            "body": "Contact Simplus with LVSH001, a photo of your indicator and the question you need resolved. Use the original manual alongside this guide.",
            "focus": "body",
            "pose": "closed",
            "action": "View the pitcher",
            "safety": "",
            "note": ""
          }
        ]
      }
    }
  }
};
export const journeyKeys=["first","everyday","care","help"];
