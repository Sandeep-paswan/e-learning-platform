import {
  Presentation,
  PresentationFile,
  column,
  row,
  grid,
  layers,
  text,
  shape,
  rule,
  fill,
  fixed,
  hug,
  wrap,
  fr,
} from "@oai/artifact-tool";
import { writeFile } from "node:fs/promises";

const W = 1920;
const H = 1080;
const outDir = "C:/Users/SANDEEP PASWAN/Documents/New project/output";
const scratchDir = "C:/Users/SANDEEP PASWAN/Documents/New project/scratch";

const palette = {
  ink: "#102033",
  muted: "#536273",
  paper: "#F7F4EC",
  mint: "#BFE8D4",
  coral: "#F26B5E",
  blue: "#2563A8",
  plum: "#6F3C8F",
  saffron: "#F2A93B",
  white: "#FFFFFF",
};

const deck = Presentation.create({ slideSize: { width: W, height: H } });

function compose(slide, node) {
  slide.compose(node, { frame: { left: 0, top: 0, width: W, height: H }, baseUnit: 8 });
}

function background(slide, color = palette.paper) {
  compose(
    slide,
    layers({ name: "background", width: fill, height: fill }, [
      shape({ name: "bg-fill", width: fill, height: fill, fill: color }),
    ]),
  );
}

function footer() {
  return text("Online Quiz System | Yash Raj | ENO 20231562", {
    name: "footer",
    width: fill,
    height: hug,
    style: { fontSize: 18, color: palette.muted },
  });
}

function titleSlide() {
  const slide = deck.slides.add();
  background(slide, palette.ink);
  compose(
    slide,
    column(
      { name: "cover-root", width: fill, height: fill, padding: { x: 118, y: 94 }, gap: 36 },
      [
        text("DISSERTATION PRESENTATION", {
          name: "cover-kicker",
          width: fill,
          height: hug,
          style: { fontSize: 28, bold: true, color: palette.mint },
        }),
        text("ONLINE QUIZ SYSTEM", {
          name: "cover-title",
          width: fill,
          height: hug,
          style: { fontSize: 116, bold: true, color: palette.white },
        }),
        rule({ name: "cover-rule", width: fixed(360), stroke: palette.coral, weight: 8 }),
        text("A MERN stack web application for secure digital assessment", {
          name: "cover-subtitle",
          width: wrap(1120),
          height: hug,
          style: { fontSize: 36, color: "#DCEBE4" },
        }),
        text("Presented by: Yash Raj   |   ENO: 20231562", {
          name: "cover-name",
          width: fill,
          height: hug,
          style: { fontSize: 30, bold: true, color: palette.saffron },
        }),
      ],
    ),
  );
}

function standardSlide(title, items, accent = palette.blue) {
  const slide = deck.slides.add();
  background(slide);
  compose(
    slide,
    column(
      { name: "slide-root", width: fill, height: fill, padding: { x: 96, y: 72 }, gap: 42 },
      [
        column({ name: "title-stack", width: fill, height: hug, gap: 18 }, [
          text(title, {
            name: "slide-title",
            width: fill,
            height: hug,
            style: { fontSize: 64, bold: true, color: palette.ink },
          }),
          rule({ name: "title-rule", width: fixed(250), stroke: accent, weight: 6 }),
        ]),
        column(
          { name: "content-list", width: fill, height: hug, gap: 24 },
          items.map((item, index) =>
            row(
              { name: `item-${index + 1}`, width: fill, height: hug, gap: 18, align: "start" },
              [
                shape({
                  name: `dot-${index + 1}`,
                  width: fixed(18),
                  height: fixed(18),
                  fill: accent,
                  borderRadius: "rounded-full",
                }),
                text(item, {
                  name: `item-text-${index + 1}`,
                  width: fill,
                  height: hug,
                  style: { fontSize: 32, color: palette.ink },
                }),
              ],
            ),
          ),
        ),
        footer(),
      ],
    ),
  );
}

function stackSlide() {
  const slide = deck.slides.add();
  background(slide);
  const stack = [
    ["MongoDB", "Stores users, quizzes, questions, responses and results", palette.mint],
    ["Express.js", "Creates REST APIs and handles backend routes", "#FFE3DF"],
    ["React.js", "Builds the student and teacher user interface", "#E5ECFA"],
    ["Node.js", "Runs server-side quiz logic and authentication", "#FFF2D4"],
  ];
  compose(
    slide,
    column(
      { name: "stack-root", width: fill, height: fill, padding: { x: 96, y: 72 }, gap: 36 },
      [
        text("Technology Stack Used", {
          name: "slide-title",
          width: fill,
          height: hug,
          style: { fontSize: 64, bold: true, color: palette.ink },
        }),
        grid(
          { name: "stack-grid", width: fill, height: fixed(620), columns: [fr(1), fr(1)], rows: [fr(1), fr(1)], columnGap: 28, rowGap: 28 },
          stack.map(([name, desc, color], index) =>
            column(
              { name: `stack-${index + 1}`, width: fill, height: fill, gap: 18, padding: 28, background: color, borderRadius: 8 },
              [
                text(name, { name: `stack-name-${index + 1}`, width: fill, height: hug, style: { fontSize: 44, bold: true, color: palette.ink } }),
                text(desc, { name: `stack-desc-${index + 1}`, width: fill, height: hug, style: { fontSize: 28, color: palette.ink } }),
              ],
            ),
          ),
        ),
        text("Supporting tools mentioned in the report include Visual Studio Code, HTML, CSS, JavaScript, JWT and CSV export.", {
          name: "stack-note",
          width: fill,
          height: hug,
          style: { fontSize: 24, color: palette.muted },
        }),
      ],
    ),
  );
}

function architectureSlide() {
  const slide = deck.slides.add();
  background(slide);
  const blocks = [
    ["React Frontend", "Login, dashboard, quiz interface, result pages", palette.blue],
    ["REST API Layer", "Requests, validation, quiz submission, reports", palette.coral],
    ["Node + Express", "Authentication, business logic, scoring", palette.plum],
    ["MongoDB", "Users, quizzes, questions, results", palette.saffron],
  ];
  compose(
    slide,
    column(
      { name: "architecture-root", width: fill, height: fill, padding: { x: 96, y: 72 }, gap: 40 },
      [
        text("System Architecture", {
          name: "slide-title",
          width: fill,
          height: hug,
          style: { fontSize: 64, bold: true, color: palette.ink },
        }),
        grid(
          { name: "architecture-grid", width: fill, height: fixed(580), columns: [fr(1), fr(1), fr(1), fr(1)], columnGap: 26 },
          blocks.map(([name, desc, color], index) =>
            column(
              { name: `arch-${index + 1}`, width: fill, height: fill, gap: 20, padding: 26, background: index % 2 ? "#FFF7E7" : "#EAF7F0", borderRadius: 8 },
              [
                text(`0${index + 1}`, { name: `arch-no-${index + 1}`, width: fill, height: hug, style: { fontSize: 66, bold: true, color } }),
                text(name, { name: `arch-name-${index + 1}`, width: fill, height: hug, style: { fontSize: 34, bold: true, color: palette.ink } }),
                text(desc, { name: `arch-desc-${index + 1}`, width: fill, height: hug, style: { fontSize: 24, color: palette.muted } }),
              ],
            ),
          ),
        ),
        text("The frontend communicates with backend APIs, and the backend stores/retrieves structured records from MongoDB.", {
          name: "architecture-note",
          width: wrap(1320),
          height: hug,
          style: { fontSize: 30, color: palette.ink },
        }),
      ],
    ),
  );
}

function workflowSlide(title, steps, colors) {
  const slide = deck.slides.add();
  background(slide);
  compose(
    slide,
    column(
      { name: "workflow-root", width: fill, height: fill, padding: { x: 96, y: 72 }, gap: 44 },
      [
        text(title, { name: "slide-title", width: fill, height: hug, style: { fontSize: 64, bold: true, color: palette.ink } }),
        grid(
          { name: "workflow-grid", width: fill, height: fixed(600), columns: [fr(1), fr(1), fr(1), fr(1)], columnGap: 24 },
          steps.map(([name, desc], index) =>
            column(
              { name: `flow-${index + 1}`, width: fill, height: fill, gap: 22, padding: 26, background: index % 2 ? "#FFF7E7" : "#EAF7F0", borderRadius: 8 },
              [
                text(`0${index + 1}`, { name: `flow-no-${index + 1}`, width: fill, height: hug, style: { fontSize: 64, bold: true, color: colors[index] } }),
                text(name, { name: `flow-title-${index + 1}`, width: fill, height: hug, style: { fontSize: 34, bold: true, color: palette.ink } }),
                text(desc, { name: `flow-desc-${index + 1}`, width: fill, height: hug, style: { fontSize: 24, color: palette.muted } }),
              ],
            ),
          ),
        ),
        footer(),
      ],
    ),
  );
}

function databaseSlide() {
  const slide = deck.slides.add();
  background(slide);
  const collections = [
    ["Users", "full name, email, password, role"],
    ["Quizzes", "title, code, duration, schedule, creator"],
    ["Questions", "question text, options, correct answer, marks"],
    ["Results", "score, total marks, submitted time, quiz ID"],
  ];
  compose(
    slide,
    column(
      { name: "database-root", width: fill, height: fill, padding: { x: 96, y: 72 }, gap: 38 },
      [
        text("Database Design", { name: "slide-title", width: fill, height: hug, style: { fontSize: 64, bold: true, color: palette.ink } }),
        grid(
          { name: "database-grid", width: fill, height: fixed(600), columns: [fr(1), fr(1)], rows: [fr(1), fr(1)], columnGap: 28, rowGap: 28 },
          collections.map(([name, desc], index) =>
            column(
              { name: `collection-${index + 1}`, width: fill, height: fill, gap: 16, padding: 28, background: [palette.mint, "#FFE3DF", "#E5ECFA", "#FFF2D4"][index], borderRadius: 8 },
              [
                text(name, { name: `collection-name-${index + 1}`, width: fill, height: hug, style: { fontSize: 40, bold: true, color: palette.ink } }),
                text(desc, { name: `collection-desc-${index + 1}`, width: fill, height: hug, style: { fontSize: 28, color: palette.ink } }),
              ],
            ),
          ),
        ),
        text("The structure reduces redundancy and keeps quiz records, questions and results organized.", {
          name: "database-note",
          width: fill,
          height: hug,
          style: { fontSize: 26, color: palette.muted },
        }),
      ],
    ),
  );
}

titleSlide();
standardSlide("Project Overview", [
  "The Online Quiz System is a web-based application for conducting quizzes digitally.",
  "It replaces paper-based tests with automated quiz creation, online attempts and instant evaluation.",
  "The project is designed for teachers, administrators and students in an educational environment.",
], palette.coral);
standardSlide("Problem Statement and Need", [
  "Traditional quiz methods require manual checking, paper handling and delayed result preparation.",
  "Existing systems may lack customization, security controls and easy report management.",
  "A digital platform improves accessibility, accuracy, time efficiency and record maintenance.",
], palette.blue);
standardSlide("Project Objectives", [
  "Develop a secure online quiz system using MERN stack technologies.",
  "Allow teachers to create quizzes, manage questions and download result reports.",
  "Enable students to join quizzes through quiz codes, attempt questions and receive instant results.",
], palette.plum);
stackSlide();
architectureSlide();
standardSlide("User Modules", [
  "Teacher/Admin module: login, dashboard, quiz creation, question management and reports.",
  "Student module: quiz access, instructions, timed quiz attempt, submission and result view.",
  "System module: authentication, validation, scoring, database storage and CSV export.",
], palette.saffron);
workflowSlide(
  "Student Workflow",
  [
    ["Access Quiz", "Student enters the quiz code and required details."],
    ["Read Rules", "Instructions show duration, questions and important guidelines."],
    ["Attempt Quiz", "MCQs appear with timer, navigation and selected option highlight."],
    ["View Result", "Score, percentage, correct answers and submission time are displayed."],
  ],
  [palette.blue, palette.coral, palette.plum, palette.saffron],
);
workflowSlide(
  "Teacher/Admin Workflow",
  [
    ["Secure Login", "Teacher signs in through email, password and JWT token protection."],
    ["Create Quiz", "Title, description, quiz code, duration and schedule are configured."],
    ["Manage Questions", "Questions can be added, edited, deleted or uploaded through CSV."],
    ["Download Reports", "Student performance and quiz reports can be exported as CSV files."],
  ],
  [palette.coral, palette.blue, palette.saffron, palette.plum],
);
databaseSlide();
standardSlide("Security, Validation and Testing", [
  "JWT authentication, protected routes and password security improve access control.",
  "Quiz code verification, required fields, email validation and timer validation reduce errors.",
  "Unit, integration, system and user acceptance testing validate the main workflows.",
], palette.blue);
standardSlide("Conclusion and Future Scope", [
  "The system automates quiz creation, online participation, answer submission, scoring and reports.",
  "It reduces manual effort, minimizes human error and improves transparency in assessment.",
  "Future scope includes cloud deployment, advanced analytics, AI evaluation, mobile app and stronger anti-cheating features.",
], palette.coral);

const pptxBlob = await PresentationFile.exportPptx(deck);
await pptxBlob.save(`${outDir}/online-quiz-system-yash-raj-20231562-12-slides.pptx`);

for (let i = 0; i < deck.slides.count; i += 1) {
  const slide = deck.slides.getItem(i);
  const slideNo = String(i + 1).padStart(2, "0");
  const png = await slide.export({ format: "png", width: W, height: H });
  await writeFile(`${scratchDir}/online-quiz-12-slide-${slideNo}.png`, Buffer.from(await png.arrayBuffer()));
  const layout = await slide.export({ format: "layout" });
  await writeFile(`${scratchDir}/online-quiz-12-slide-${slideNo}.layout.json`, Buffer.from(await layout.arrayBuffer()));
}

console.log("Exported English 12-slide Online Quiz System deck from PDF content.");
