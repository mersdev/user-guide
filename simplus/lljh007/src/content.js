export const products={
  "lljh007": {
    "confirmationNotice": "This records your review only; the illustration cannot operate or check your appliance.",
    "returnProducts": "https://my.simplus.online/my/products",
    "icon": "blender",
    "name": "Glass jar blender",
    "model": "LLJH007",
    "short": "Prepare, secure and blend.",
    "figure": "04",
    "manual": "https://my.simplus.online/my/products/user-manual/LLJH007",
    "sourceLabel": "Official SG/MY FOOD PROCESSOR LLJH007 English manual",
    "parts": {
      "cap": [
        "Measuring cap",
        "Fits the lid opening; turn clockwise to lock before use."
      ],
      "lid": [
        "Jar lid",
        "Close securely before operating."
      ],
      "jar": [
        "Glass jar & handle",
        "Seat the assembled jar securely on the motor base. Lift straight off after switching off, unplugging and letting the blades stop."
      ],
      "blade": [
        "Blade, seals & cup base",
        "Sharp cutting blades sit above the cup base with sealing and safety rings. Unplug before handling."
      ],
      "motor": [
        "Motor base",
        "Contains the motor. Keep the base, cord and plug out of water."
      ],
      "control": [
        "Rotary speed switch",
        "0 stops; 1–4 are for lighter liquid mixtures; 5 is for thicker mixtures. Hold P for a short pulse."
      ]
    },
    "safety": [
      "Disconnect before assembly, disassembly, cleaning or approaching moving parts. Wait for blades to stop.",
      "Keep hands and utensils away from the blades. Blades are sharp, especially during emptying and cleaning.",
      "Do not operate for more than one minute at a time. Allow the motor to cool before another run.",
      "Keep the lid and measuring cap secured. Hot liquid can eject through sudden steaming.",
      "Never immerse the motor base, cord or plug. Keep away from children and do not leave connected unattended.",
      "The operating text says stop at 0; one caution incorrectly says disconnect at 1. Use 0, unplug and ask Simplus to clarify."
    ],
    "journeys": {
      "first": {
        "title": "First use",
        "summary": "Clean, seat the jar and close the lid.",
        "steps": [
          {
            "id": "clean",
            "title": "Clean before first use",
            "body": "Unplug. Thoroughly clean the food-contact parts before using the blender. Keep the motor base dry.",
            "focus": "blade",
            "pose": "open",
            "action": "Lift the demo lid",
            "safety": "Take care around sharp blades.",
            "note": ""
          },
          {
            "id": "seat",
            "title": "Seat the assembled jar",
            "body": "Set the switch to 0. With the blender unplugged, press the assembled jar down onto the motor base until secure.",
            "focus": "jar",
            "pose": "seated",
            "action": "Seat the demo jar",
            "safety": "",
            "note": ""
          },
          {
            "id": "close",
            "title": "Secure the lid and cap",
            "body": "Close the lid securely. Insert the measuring cap and turn clockwise to lock.",
            "focus": "lid",
            "pose": "closed",
            "action": "Close the demo lid",
            "safety": "Check the real assembly before connecting power.",
            "note": ""
          }
        ]
      },
      "everyday": {
        "title": "Everyday use",
        "summary": "Load, blend briefly and stop safely.",
        "steps": [
          {
            "id": "load",
            "title": "Prepare the ingredients",
            "body": "Cut solids into 2–3 cm pieces. Add liquid first when mixing solids, then secure the lid and cap.",
            "focus": "jar",
            "pose": "open",
            "action": "Lift the demo lid",
            "safety": "Keep hands and utensils out of the jar when connected.",
            "note": ""
          },
          {
            "id": "blend",
            "title": "Choose a speed or pulse",
            "body": "Use 1–4 for lighter liquids or 5 for thicker mixtures. Hold P for a short pulse; it does not latch. Support the lid during operation.",
            "focus": "control",
            "pose": "closed",
            "action": "Preview a short blend",
            "safety": "Run for no more than one minute, then allow the motor to cool.",
            "note": "The preview is illustrative and does not time a real run."
          },
          {
            "id": "stop",
            "title": "Stop before lifting the jar",
            "body": "Turn to 0, unplug and wait for the blades to stop. Lift the jar straight off the base; no twist is needed.",
            "focus": "jar",
            "pose": "lifted",
            "action": "Lift the demo jar",
            "safety": "The source has a contradictory caution naming 1 for disconnection. Its operating instructions specify 0.",
            "note": ""
          }
        ]
      },
      "care": {
        "title": "Cleaning & care",
        "summary": "Rinse the jar and keep the motor dry.",
        "steps": [
          {
            "id": "rinse",
            "title": "Prepare the jar rinse",
            "body": "With power disconnected, empty the jar and add water. Refit the jar and secure the lid and cap.",
            "focus": "jar",
            "pose": "closed",
            "action": "View the closed jar",
            "safety": "Keep fingers away from the blade edges.",
            "note": ""
          },
          {
            "id": "pulse",
            "title": "Use short cleaning pulses",
            "body": "The manual describes several short P pulses with water in the secured jar. Return to 0 and unplug before removing it.",
            "focus": "control",
            "pose": "closed",
            "action": "Preview a short pulse",
            "safety": "Do not immerse the motor base.",
            "note": ""
          },
          {
            "id": "dry",
            "title": "Rinse and handle carefully",
            "body": "With power disconnected and blades stopped, empty and rinse the jar until clean. Handle blade components carefully.",
            "focus": "blade",
            "pose": "lifted",
            "action": "Lift the demo jar",
            "safety": "No metal scouring pads; keep cord, plug and motor base dry.",
            "note": ""
          }
        ]
      },
      "help": {
        "title": "Get help",
        "summary": "Check assembly and the operating limit.",
        "steps": [
          {
            "id": "assembly",
            "title": "Check the assembly",
            "body": "Switch to 0 and unplug before checking that the jar is securely seated and the lid and cap are closed.",
            "focus": "lid",
            "pose": "closed",
            "action": "View the lid assembly",
            "safety": "",
            "note": ""
          },
          {
            "id": "rest",
            "title": "Give the motor time to cool",
            "body": "The manual limits a run to one minute and requires cooling afterwards. It does not specify a cooling duration.",
            "focus": "motor",
            "pose": "closed",
            "action": "View the motor base",
            "safety": "Do not invent a repeat-run schedule; contact Simplus if overheating recurs.",
            "note": ""
          },
          {
            "id": "support",
            "title": "Contact Simplus with your model",
            "body": "Provide LLJH007, a rating-label photo and the issue. Stop using a damaged cord or faulty appliance.",
            "focus": "control",
            "pose": "closed",
            "action": "View the switch",
            "safety": "",
            "note": "Ask Simplus to clarify the source’s contradictory 0/1 disconnection instruction."
          }
        ]
      }
    }
  }
};
export const journeyKeys=["first","everyday","care","help"];
