"use client";

import React, { useMemo, useState } from "react";

type Outcome = "Contact Made" | "No Contact";
type FirstContact = "Yes" | "No";
type Status = "Open" | "On Hold" | "Resolved" | "Closed";

type ChecklistItem = {
  id: string;
  text: string;
};

type Section = {
  title: string;
  subtitle: string;
  items: ChecklistItem[];
};

const firstContactSections: Section[] = [
  {
    title: "First Contact Only",
    subtitle: "Show these when the customer is being contacted for the first time.",
    items: [
      { id: "fc-1", text: "Introduce yourself and OVO clearly." },
      { id: "fc-2", text: "Check communication preference and working hours." },
      { id: "fc-3", text: "Confirm all appropriate DPA checks before discussing account details." },
      { id: "fc-4", text: "Use the correct outbound recording statement before DPA." },
      { id: "fc-5", text: "Provide a summary of the complaint on the first interaction." },
      { id: "fc-6", text: "Explain clearly what happens next and when the customer will hear from us again." },
    ],
  },
];

const repeatContactSections: Section[] = [
  {
    title: "Repeat Contact",
    subtitle: "Show these when the customer has already been contacted before.",
    items: [
      { id: "rc-1", text: "Introduce yourself clearly and continue the case in a consistent tone." },
      { id: "rc-2", text: "Check the latest notes, promised actions, and any open reminders." },
      { id: "rc-3", text: "Confirm DPA again before discussing account-specific information if required." },
      { id: "rc-4", text: "Keep the customer updated on progress and next steps." },
    ],
  },
];

const callSections: Section[] = [
  {
    title: "Before Call",
    subtitle: "Get ready before you dial out.",
    items: [
      { id: "before-1", text: "Check complaint notes, history, and any promises already made." },
      { id: "before-2", text: "Check contact details and the most recent account information." },
      { id: "before-3", text: "Send the required SMS before the call if a mobile number is held." },
      { id: "before-4", text: "Be ready to complete DPA and follow the outbound recording script." },
    ],
  },
  {
    title: "When the Customer Answers",
    subtitle: "Use this only for contact made.",
    items: [
      { id: "during-1", text: "Introduce yourself and OVO clearly." },
      { id: "during-2", text: "Complete DPA before discussing account-specific details." },
      { id: "during-3", text: "Listen fully before responding." },
      { id: "during-4", text: "Use simple, positive language and explain the next steps." },
      { id: "during-5", text: "If the caller is not the account holder, pause and avoid discussing account-specific or personal information." },
    ],
  },
  {
    title: "When the Customer is Upset",
    subtitle: "Stay calm, empathetic, and reassuring.",
    items: [
      { id: "upset-1", text: "Acknowledge how the customer feels." },
      { id: "upset-2", text: "Apologise appropriately." },
      { id: "upset-3", text: "Ask open questions to understand the issue." },
      { id: "upset-4", text: "Set expectations for what happens next." },
    ],
  },
  {
    title: "After the Call",
    subtitle: "Complete the admin before moving on.",
    items: [
      { id: "after-1", text: "Update the memo with a clear summary of the call." },
      { id: "after-2", text: "Set the reminder or next contact date." },
      { id: "after-3", text: "Update complaint status correctly." },
      { id: "after-4", text: "Send the follow-up email if required." },
    ],
  },
  {
    title: "Complaint Updates Required",
    subtitle: "Log the right details on the complaint.",
    items: [
      { id: "complaint-1", text: "Case status updated correctly." },
      { id: "complaint-2", text: "Memo is clear, detailed, and free from sensitive data." },
      { id: "complaint-3", text: "Any actions or next steps are recorded." },
      { id: "complaint-4", text: "Reminder or next contact date added." },
      { id: "complaint-5", text: "Any goodwill, compensation, or relevant actions are logged." },
      { id: "complaint-6", text: "Complaint reporting date is correct." },
    ],
  },
  {
    title: "Email Checklist",
    subtitle: "Keep emails short and professional.",
    items: [
      { id: "email-1", text: "Use the correct template and greeting." },
      { id: "email-2", text: "Include a short summary of what was discussed." },
      { id: "email-3", text: "Include what happens next and the timeframe." },
      { id: "email-4", text: "Check spelling, grammar, and punctuation." },
      { id: "email-5", text: "Add the case reference, contact details, and opening hours." },
    ],
  },
];

const noContactProcess = [
  { day: "Day 0", action: "AM call + PM call" },
  { day: "Day 1", action: "AM call + resolution email" },
  { day: "Day 2", action: "Monitor" },
  { day: "Day 3", action: "2 call attempts + email" },
  { day: "Day 4", action: "Monitor" },
  { day: "Day 5", action: "Close at PM" },
];

function buildContactMadeEmail(customerName: string, agentName: string, caseRef: string) {
  return `Dear ${customerName || "Mr/Mrs [Surname]"},

Thank you for taking the time to speak with me today regarding your complaint.

Firstly, I would like to apologise for any inconvenience this matter may have caused.

During our conversation we discussed:

• [Issue discussed]
• [Investigation completed]
• [Actions taken]

Next Steps:

• [Next action]
• [Expected timeframe]

If you wish to submit a meter reading, download a bill, review your Direct Debit, or notify us of a move-out, you can do so through your online account.

You can also contact us via webchat if required.

Additional support available:
If anyone in the property requires additional support, such as children under 5 or 18, anyone with a medical condition, anyone using medical equipment or medication, or anyone over the age of 65, we can register this on the Priority Services Register.

Case reference: ${caseRef || "[Case Ref]"}

Kind regards,

${agentName || "[Advisor Name]"}
Customer Resolution Specialist
OVO Energy`;
}

function buildNoContactEmail(agentName: string) {
  return `My name is ${agentName || "[Advisor Name]"}, and I am a Customer Resolution Specialist at OVO. I am contacting you regarding the concerns that you recently raised.

On behalf of the whole OVO family, I wish to extend my deepest apologies for the inconvenience that this matter has caused you. My priority is to do everything I can to help resolve your complaint as quickly and smoothly as possible.

I am reaching out to let you know we have received your complaint as the complaints department, and we aim to prioritise your complaint as soon as possible and resolve it. Our sole focus now is to make this process as smooth and as swift as possible, whilst maintaining a caring, friendly and empathetic approach at all times. With your permission, we would like to take ownership of this query and see it through with you to completion.

To ensure that I am able to reach you, I will be in contact in the next 24 to 48 hours, and I would like to get the most suitable time to contact you back, as well as your communication preference, which can be a phone call or email.

My team is available on 0800 0699831 / 0330 303 5063 (Mon-Fri 9 am-5 pm). We have a dedicated complaints process, so if your complaint needs to be escalated, you can find our complaint handling procedure on our website. We’re here to support you. You can also contact us via our online chat (Mon-Fri 8 am-6 pm, Sat 9 am-1 pm).

Warm regards,
${agentName || "[Advisor Name]"}
Customer Resolution Specialist`;
}

function buildNoContactProcessEmail(agentName: string, caseRef: string) {
  return `Dear Customer,

This is a short update regarding complaint reference ${caseRef || "[Case Ref]"}.

We have been unable to make contact so far, and we are continuing to follow our no contact process.

Please contact us as soon as possible so we can discuss your complaint and agree the best way forward.

My team is available on 0800 0699831 / 0330 303 5063 (Mon-Fri 9 am-5 pm).

Kind regards,

${agentName || "[Advisor Name]"}
Customer Resolution Specialist
OVO Energy`;
}

export default function QACallAssistant() {
  const [outcome, setOutcome] = useState<Outcome>("Contact Made");
  const [firstContact, setFirstContact] = useState<FirstContact>("Yes");
  const [status, setStatus] = useState<Status>("Open");
  const [agentName, setAgentName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [caseRef, setCaseRef] = useState("");
  const [notes, setNotes] = useState("");
  const [emailSubject, setEmailSubject] = useState("Complaint update");
  const [emailBody, setEmailBody] = useState("");
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const totals = useMemo(() => {
    const items = callSections
      .filter((section) => outcome === "Contact Made" || section.title === "After the Call" || section.title === "Complaint Updates Required" || section.title === "Email Checklist")
      .flatMap((section) => section.items);
    const done = items.filter((item) => checked[item.id]).length;
    return { done, total: items.length, remaining: items.length - done };
  }, [checked, outcome]);

  const toggle = (id: string) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const visibleSections = useMemo(() => {
    const sections: Section[] = [];

    if (outcome === "No Contact") {
      sections.push({
        title: "No Contact Process",
        subtitle: "Keep this at the top when the customer cannot be reached.",
        items: noContactProcess.map((row) => ({ id: `ncp-${row.day}`, text: `${row.day} — ${row.action}` })),
      });
      sections.push({
        title: "No Contact Email",
        subtitle: "Use this instead of the call-summary email.",
        items: [
          { id: "nc-email-1", text: "Use the no contact email template." },
          { id: "nc-email-2", text: "Include the case reference and your name." },
          { id: "nc-email-3", text: "Keep the tone polite, clear, and professional." },
        ],
      });
    }

    sections.push({
      title: "Before Call",
      subtitle: "Get ready before you dial out.",
      items: [
        { id: "before-1", text: "Check complaint notes, history, and any promises already made." },
        { id: "before-2", text: "Check contact details and the most recent account information." },
        { id: "before-3", text: "Send the required SMS before the call if a mobile number is held." },
        { id: "before-4", text: "Be ready to complete DPA and follow the outbound recording script." },
      ],
    });

    if (outcome === "Contact Made") {
      if (firstContact === "Yes") {
        sections.push(firstContactSections[0]);
      } else {
        sections.push(repeatContactSections[0]);
      }

      sections.push({
        title: "When the Customer Answers",
        subtitle: "Use this only for contact made.",
        items: [
          { id: "during-1", text: "Introduce yourself and OVO clearly." },
          { id: "during-2", text: "Complete DPA before discussing account-specific details." },
          { id: "during-3", text: "Listen fully before responding." },
          { id: "during-4", text: "Use simple, positive language and explain the next steps." },
          { id: "during-5", text: "If the caller is not the account holder, pause and avoid discussing account-specific or personal information." },
          { id: "during-6", text: "If needed, ask the customer to hold and give a rough timeframe." },
          { id: "during-7", text: "If the call needs transferring, explain why and what will happen next." },
        ],
      });

      sections.push({
        title: "When the Customer is Upset",
        subtitle: "Stay calm, empathetic, and reassuring.",
        items: [
          { id: "upset-1", text: "Acknowledge how the customer feels." },
          { id: "upset-2", text: "Apologise appropriately." },
          { id: "upset-3", text: "Ask open questions to understand the issue." },
          { id: "upset-4", text: "Set expectations for what happens next." },
        ],
      });
    }

    sections.push({
      title: "After the Call",
      subtitle: "Complete the admin before moving on.",
      items: [
        { id: "after-1", text: "Update the memo with a clear summary of the call." },
        { id: "after-2", text: "Set the reminder or next contact date." },
        { id: "after-3", text: "Update complaint status correctly." },
        { id: "after-4", text: "Send the follow-up email if required." },
      ],
    });

    sections.push({
      title: "Complaint Updates Required",
      subtitle: "Log the right details on the complaint.",
      items: [
        { id: "complaint-1", text: "Case status updated correctly." },
        { id: "complaint-2", text: "Memo is clear, detailed, and free from sensitive data." },
        { id: "complaint-3", text: "Any actions or next steps are recorded." },
        { id: "complaint-4", text: "Reminder or next contact date added." },
        { id: "complaint-5", text: "Any goodwill, compensation, or relevant actions are logged." },
        { id: "complaint-6", text: "Complaint reporting date is correct." },
        { id: "complaint-7", text: "Any agreed follow-up or documentation has been actioned." },
      ],
    });

    sections.push({
      title: "Email Checklist",
      subtitle: "Keep emails short and professional.",
      items: [
        { id: "email-1", text: "Use the correct template and greeting." },
        { id: "email-2", text: "Include a short summary of what was discussed." },
        { id: "email-3", text: "Include what happens next and the timeframe." },
        { id: "email-4", text: "Check spelling, grammar, and punctuation." },
        { id: "email-5", text: "Add the case reference, contact details, and opening hours." },
      ],
    });

    return sections;
  }, [firstContact, outcome]);

  const handleGenerateEmail = () => {
    if (outcome === "Contact Made") {
      setEmailSubject(`Complaint update${caseRef ? ` - ${caseRef}` : ""}`);
      setEmailBody(buildContactMadeEmail(customerName, agentName, caseRef));
      return;
    }

    setEmailSubject(`No contact update${caseRef ? ` - ${caseRef}` : ""}`);
    setEmailBody(buildNoContactEmail(agentName));
  };

  const handleBuildNoContactEmail = () => {
    setEmailSubject(`No contact update${caseRef ? ` - ${caseRef}` : ""}`);
    setEmailBody(buildNoContactProcessEmail(agentName, caseRef));
  };

  const handleCopySummary = async () => {
    const summary = [
      `Outcome: ${outcome}`,
      `First contact: ${firstContact}`,
      `Status: ${status}`,
      `Agent: ${agentName || "-"}`,
      `Customer: ${customerName || "-"}`,
      `Case Ref: ${caseRef || "-"}`,
      "",
      `Checked: ${totals.done}/${totals.total}`,
      "",
      "Notes:",
      notes || "-",
      "",
      ...visibleSections.flatMap((section) => [
        section.title,
        ...section.items.map((item) => `${checked[item.id] ? "✅" : "⬜"} ${item.text}`),
        "",
      ]),
    ].join("\n");

    try {
      await navigator.clipboard.writeText(summary);
      alert("Summary copied to clipboard.");
    } catch {
      alert("Copy failed. Please copy the text manually.");
    }
  };

  const handleReset = () => {
    setOutcome("Contact Made");
    setFirstContact("Yes");
    setStatus("Open");
    setAgentName("");
    setCustomerName("");
    setCaseRef("");
    setNotes("");
    setEmailSubject("Complaint update");
    setEmailBody("");
    setChecked({});
  };

  const currentEmailHint =
    outcome === "No Contact"
      ? "No contact selected. Keep the no contact process at the top and use the no contact email template."
      : firstContact === "Yes"
        ? "First contact selected. Show the first-contact checklist and the full call flow."
        : "Repeat contact selected. Show the shortened repeat-contact checklist and the full call flow.";

  return (
    <main className="min-h-screen bg-slate-50 p-4 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-4">
        <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold">QA Call Assistant Demo</h1>
              <p className="mt-1 text-sm text-slate-600">
                A simple live-call checklist demo for before the call, during the call, upset customers, after-call work, complaint updates, and email checks.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm">
              <div className="font-medium">
                {totals.done} / {totals.total} completed
              </div>
              <div className="text-slate-600">{totals.remaining} left</div>
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-5">
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Contact outcome</label>
              <select
                value={outcome}
                onChange={(e) => setOutcome(e.target.value as Outcome)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
              >
                <option>Contact Made</option>
                <option>No Contact</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">First contact?</label>
              <select
                value={firstContact}
                onChange={(e) => setFirstContact(e.target.value as FirstContact)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
              >
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Complaint status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Status)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
              >
                <option>Open</option>
                <option>On Hold</option>
                <option>Resolved</option>
                <option>Closed</option>
              </select>
            </div>
            <input
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              placeholder="Agent name"
              className="rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
            />
            <input
              value={caseRef}
              onChange={(e) => setCaseRef(e.target.value)}
              placeholder="Case reference"
              className="rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>

          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Customer name"
              className="rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
            />
            <div className="rounded-xl bg-slate-100 px-3 py-2 text-sm text-slate-700">
              {currentEmailHint}
            </div>
          </div>

          <div className="mt-3 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-900 ring-1 ring-emerald-200">
            Nothing entered in this tool is saved anywhere. It only uses in-page memory, so refreshing the page clears all data.
          </div>
        </div>

        {outcome === "No Contact" && (
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-amber-950">No Contact Process</h2>
            <p className="mt-1 text-sm text-amber-900">This stays at the top when no contact is made.</p>
            <div className="mt-3 overflow-hidden rounded-2xl border border-amber-200 bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-amber-100 text-amber-950">
                  <tr>
                    <th className="px-3 py-2">Day</th>
                    <th className="px-3 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {noContactProcess.map((row) => (
                    <tr key={row.day} className="border-t border-amber-100">
                      <td className="px-3 py-2 font-medium">{row.day}</td>
                      <td className="px-3 py-2">{row.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 rounded-2xl bg-white p-3 text-sm text-amber-900 ring-1 ring-amber-200">
              Step-by-step: follow the day plan above, update the memo, keep the complaint action accurate, and use the no contact email template rather than the call summary template.
            </div>
          </div>
        )}

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-4">
            {visibleSections.map((section, index) => (
              <details
                key={section.title}
                className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200"
                open={index < 2 || (outcome === "No Contact" && index === 0)}
              >
                <summary className="cursor-pointer list-none text-lg font-semibold">
                  {section.title}
                  <div className="text-sm font-normal text-slate-600">{section.subtitle}</div>
                </summary>
                <div className="mt-4 space-y-3">
                  {section.items.map((item) => (
                    <label
                      key={item.id}
                      className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 px-3 py-2 hover:bg-slate-50"
                    >
                      <input
                        type="checkbox"
                        checked={!!checked[item.id]}
                        onChange={() => toggle(item.id)}
                        className="mt-1 h-4 w-4"
                      />
                      <span className="text-sm leading-6">{item.text}</span>
                    </label>
                  ))}
                </div>
              </details>
            ))}
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-lg font-semibold">Call Notes</h2>
              <p className="mt-1 text-sm text-slate-600">Use this for a short summary, next steps, and anything important to remember.</p>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add short notes here..."
                className="mt-3 min-h-40 w-full rounded-2xl border border-slate-300 p-3 text-sm outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>

            <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Email Draft</h2>
                  <p className="text-sm text-slate-600">Generate the correct email based on the contact outcome.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleGenerateEmail}
                    className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
                  >
                    Generate Email
                  </button>
                  {outcome === "No Contact" && (
                    <button
                      type="button"
                      onClick={handleBuildNoContactEmail}
                      className="rounded-xl bg-slate-200 px-4 py-2 text-sm font-medium text-slate-900"
                    >
                      Build No Contact Email
                    </button>
                  )}
                </div>
              </div>

              <input
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="Email subject"
                className="mt-3 w-full rounded-2xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
              />
              <textarea
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                placeholder="Email body"
                className="mt-3 min-h-60 w-full rounded-2xl border border-slate-300 p-3 text-sm outline-none focus:ring-2 focus:ring-slate-400"
              />
              <p className="mt-2 text-xs text-slate-500">Tip: the email text is editable, so you can keep it short and tailored before sending.</p>
            </div>

            <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-lg font-semibold">What to update after the call</h2>
              <div className="mt-3 grid gap-2 text-sm text-slate-700">
                <div>• Update the complaint memo with a clear summary of what was discussed.</div>
                <div>• Update the complaint status correctly.</div>
                <div>• Add any next contact date or reminder.</div>
                <div>• Log any goodwill, compensation, or agreed actions.</div>
                <div>• Attach or send the follow-up email if required.</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pb-4">
              <button
                type="button"
                onClick={handleCopySummary}
                className="rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white"
              >
                Copy Demo Summary
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-2xl bg-slate-200 px-4 py-2 text-sm font-medium text-slate-900"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
