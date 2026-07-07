import { LegalShell } from './_shared'

export function Privacy() {
  return (
    <LegalShell title="Privacy" updated="this year">
      <p><strong>Your reading stays with you.</strong> Bhagyalikhon is built to work quietly on your own device. The palm photo you upload, your name, your date of birth, and any readings generated are held in your browser — not sent to a server — for as long as you keep them.</p>
      <p><strong>Your palm image.</strong> Any photo you provide is used only to display your framed palm and to overlay illustrative lines while you read. It is stored locally in your browser and never uploaded. Clearing your browser data, or using the controls in Preferences, removes it.</p>
      <p><strong>Local storage.</strong> To let you return to a reading, we keep your draft details, saved readings, and preferences in your browser's local storage. You can clear these at any time from the Preferences page, or by clearing site data in your browser.</p>
      <p><strong>No tracking, no selling.</strong> There is no advertising profile here and nothing about you is sold. If a hosted version is offered in future that stores data online, it will ask for your clear, explicit consent first and explain exactly what is kept.</p>
      <p><strong>Children.</strong> This is a reflective, cultural experience intended for adults. Please do not upload images of children.</p>
      <p>Questions about privacy are welcome. This page is written to be transparent rather than legalistic — if anything is unclear, treat the simplest, most protective reading of it as our intent.</p>
    </LegalShell>
  )
}

export function Terms() {
  return (
    <LegalShell title="Terms & Gentle Disclaimer" updated="this year">
      <p><strong>What this is.</strong> Bhagyalikhon offers palm reading and numerology as a reflective, cultural, and traditional experience — a thoughtful mirror for self-understanding, drawn from long-standing symbolic practices.</p>
      <p><strong>What this is not.</strong> The readings are for reflection, cultural tradition, self-understanding, and entertainment. They are <em>not</em> medical, financial, legal, psychological, or otherwise professional advice, and must not be used as a substitute for it. Palmistry and numerology are not claimed to be scientifically proven.</p>
      <p><strong>No guarantees about the future.</strong> Nothing here predicts specific events, dates, wealth, health, relationships, or outcomes. The language is deliberately reflective — “this may suggest”, “this traditionally points toward” — because your choices, not your lines or numbers, write your life.</p>
      <p><strong>Use with care.</strong> If you are facing a medical, legal, financial, or emotional decision, please consult a qualified professional. Treat any reading here as a starting point for thought, never as a directive.</p>
      <p><strong>Acceptance.</strong> By using Bhagyalikhon you understand and accept that the readings are symbolic and traditional in nature, offered warmly and in good faith, and that responsibility for how you interpret and act on them remains your own.</p>
    </LegalShell>
  )
}
