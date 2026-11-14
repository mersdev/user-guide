export const products={
  "dkxh005": {
    "icon": "oven",
    "confirmationNotice": "This records your review only; it does not verify your oven or its temperature.",
    "name": "Toaster oven",
    "model": "DKXH005",
    "short": "A warm welcome to your kitchen.",
    "figure": "02",
    "manual": "https://pc.simplus.online/th/pages/user-manual-dkxh005",
    "sourceLabel": "Official SG/MY DKXH005 English manual",
    "parts": {
      "door": [
        "Door & handle",
        "Use the handle to open the door. The door and surrounding surfaces can be hot."
      ],
      "rack": [
        "Wire rack",
        "Rests on the support guides. Support it when sliding it out; use insulated oven gloves for hot items."
      ],
      "tray": [
        "Baking tray & tray handle",
        "The tray holds food or catches drips. Use the supplied tray handle or insulated oven gloves for hot accessories."
      ],
      "temperature": [
        "Temperature control",
        "Practise selecting 100–230°C here. The manual calls this the function control in its diagram."
      ],
      "timer": [
        "Timer & cooking indicator",
        "Turn the timer clockwise. The indicator lights during operation; the timer bell signals the end. The demo is silent and accelerated."
      ],
      "housing": [
        "Housing & ventilation",
        "Keep at least 4 inches (about 10 cm) free on every side. Keep the top clear and flammables away."
      ]
    },
    "safety": [
      "Keep at least 4 inches (about 10 cm) free on all sides for airflow. Keep the top clear and flammables away.",
      "Surfaces and accessories become hot. Use handles and insulated oven gloves; support the rack when sliding it out.",
      "Turn the timer OFF, unplug by the plug and let the oven cool before cleaning. Never immerse the oven or cord.",
      "Keep food away from heating elements. No foil covering, paper, plastic or cardboard inside. Supervise children.",
      "Do not use a damaged oven or cord. The source title says DKXH005, but the specifications say JK09A-01; confirm against your rating label."
    ],
    "journeys": {
      "first": {
        "title": "First use",
        "summary": "Prepare your space, then learn the controls.",
        "steps": [
          {
            "id": "check",
            "title": "Check your oven and space",
            "body": "Check the rating label before following this guide. Set the timer to OFF and unplug.",
            "focus": "housing",
            "pose": "closed",
            "action": "Show ventilation space",
            "safety": "Leave at least 4 inches (about 10 cm) free on all sides. Keep the top clear.",
            "note": "Model discrepancy: the SG/MY page title is DKXH005, but its specification table lists JK09A-01. Simplus must confirm which instructions apply to your unit."
          },
          {
            "id": "wash",
            "title": "Wash the accessories",
            "body": "Wash the rack and tray in hot soapy water, dry thoroughly and reassemble.",
            "focus": "rack",
            "pose": "accessories",
            "action": "Explore the rack & tray",
            "safety": "Keep the oven unplugged. Do not immerse the oven or cord.",
            "note": ""
          },
          {
            "id": "temperature",
            "title": "Set the first-use temperature",
            "body": "After reassembly, the manual recommends an initial run at 230°C for approximately 15 minutes to remove packing residue.",
            "focus": "temperature",
            "pose": "closed",
            "action": "Practise the controls",
            "safety": "Use your real oven only after confirming the model and clearing all packing material.",
            "note": ""
          },
          {
            "id": "run",
            "title": "Understand the timer",
            "body": "Practise a 15-minute setting. The indicator lights during operation; the timer signals the end.",
            "focus": "timer",
            "pose": "closed",
            "action": "Preview the run",
            "safety": "The oven becomes hot. Maintain ventilation and use insulated oven gloves.",
            "note": "Accelerated preview: 15 minutes shown in 8 seconds. It cannot time or complete your real first-use run."
          },
          {
            "id": "cool",
            "title": "Switch off and let it cool",
            "body": "Turn the timer to OFF, unplug and allow the oven to cool before cleaning or handling accessories.",
            "focus": "door",
            "pose": "closed",
            "action": "Open the cooled demo",
            "safety": "A finished timer does not mean surfaces are cool. This drawing cannot assess their temperature.",
            "note": ""
          }
        ]
      },
      "everyday": {
        "title": "Everyday use",
        "summary": "Place, set and handle with care.",
        "steps": [
          {
            "id": "load",
            "title": "Place the rack and tray",
            "body": "Use the support guides and keep food clear of heating elements.",
            "focus": "rack",
            "pose": "accessories",
            "action": "Explore the rack & tray",
            "safety": "Use insulated oven gloves with hot items; support the rack when sliding it out.",
            "note": ""
          },
          {
            "id": "set",
            "title": "Choose your settings",
            "body": "Select a temperature and turn the timer clockwise for your recipe. Preheating depends on the recipe.",
            "focus": "temperature",
            "pose": "closed",
            "action": "Practise the controls",
            "safety": "Keep ventilation space clear. Do not put flammable materials in or on the oven.",
            "note": ""
          },
          {
            "id": "finish",
            "title": "Finish cooking carefully",
            "body": "Turn the timer OFF. Use the tray handle or insulated oven gloves for hot accessories.",
            "focus": "tray",
            "pose": "open",
            "action": "Open the demo door",
            "safety": "Hot surfaces remain hot after cooking. Unplug when not in use.",
            "note": ""
          }
        ]
      },
      "care": {
        "title": "Cleaning & care",
        "summary": "A cool, unplugged oven comes first.",
        "steps": [
          {
            "id": "unplug",
            "title": "Unplug and cool completely",
            "body": "Turn the timer OFF, unplug by holding the plug and let the oven cool.",
            "focus": "housing",
            "pose": "closed",
            "action": "View the oven",
            "safety": "Never immerse the oven or cord in water.",
            "note": ""
          },
          {
            "id": "accessories",
            "title": "Clean the rack and tray",
            "body": "Remove the cooled accessories. Wash in hot soapy water and dry thoroughly.",
            "focus": "tray",
            "pose": "accessories",
            "action": "Slide out the accessories",
            "safety": "",
            "note": ""
          },
          {
            "id": "wipe",
            "title": "Wipe, then dry",
            "body": "Use a damp cloth and mild detergent on the interior and exterior. Dry all surfaces and accessories before reassembly.",
            "focus": "door",
            "pose": "open",
            "action": "Open the demo door",
            "safety": "No steel wool, abrasive cleaners or scraping with metal utensils.",
            "note": ""
          }
        ]
      },
      "help": {
        "title": "Get help",
        "summary": "Check the model and find the right guidance.",
        "steps": [
          {
            "id": "model-discrepancy",
            "title": "Check the model discrepancy",
            "body": "The source title says DKXH005. Its specifications list JK09A-01. Check your rating label and ask Simplus to confirm the applicable manual.",
            "focus": "housing",
            "pose": "closed",
            "action": "View the housing",
            "safety": "",
            "note": "This demo keeps the requested DKXH005 name; it does not silently treat the two model numbers as equivalent."
          },
          {
            "id": "indicator",
            "title": "What does the light mean?",
            "body": "The cooking indicator lights with operation. The timer signals the end; the light is not a cool-to-touch indicator.",
            "focus": "timer",
            "pose": "closed",
            "action": "Preview the indicator",
            "safety": "Use insulated oven gloves. Allow the oven to cool before cleaning.",
            "note": "This preview is accelerated and silent. It does not represent thermostat cycling or verify real temperatures."
          },
          {
            "id": "support",
            "title": "Contact Simplus",
            "body": "Have your rating-label photo and model number ready. Stop using a damaged oven or cord and contact Simplus for service.",
            "focus": "housing",
            "pose": "closed",
            "action": "View the oven",
            "safety": "",
            "note": ""
          }
        ]
      }
    }
  }
};
export const journeyKeys=["first","everyday","care","help"];
