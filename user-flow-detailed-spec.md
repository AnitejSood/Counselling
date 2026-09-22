# Detailed User Flow Spec : Student Flow & Counsellor Flow

Companion doc to the flow diagram. Each step below covers: what it's for, what's on screen, the rules worth locking in early, and what it connects to.

---

## STUDENT / CUSTOMER FLOW

### 1. Discover & search
**Purpose:** entry point : help someone find a counsellor that actually fits their situation, not just the biggest name.

**On screen:** a search bar up top (destination country, track, budget) sitting over a browsable results grid.
- **Destination:** UK & Ireland, United States, Canada, Australia, New Zealand, Domestic : India
- **Track:** Study abroad admissions, Domestic India admissions, Sports quota admissions, International athletic scholarships
- **Budget:** Under ₹15,000/session, ₹15,000-25,000, ₹25,000+
- **Sort:** Best match (default : verified outcomes + review score), Most reviewed, Price low-high, Fastest response
- **Each result card:** photo, name, track/specialty line, verified-placement count with seal icon, rating + review count, tags, price-from, and a clearly separated "Sponsored" tag where relevant

**Rules & edge cases:**
- If a search returns nothing (e.g. "sports quota + Australia"), don't dead-end : broaden automatically and show closest matches, or offer a "request a specialist" lead-capture form
- Log every search query/filter combo even when it returns few results : that's your signal for which niches need more supply

**Connects to:** feeds step 2 (compare) and step 3 (book) directly.

---

### 2. Compare profiles
**Purpose:** reduce decision paralysis : this is the actual feature nobody else in the market has built.

**On screen:**
- "Add to compare" checkbox on each card (cap at 3), floating compare bar, opens a side-by-side table
- Side-by-side shows: verified placements, rating, price per service, specialties, years of experience, response time, 1-2 sample review snippets
- Full profile page (on click-through): bio, credentials, complete services + pricing list, full review history (filterable by track : a UK-admissions review isn't that useful to someone comparing NCAA counsellors), verified-outcome badge with a "how this is calculated" tooltip, calendar availability preview

**Rules & edge cases:**
- If someone tries to compare counsellors across unrelated tracks (a UK academic counsellor vs. a sports-quota specialist), flag it gently : it's not an apples-to-apples comparison and the UI should say so

**Connects to:** leads into step 3 (book).

---

### 3. Book a session
**Purpose:** convert browsing into a paid, committed relationship.

**On screen:** select a service/package → pick a time slot from the counsellor's live calendar → pay → confirmation + calendar invite.

**Rules & edge cases:**
- Payment should sit in **escrow**, released to the counsellor only after the session is marked complete. This protects students from being ghosted after paying, and protects counsellors from chargebacks : solves it both directions
- If a counsellor cancels or no-shows, auto-refund the student and quietly log it against that counsellor's reliability metric : it should eventually affect ranking even though it's never shown publicly as a "strike"

**Connects to:** the first bridge point : this instantly creates a new entry in the counsellor's dashboard (counsellor step 3).

---

### 4. Complete intake
**Purpose:** give the counsellor real context before the first session, and seed the data that becomes the roadmap.

**On screen : fields:**
- Academic history (transcripts optional upload)
- Target destination(s) and intended intake year
- Budget range
- Test scores, if any
- Extracurriculars / sport (required if on the athletics track)
- Free-text goals and preferences

**Rules & edge cases:**
- Don't hard-block the booking flow if intake is incomplete : that kills conversion. Let the counsellor request specific missing fields before the session instead.

**Connects to:** feeds counsellor step 4 (review intake) directly, and is the seed data for step 5's roadmap/shortlist.

---

### 5. Get roadmap & shortlist
**Purpose:** the tangible deliverable of the "career planning" and "shortlisting" services : this is what the student is actually paying for.

**On screen:**
- A dated milestone timeline (test prep windows, document deadlines, application deadlines, decision dates)
- A shortlist table: 10-12 universities/programs with a fit score, cost, program details, deadline, and current status

**Rules & edge cases:**
- This screen is literally populated by the counsellor's "set milestones" action (counsellor step 5) : it should feel like one shared document, not two separate records that happen to look similar
- Needs versioning: if a test score comes back lower than expected, the roadmap changes : student should see what changed and when, not just a silently updated table

**Connects to:** counsellor step 5 (set milestones) is the write side of this same data.

---

### 6. Work through milestones
**Purpose:** the main working phase : SOP/essay mentorship, test prep tracking, document collection.

**On screen:**
- Checklist or kanban of milestones with due dates and status (not started / in progress / submitted / done)
- File upload per milestone (drafts, transcripts)
- A messaging thread with the counsellor, scoped per milestone (not one giant undifferentiated chat)
- SOP mentorship specifically should track version history through the review cycle (story-mining → structural review → line edit, matching what the current single-counsellor site already does well)

**Rules & edge cases:**
- Missed deadlines should trigger a reminder to *both* student and counsellor : don't let a slipped deadline sit invisible on only one side

**Connects to:** step 7 (progress tracker) is the read-only, zoomed-out version of this same activity.

---

### 7. Track progress
**Purpose:** single source of truth on where every application actually stands, plus visa/logistics once an admit comes in.

**On screen:**
- Per-school status tracker: submitted / under review / interview / admit / waitlist / reject
- Document vault: transcripts, SOPs, recommendation letters, visa documents
- Post-admit: visa and pre-departure checklist

**Rules & edge cases:**
- This is where counsellor step 7 (upload verified proof) shows up as a live update : when a counsellor logs an offer letter, it should appear here automatically, with the student able to acknowledge or flag a discrepancy
- If student and counsellor records disagree on a status, that's worth surfacing as a flag, not silently overwriting one with the other

**Connects to:** the second bridge point, fed by counsellor step 7.

---

### 8. Leave a review
**Purpose:** this is the actual trust engine of the whole platform : worth treating as a core feature, not an afterthought.

**On screen:** a short structured prompt, triggered automatically after a paid session is marked complete : don't wait for it to happen organically.
- Overall rating
- Track-specific tags (e.g. "responsive," "SOP feedback quality," "realistic expectations" : different from what matters in a generic 5-star review)
- Free text
- Optional outcome update (admit/reject), which feeds into the verification pipeline

**Rules & edge cases (the non-negotiable ones):**
- Only students who **booked and paid through the platform** can review : no open submissions. This alone kills most fake-review risk.
- Counsellors get a right-of-reply visible under the review. The platform does **not** remove reviews just because a counsellor asks : decide this policy now, before it becomes a legal dispute later.

---

## COUNSELLOR FLOW

### 1. Apply & get verified
**Purpose:** the entire trust layer starts here : this is the gate, and it's the single most important screen in the whole product.

**On screen : application fields:**
- Credentials/certifications, years of experience
- Past outcomes (self-reported at this stage, spot-checked afterward)
- References or past client contacts (optional but weighted positively)
- A sample of past work : e.g. an SOP review sample

**Verification process:** a human review (automate later once you have volume) checks credentials and spot-checks a sample of claimed past placements.

**Rules & edge cases:**
- Outcomes: approved / rejected / **approved with limited visibility** : new counsellors can go live immediately but start with lower ranking weight until they build a verified track record *on the platform itself*, exactly like the "new to Bonafide" sponsored example in the prototype. This solves the cold-start problem for new counsellors without lying about their track record.
- Rejected applicants should get clear, specific feedback and a path to reapply : not a silent no.

---

### 2. Build profile & pricing
**Purpose:** this becomes their public storefront : Arti's existing page is almost exactly the right template for this screen.

**On screen : fields:** bio, photo, publicly-shown credentials, specialty tags, a services list (each with description, price, and what's included), calendar availability setup, languages spoken.

**Rules & edge cases:**
- Pricing transparency is a platform policy, not optional : no "contact for pricing." This is one of the few things the current single-counsellor site already gets right; keep it.
- If a counsellor changes their price, existing bookings honor the price at time of booking, not the new one.

---

### 3. Receive booking
**Purpose:** the real-time operational trigger that starts the actual relationship.

**On screen:** a dashboard notification plus a new entry in the "active students" list, showing service booked, time, and payment status.

**Rules & edge cases:**
- This has to be a shared calendar system, not two apps trusting each other to stay in sync : otherwise you'll get double-bookings the moment you have any real volume.

**Connects to:** the write side is student step 3 (book a session) : same event, two views.

---

### 4. Review student intake
**Purpose:** prep before the first real session.

**On screen:** read-only view of the student's intake form (academic history, goals, budget, target destination/track) plus any uploaded documents, with a direct way to request missing info from the student.

**Rules & edge cases:**
- If intake is incomplete, it's the counsellor's call whether to proceed with the session anyway or ask for completion first : don't force a hard block here either.

---

### 5. Set milestones
**Purpose:** this is where the actual counselling happens : building the roadmap that shows up live on the student's side.

**On screen:**
- Editable timeline builder (add milestones with due dates)
- Shortlist builder (add universities/programs with fit/cost/deadline notes)
- Templates for common tracks (e.g. "UK UG standard timeline") to save time across many students

**Rules & edge cases:**
- Templates speed up repetitive work but shouldn't become an excuse for copy-paste generic advice : the value proposition is personalization, so nudge for it without blocking on it.

**Connects to:** student step 5 is the read side of this exact data.

---

### 6. Track student pipeline
**Purpose:** the counsellor's actual day-to-day workspace, and the piece that's completely missing from the current single-counsellor prototype : it only ever handled one relationship implicitly.

**On screen:** a table or kanban where rows = students, columns = schools applied to, and each cell = status for that student/school pair. Filterable by student, by deadline urgency, by stage.

**Bulk actions:** mark a milestone complete across multiple students at once, send a deadline reminder to everyone with something due soon.

**Rules & edge cases:**
- A working counsellor might realistically manage 30+ students, each applying to 8-12 schools. Without sorting/prioritization (e.g. "deadline within 7 days" surfaced first), this view becomes unusable at real scale : design for that volume from day one, not for the demo of one student.

---

### 7. Upload verified proof
**Purpose:** the mechanism that makes the word "verified" actually mean something, instead of being marketing copy.

**On screen:** when an outcome is known (admit/reject/waitlist), the counsellor uploads supporting proof : offer letter, admissions-portal screenshot, enrollment confirmation : and marks the outcome type.

**Backend:** proof gets reviewed (manually at first; could semi-automate later, e.g. checking the document against university domain patterns) before it counts toward the counsellor's public verified-outcome stat.

**Rules & edge cases:**
- If a student disputes a logged outcome, or the counsellor and student records disagree, that needs a real resolution flow : same principle as the review-dispute process, decided in advance.

**Connects to:** the second bridge point : this same action pushes the update into student step 7's tracker.

---

### 8. View ratings & analytics
**Purpose:** the counsellor's own performance dashboard, and : deliberately : their ongoing incentive to keep quality high.

**On screen:** overall rating trend, full review list (with right-of-reply), verified-outcome count over time, response-time metric, conversion rate (profile views → bookings), earnings summary.

**Rules & edge cases:**
- If a counsellor buys sponsored placement, show its performance here too, but keep it visually and structurally separate from the organic ranking metrics : counsellors should see the same "sponsored ≠ ranking" distinction that students see, not just have it hidden from them internally.

