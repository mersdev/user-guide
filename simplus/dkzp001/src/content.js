export const products={
  "dkzp001": {
    "confirmationNotice": "This records your review only; the illustration cannot operate or check your appliance.",
    "returnProducts": "https://my.simplus.online/my/products",
    "icon": "grill",
    "name": "Electric grill with hot pot",
    "model": "DKZP001",
    "short": "Two cooking zones. One careful routine.",
    "figure": "05",
    "manual": "https://my.simplus.online/my/products/user-manual/DKZP001",
    "sourceLabel": "Official SG/MY DKZP001 English manual",
    "parts": {
      "pot": [
        "Hot pot & glass lid",
        "Use the pot for liquid cooking. Avoid overfilling; hot liquid may overflow when boiling."
      ],
      "grill": [
        "Non-stick grill plate",
        "Lightly grease before grilling. Turn food with wooden utensils; protect the coating."
      ],
      "controls": [
        "Heat controls & indicators",
        "Adjust the heat using your unit’s markings. Indicator lights cycle as temperature control switches heating on and off."
      ],
      "handles": [
        "Side handles",
        "Let the appliance cool before moving. Keep hands away from the hot plate edges."
      ],
      "body": [
        "Housing & power connection",
        "Use the matching cord and connector. Keep the whole appliance out of water."
      ]
    },
    "safety": [
      "Hot surfaces can burn. Supervise cooking; keep children and flammable materials away.",
      "Use a stable, heat-resistant surface; do not place on glass or plastic. Do not move during use.",
      "Check the rating label and use a suitable dedicated socket; do not share with other appliances.",
      "Turn controls OFF, unplug and cool naturally before cleaning or moving.",
      "Never immerse the whole product. No sharp metal utensils, steel wool or abrasive cleaning tools.",
      "The requested model is DKZP001, but the source specification lists KS-30A and conflicting electrical values. Confirm against your unit’s label with Simplus."
    ],
    "journeys": {
      "first": {
        "title": "First use",
        "summary": "Check the label and prepare both zones.",
        "steps": [
          {
            "id": "check",
            "title": "Check the model and your space",
            "body": "Check your rating label. Set the appliance on a stable, heat-resistant surface away from flammables.",
            "focus": "body",
            "pose": "closed",
            "action": "View the housing",
            "safety": "Do not place on glass or plastic.",
            "note": "The linked DKZP001 manual lists KS-30A in its specification. Confirm applicability with Simplus."
          },
          {
            "id": "wipe",
            "title": "Wipe before using",
            "body": "With power disconnected, clean the cooking surfaces with a damp cloth. Check that the bottom and connector are intact and clear.",
            "focus": "grill",
            "pose": "open",
            "action": "Lift the demo lid",
            "safety": "Do not immerse the appliance.",
            "note": ""
          },
          {
            "id": "connect",
            "title": "Start with controls OFF",
            "body": "Use the matching cord and connector. Set controls OFF before connecting to a suitable dedicated socket.",
            "focus": "controls",
            "pose": "closed",
            "action": "View the heat controls",
            "safety": "Check the real rating label; do not rely on the source’s conflicting voltage statements.",
            "note": ""
          }
        ]
      },
      "everyday": {
        "title": "Everyday use",
        "summary": "Prepare, adjust and switch off.",
        "steps": [
          {
            "id": "prepare",
            "title": "Prepare your cooking zones",
            "body": "Lightly grease the non-stick grill. For liquid cooking, leave room in the pot to prevent overflow.",
            "focus": "pot",
            "pose": "open",
            "action": "Lift the demo lid",
            "safety": "Use wooden utensils; keep sharp metal off the coating.",
            "note": ""
          },
          {
            "id": "heat",
            "title": "Adjust heat while you cook",
            "body": "Use your unit’s heat-control markings. The lights cycle as the thermostat stops and restarts heating.",
            "focus": "controls",
            "pose": "closed",
            "action": "Preview the indicator lights",
            "safety": "Stay with the appliance. Do not move it during cooking.",
            "note": "The preview illustrates the lights only; it does not measure temperature or food readiness."
          },
          {
            "id": "off",
            "title": "Turn OFF and unplug",
            "body": "Set the controls to OFF. After the indicator goes out, unplug and let the appliance cool naturally.",
            "focus": "controls",
            "pose": "closed",
            "action": "View the OFF position",
            "safety": "An unlit indicator does not mean the surfaces are cool.",
            "note": ""
          }
        ]
      },
      "care": {
        "title": "Cleaning & care",
        "summary": "Cool naturally and protect the coating.",
        "steps": [
          {
            "id": "cool",
            "title": "Unplug and cool first",
            "body": "Set controls OFF, disconnect power and let the appliance cool before cleaning or moving.",
            "focus": "handles",
            "pose": "closed",
            "action": "View the handles",
            "safety": "Do not touch hot metal or plate edges.",
            "note": ""
          },
          {
            "id": "wipe",
            "title": "Wipe the cooking surfaces",
            "body": "Wipe with a damp cloth or paper towel, then dry with a cloth.",
            "focus": "grill",
            "pose": "open",
            "action": "View both cooking zones",
            "safety": "Never put the whole unit in water. No steel wool or sharp cleaning tools.",
            "note": ""
          },
          {
            "id": "store",
            "title": "Keep it dry for storage",
            "body": "Store the clean appliance in a dry, ventilated place. Use only its matching power cord and connector.",
            "focus": "body",
            "pose": "closed",
            "action": "View the power connection",
            "safety": "",
            "note": ""
          }
        ]
      },
      "help": {
        "title": "Get help",
        "summary": "Understand the lights and check your model.",
        "steps": [
          {
            "id": "lights",
            "title": "Why does the light cycle?",
            "body": "The temperature control switches heating off at its set point and on again as it cools. The light indicates heating activity.",
            "focus": "controls",
            "pose": "closed",
            "action": "Preview the indicator lights",
            "safety": "The plate can remain hot while the light is off.",
            "note": ""
          },
          {
            "id": "model",
            "title": "DKZP001 or KS-30A?",
            "body": "The product link names DKZP001, while its specification table names KS-30A. Send Simplus a rating-label photo to confirm the correct manual.",
            "focus": "body",
            "pose": "closed",
            "action": "View the housing",
            "safety": "",
            "note": ""
          },
          {
            "id": "service",
            "title": "Stop if the unit is damaged",
            "body": "Disconnect and contact Simplus about a damaged cord, connector or faulty unit. Do not dismantle the back cover.",
            "focus": "body",
            "pose": "closed",
            "action": "View the housing",
            "safety": "",
            "note": ""
          }
        ]
      }
    }
  }
};
export const journeyKeys=["first","everyday","care","help"];
