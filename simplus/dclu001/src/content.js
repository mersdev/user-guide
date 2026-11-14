export const products={
  "dclu001": {
    "confirmationNotice": "This records your review only; the illustration cannot operate or check your appliance.",
    "returnProducts": "https://my.simplus.online/my/products",
    "icon": "cooker",
    "name": "Induction cooker",
    "model": "DCLU001",
    "short": "Know your cookware. Keep the air flowing.",
    "figure": "03",
    "manual": "https://my.simplus.online/my/products/user-manual/DCLU001",
    "sourceLabel": "Official DCLU001 SG/MY English manual",
    "parts": {
      "plate": [
        "Glass cooking plate",
        "Centre suitable cookware on the clean, dry plate. The surface stays hot after cooking."
      ],
      "cookware": [
        "Compatible cookware",
        "Use a flat, ferrous induction-ready base 11.4–26 cm wide. Never heat an empty pan. The pan shown is illustrative."
      ],
      "control": [
        "Power & control",
        "Use the markings on your unit. The source drawing shows a rotary control, while its text describes buttons and a display."
      ],
      "housing": [
        "Housing & airflow",
        "Keep at least 10 cm of free space around the freestanding unit. Keep air inlets and outlets clear."
      ]
    },
    "safety": [
      "Never heat empty cookware. Supervise use and keep children away.",
      "Use a flat, dry, firm surface with at least 10 cm free around the freestanding unit. No soft or plastic tablecloth.",
      "Switch off using the power control. Wait for the cooling fan to stop before unplugging.",
      "A cracked plate, damaged cord or damaged plug means stop use and contact Simplus. Never immerse or rinse the cooker.",
      "Keep loose metal items off the plate. Maximum load: 7 kg; avoid more than 2 hours of continuous use.",
      "Check the rating label and your control markings. Ask Simplus about installation requirements before any built-in installation."
    ],
    "journeys": {
      "first": {
        "title": "First use",
        "summary": "Check the surface, pan and controls.",
        "steps": [
          {
            "id": "place",
            "title": "Give the cooker breathing room",
            "body": "Remove packing. Place on a firm, flat, dry surface with at least 10 cm free around it.",
            "focus": "housing",
            "pose": "closed",
            "action": "Show airflow space",
            "safety": "Keep vents uncovered and the cord clear of heat.",
            "note": ""
          },
          {
            "id": "pan",
            "title": "Check your cookware",
            "body": "Choose induction-ready cookware with a flat ferrous base 11.4–26 cm wide. Put food or liquid inside before heating.",
            "focus": "cookware",
            "pose": "pan",
            "action": "Place the demo pan",
            "safety": "Do not preheat an empty pan.",
            "note": ""
          },
          {
            "id": "controls",
            "title": "Match the controls to your unit",
            "body": "Check the rating label and actual control markings before connecting to a suitable individual socket.",
            "focus": "control",
            "pose": "closed",
            "action": "Explore the control",
            "safety": "",
            "note": "The diagram shows a rotary control; the text describes ON/OFF, function and +/− buttons. Confirm the sequence for your unit with Simplus."
          }
        ]
      },
      "everyday": {
        "title": "Everyday use",
        "summary": "Centre the pan, supervise and cool down.",
        "steps": [
          {
            "id": "centre",
            "title": "Centre a filled pan",
            "body": "Keep the glass clean and dry. Centre compatible cookware containing food or liquid.",
            "focus": "cookware",
            "pose": "pan",
            "action": "Centre the demo pan",
            "safety": "Keep loose metal objects off the cooking surface.",
            "note": ""
          },
          {
            "id": "cook",
            "title": "Adjust using your own markings",
            "body": "Switch on and adjust using the controls fitted to your unit. Stay with the cooker while it operates.",
            "focus": "control",
            "pose": "pan",
            "action": "Explore the control",
            "safety": "Do not leave heating unattended.",
            "note": "This drawing demonstrates placement only; it does not simulate temperatures or resolve the control discrepancy."
          },
          {
            "id": "off",
            "title": "Switch off, then let the fan finish",
            "body": "Use the power control to switch off. The fan may run for about one minute; wait until it stops before unplugging.",
            "focus": "control",
            "pose": "closed",
            "action": "View the power control",
            "safety": "The plate and cookware remain hot. Do not rely on pan detection to switch off.",
            "note": ""
          }
        ]
      },
      "care": {
        "title": "Cleaning & care",
        "summary": "Cool, unplug and wipe gently.",
        "steps": [
          {
            "id": "cool",
            "title": "Let the cooker cool",
            "body": "Switch off. Let the fan stop, unplug by the plug and allow the plate to cool.",
            "focus": "plate",
            "pose": "closed",
            "action": "View the glass plate",
            "safety": "Never immerse the unit, cord or plug.",
            "note": ""
          },
          {
            "id": "wipe",
            "title": "Wipe the cooking plate",
            "body": "Use a warm damp cloth with mild nonabrasive soap. Wipe the housing and control with a soft cloth.",
            "focus": "plate",
            "pose": "closed",
            "action": "Explore the surface",
            "safety": "No abrasive pads, caustic cleaners, petroleum products or water jets.",
            "note": ""
          },
          {
            "id": "store",
            "title": "Store clean and dry",
            "body": "Clean before storing in a dry place. Avoid stacking heavy objects on the cooker.",
            "focus": "housing",
            "pose": "closed",
            "action": "View the housing",
            "safety": "",
            "note": ""
          }
        ]
      },
      "help": {
        "title": "Get help",
        "summary": "Check cookware and stop if damaged.",
        "steps": [
          {
            "id": "e0",
            "title": "Beeping or E0? Check the pan",
            "body": "The manual associates continual beeps or E0 with missing or unsuitable cookware. Switch off and check compatibility and base size.",
            "focus": "cookware",
            "pose": "pan",
            "action": "View compatible placement",
            "safety": "Do not test by heating an empty pan.",
            "note": ""
          },
          {
            "id": "damage",
            "title": "Cracked plate or damaged cable?",
            "body": "Stop using the cooker and contact Simplus. Do not open or repair the housing yourself.",
            "focus": "plate",
            "pose": "closed",
            "action": "View the plate",
            "safety": "",
            "note": ""
          },
          {
            "id": "support",
            "title": "Confirm the controls for your model",
            "body": "Send Simplus your DCLU001 rating-label photo and a photo of the control. Ask which operating sequence applies.",
            "focus": "control",
            "pose": "closed",
            "action": "View the control",
            "safety": "",
            "note": "The source also includes built-in installation text alongside freestanding guidance; do not use this drawing as an installation plan."
          }
        ]
      }
    }
  }
};
export const journeyKeys=["first","everyday","care","help"];
