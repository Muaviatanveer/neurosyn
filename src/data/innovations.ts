export interface ProjectLifecycleStep {
  step: string;
  name: string;
  description: string;
  components: string[];
}

export interface ResearchProject {
  id: string;
  name: string;
  title: string;
  category: "Cognitive Systems" | "Autonomous Engineering" | "Verification & Safety" | "Language & Tooling";
  categoryKey: "cognitive" | "autonomous" | "verification" | "language";
  badge: string;
  shortDescription: string;
  fullOverview: string;
  sourceFiles: string[];
  techStack: string[];
  verifiedAttributes: { label: string; value: string }[];
  architectureDiagramType: "flowchart" | "sequence" | "pipeline";
  architectureNodes: { from: string; to: string; label?: string }[];
  lifecycleSteps: ProjectLifecycleStep[];
  codeOrTraceExample?: {
    language: string;
    caption: string;
    code: string;
  };
  externalLinks?: { label: string; href: string }[];
}

export const researchCategories = [
  {
    key: "cognitive",
    label: "Cognitive Systems",
    description: "Apex multi-model orchestrators, iterative cognitive reactors, and high-dimensional intent vectorizers.",
  },
  {
    key: "autonomous",
    label: "Autonomous Engineering",
    description: "Hypothesis-driven open research and human-in-the-loop automated software development pipelines.",
  },
  {
    key: "verification",
    label: "Verification & Safety",
    description: "Formal logic sandboxes, AST security checkers, and multi-agent adversarial consensus panels.",
  },
  {
    key: "language",
    label: "Language & Tooling",
    description: "Full-stack compiled programming languages, reactive UI runtimes, and zero-config deployment.",
  },
] as const;

export const researchProjects: ResearchProject[] = [
  {
    id: "mamba",
    name: "Mamba",
    title: "Mamba Programming Language & Cloud Ecosystem",
    category: "Language & Tooling",
    categoryKey: "language",
    badge: "v0.4.0 Release · C++20 Transpiler",
    shortDescription:
      "A full-stack, multi-target programming language transpiling single .mb source files into standalone ~80 KB native C++20 machine binaries embedding reactive UI, AI agents, and POSIX/SQLite servers.",
    fullOverview:
      "Mamba unifies modern fragmented web engineering into a single source language. Developed by Muavia Tanveer, Mamba takes declarative reactive UI, stateful business logic, embedded AI agents, and high-performance backend routing in one file, parses via a Lark LALR AST parser, transpiles directly to clean C++20, and compiles via clang++ -O3 into a standalone machine binary requiring zero Node.js or web server runtime dependencies.",
    sourceFiles: [
      "Documents/Mamba/README.md",
      "Documents/Mamba/mamba.toml",
      "Documents/Mamba/compiler/transpiler_cpp.py",
      "Documents/Mamba/examples/fullstack_showcase.mb",
    ],
    techStack: ["C++20", "Lark LALR Parser", "Clang++ -O3", "POSIX Sockets", "SQLite3", "Signal Reactivity"],
    verifiedAttributes: [
      { label: "Compiler Target", value: "Native C++20 Executable (~80 KB)" },
      { label: "Frontend Engine", value: "Signal-based Reactive UI (No Virtual DOM)" },
      { label: "Embedded Server", value: "Multi-threaded POSIX Socket HTTP Engine" },
      { label: "AI Integration", value: "First-Class 'agent' Declarations & Auto REST" },
      { label: "PaaS Engine", value: "Zero-Config Bare Git Auto-Deploy (mambacloud.app)" },
    ],
    architectureDiagramType: "pipeline",
    architectureNodes: [
      { from: "Mamba Source (.mb)", to: "Preprocessor (import resolution)" },
      { from: "Preprocessor (import resolution)", to: "Lark LALR Parser (AST)" },
      { from: "Lark LALR Parser (AST)", to: "Reactive UI Transpiler (Signals)" },
      { from: "Lark LALR Parser (AST)", to: "C++20 Backend Transpiler" },
      { from: "Reactive UI Transpiler (Signals)", to: "Embedded C++ Binary Bundle" },
      { from: "C++20 Backend Transpiler", to: "Embedded C++ Binary Bundle" },
      { from: "Embedded C++ Binary Bundle", to: "clang++ -O3 Machine Executable" },
      { from: "clang++ -O3 Machine Executable", to: "mambacloud.app Gateway / Reverse Proxy" },
    ],
    lifecycleSteps: [
      {
        step: "01",
        name: "Source AST Parsing",
        description: "The Lark LALR parser tokenizes `.mb` syntax, validating state signals, component hierarchies, and agent declarations into a unified AST.",
        components: ["Lark Parser", "Grammar Grammar.lark", "AST Builder"],
      },
      {
        step: "02",
        name: "Dual Engine Transpilation",
        description: "Separates declarative UI syntax into an atomic signal bundle while mapping server logic to native C++20 multithreaded handlers.",
        components: ["transpiler_cpp.py", "UI Bundle Generator", "Route Generator"],
      },
      {
        step: "03",
        name: "Standalone Binary Compilation",
        description: "Invokes `clang++ -O3` to compile the generated C++ source with embedded POSIX sockets and SQLite driver into an isolated executable.",
        components: ["clang++", "POSIX Socket Library", "SQLite3 Static Lib"],
      },
      {
        step: "04",
        name: "Zero-Dependency Serving / Deploy",
        description: "Launches the standalone server on a configured port, or pushes via bare Git hooks to mambacloud.app reverse proxy.",
        components: ["mamba dev", "mamba deploy", "mambacloud.app Router"],
      },
    ],
    codeOrTraceExample: {
      language: "mamba",
      caption: "Real Mamba source code (examples/fullstack_showcase.mb)",
      code: `state counter = 0
state app_status = "Mamba Active"

agent Copilot {
    model "gpt-4o-mini"
    instructions "You are Copilot, a high-performance AI assistant for Mamba developers."
    tool web
}

component MetricCard {
    prop title
    card {
        badge "SYSTEM METRIC"
        heading title
        text "Live real-time signal monitor"
    }
}

ui App {
    column {
        card {
            heading "Full-stack reactive web applications compiled directly to native C++."
        }
        grid {
            render MetricCard "Active Signals"
            render MetricCard "C++ Worker Threads"
        }
        card {
            heading "Fine-Grained Reactive State"
            row {
                button "⚡ Increment Count (+1)" {
                    counter = counter + 1
                }
            }
        }
    }
}`,
    },
    externalLinks: [
      { label: "GitHub Repository", href: "https://github.com/Muaviatanveer/Mamba" },
      { label: "Mamba Cloud Gateway", href: "https://mambacloud.app" },
    ],
  },
  {
    id: "synapsefabric",
    name: "SynapseFabric",
    title: "Apex Multi-Strategy Cognitive Router",
    category: "Cognitive Systems",
    categoryKey: "cognitive",
    badge: "Apex Router · Multi-LLM Client Mesh",
    shortDescription:
      "The apex cognitive routing fabric that evaluates prompt intent vectors and dynamically steers workloads through 4 specialized reasoning regimes (Fast Path, Apeiron DAG, Hybrid PRA, and Metacognitive Forging).",
    fullOverview:
      "SynapseFabric acts as the central intelligence orchestrator in NeuroSyn. Rather than routing all user requests through a single prompt template, it injects an active client mesh (OpenAI, Anthropic, Google Generative AI, and DeepSeek) and employs EmotionEngine++ to produce high-dimensional intent vectors. Depending on task urgency, complexity, and ethical boundaries, SynapseFabric directs execution through one of four specialized cognitive strategies.",
    sourceFiles: [
      "Documents/Duplicate/backend/src/services/synapseFabric.js",
      "Documents/Duplicate/NeuroSyn_Full_Documentation.md",
    ],
    techStack: ["Node.js ES Modules", "OpenAI API", "Anthropic Claude SDK", "DeepSeek Chat", "Google Generative AI"],
    verifiedAttributes: [
      { label: "Strategy 1: FAST_PATH", value: "Low latency triage using AnalyticalThinker (Fast fallback)" },
      { label: "Strategy 2: DEEP_CYCLE", value: "Apeiron Directed Acyclic Graph (DAG) for multi-step synthesis" },
      { label: "Strategy 3: HYBRID_PRA", value: "Parallel Realities Architecture with cosine similarity pruning" },
      { label: "Strategy 4: METACOGNITIVE", value: "Blueprint design for grand-challenge problem spaces" },
      { label: "Synthesis Engine", value: "SynthesizerBoss chunked output streaming" },
    ],
    architectureDiagramType: "flowchart",
    architectureNodes: [
      { from: "User Prompt", to: "Sanity Governor Check" },
      { from: "Sanity Governor Check", to: "EmotionEngine++ (Intent Extraction)" },
      { from: "EmotionEngine++ (Intent Extraction)", to: "Strategy Selector" },
      { from: "Strategy Selector", to: "FAST_PATH (AnalyticalThinker)", label: "Default" },
      { from: "Strategy Selector", to: "Apeiron DAG (DEEP_CYCLE)", label: "Knowledge Synthesis" },
      { from: "Strategy Selector", to: "Hybrid PRA", label: "Urgency > 0.8 / Ethics" },
      { from: "Strategy Selector", to: "Metacognitive Forging", label: "Grand Challenge" },
      { from: "FAST_PATH (AnalyticalThinker)", to: "Hybrid PRA", label: "On Filter Escalation" },
      { from: "Apeiron DAG (DEEP_CYCLE)", to: "SynthesizerBoss" },
      { from: "Hybrid PRA", to: "SynthesizerBoss" },
      { from: "Metacognitive Forging", to: "SynthesizerBoss" },
      { from: "SynthesizerBoss", to: "MemoryIntegrator (Cognitive Trace)" },
    ],
    lifecycleSteps: [
      {
        step: "01",
        name: "Triage & Intent Profiling",
        description: "SynapseFabric registers incoming request context, queries EmotionEngine++ for 5-axis dimensional scores, urgency, and ethical markers.",
        components: ["EmotionEnginePlusPlus", "BaseAgent", "SanityGovernor"],
      },
      {
        step: "02",
        name: "Dynamic Strategy Dispatch",
        description: "Evaluates keyword indicators (e.g. 'design a novel framework') and intent vectors to select between FAST_PATH, DEEP_CYCLE, PRA, or METACOGNITIVE_FORGING.",
        components: ["SynapseFabric.CONFIG", "StrategyEvaluator"],
      },
      {
        step: "03",
        name: "Parallel Agent Mesh Execution",
        description: "Engages registered specialized agents (AnalyticalThinker, CreativeThinker, HaystackResearcher on DeepSeek) concurrently.",
        components: ["AgentRegistry", "CognitiveMesh", "HaystackResearcher"],
      },
      {
        step: "04",
        name: "Verification & Synthesis",
        description: "Passes generated candidate thoughts through MultiCriticPanel and QuantumVerifier before final document assembly by SynthesizerBoss.",
        components: ["MultiCriticPanel", "QuantumVerifier", "SynthesizerBoss"],
      },
    ],
    codeOrTraceExample: {
      language: "javascript",
      caption: "Strategy routing logic from backend/src/services/synapseFabric.js",
      code: `_selectStrategy(intentVector) {
    const { urgency = 0, ethical_considerations = [], task_type = 'Ambiguous', prompt = '' } = intentVector;
    const grandChallengeKeywords = ['devise a new', 'design a novel framework', 'solve the problem of', 'create a new model for'];
    
    if (grandChallengeKeywords.some(kw => prompt.toLowerCase().includes(kw))) {
        return SynapseFabric.CONFIG.STRATEGY_METACOGNITIVE_FORGING;
    }
    if (urgency > 0.8 || (ethical_considerations && ethical_considerations.length > 0)) {
        return SynapseFabric.CONFIG.STRATEGY_PRA;
    }
    if (task_type === 'Knowledge_Synthesis') {
        return SynapseFabric.CONFIG.STRATEGY_DEEP_CYCLE;
    }
    return SynapseFabric.CONFIG.STRATEGY_FAST_PATH;
}`,
    },
  },
  {
    id: "quantix",
    name: "Quantix",
    title: "Iterative Cognitive Reactor & Problem Solver",
    category: "Cognitive Systems",
    categoryKey: "cognitive",
    badge: "Cognitive Reactor · Multi-Attempt Feedback Loop",
    shortDescription:
      "A formal problem-solving reactor that combines DAG-driven task construction, multi-model mesh execution (GPT-4o & DeepSeek), and strict multi-critic consensus gating with reflective episodic memory.",
    fullOverview:
      "Quantix operates as a stateful, iterative cognitive reactor (`CognitiveReactor`). When given a complex problem, it executes up to 3 structured solving attempts. For each cycle, ProblemParser categorizes the challenge, NeuroPlanner establishes an execution DAG, CognitiveMesh coordinates multi-agent thought generation, and MultiCriticPanel issues an ACCEPT or REJECT verdict. On success, insights are permanently integrated into episodic memory via CognitiveMirror.",
    sourceFiles: [
      "Documents/Duplicate/backend/src/quantix/orchestrator.js",
      "Documents/Duplicate/backend/src/quantix/perception/problemParser.js",
      "Documents/Duplicate/backend/src/quantix/critics/multiCriticPanel.js",
      "Documents/Duplicate/backend/src/quantix/memory/episodicMemory.js",
    ],
    techStack: ["Node.js", "GPT-4o", "DeepSeek", "Lowdb", "Directed Acyclic Task Graphs"],
    verifiedAttributes: [
      { label: "Cycle Bound", value: "Configurable max 3 iterative attempts per problem" },
      { label: "Working Memory", value: "Isolates percepts, task graphs, and thoughts per cycle" },
      { label: "Consensus Gating", value: "MultiCriticPanel ACCEPT requirement prior to synthesis" },
      { label: "Episodic Reflection", value: "CognitiveMirror reflects post-execution traces to Lowdb storage" },
      { label: "Task Construction", value: "Topological task graph execution via CognitiveMesh" },
    ],
    architectureDiagramType: "sequence",
    architectureNodes: [
      { from: "User / Request", to: "Quantix (CognitiveReactor)" },
      { from: "Quantix (CognitiveReactor)", to: "ProblemParser (Perception)" },
      { from: "ProblemParser (Perception)", to: "NeuroPlanner (DAG Plan)" },
      { from: "NeuroPlanner (DAG Plan)", to: "TaskConstructor (Graph)" },
      { from: "TaskConstructor (Graph)", to: "CognitiveMesh (Thought Generation)" },
      { from: "CognitiveMesh (Thought Generation)", to: "MultiCriticPanel (Batch Evaluation)" },
      { from: "MultiCriticPanel (Batch Evaluation)", to: "Synthesizer (On ACCEPT)", label: "ACCEPT" },
      { from: "MultiCriticPanel (Batch Evaluation)", to: "NeuroPlanner (Feedback Retry)", label: "REJECT" },
      { from: "Synthesizer (On ACCEPT)", to: "CognitiveMirror & EpisodicMemory" },
    ],
    lifecycleSteps: [
      {
        step: "01",
        name: "Perception & Parsing",
        description: "ProblemParser ingests raw unstructured problem prompts and extracts entities, constraints, and verifiable deliverables.",
        components: ["ProblemParser", "WorkingMemory"],
      },
      {
        step: "02",
        name: "NeuroPlanning & Task Graphing",
        description: "NeuroPlanner generates an actionable plan, which TaskConstructor transforms into an executable dependency graph.",
        components: ["NeuroPlanner", "TaskConstructor"],
      },
      {
        step: "03",
        name: "Cognitive Mesh Execution",
        description: "Executes nodes across heterogeneous reasoning agents (AnalyticalThinker on GPT-4o, DeepSeek fallback) collecting thoughts.",
        components: ["CognitiveMesh", "AnalyticalThinker"],
      },
      {
        step: "04",
        name: "Critique Gating & Memory Reflection",
        description: "MultiCriticPanel audits generated thoughts in batches. If approved, Synthesizer emits the solution and CognitiveMirror records insights.",
        components: ["MultiCriticPanel", "Synthesizer", "CognitiveMirror", "EpisodicMemory"],
      },
    ],
    codeOrTraceExample: {
      language: "javascript",
      caption: "CognitiveReactor loop from backend/src/quantix/orchestrator.js",
      code: `for (let attempt = 1; attempt <= this.maxAttempts; attempt++) {
    memory.startNewAttempt();
    memory.set('attemptNumber', attempt);

    const percepts = await this.perception.parse(rawProblem);
    const plan = await this.planner.plan(percepts, lastCritiqueFeedback);
    const taskGraph = await this.taskConstructor.construct(plan);
    const thoughts = await this.cognitiveMesh.executeTaskGraph(taskGraph);
    const critique = await this.critic.evaluate(thoughts, percepts);

    if (critique.isAccepted) {
        const solution = await this.synthesizer.synthesize(thoughts, percepts);
        await this.mirror.reflect(memory);
        return { success: true, solution, attempts: attempt };
    }
    lastCritiqueFeedback = critique.feedback;
}`,
    },
  },
  {
    id: "nuclear-x",
    name: "Nuclear X",
    title: "Autonomous Software Engineering & SDLC Orchestrator",
    category: "Autonomous Engineering",
    categoryKey: "autonomous",
    badge: "SDLC Orchestrator · Human-in-the-Loop Safe Mode",
    shortDescription:
      "An automated software development lifecycle engine that translates high-level engineering directives into verified multi-file codebases through AST simulations and human-in-the-loop approval gates.",
    fullOverview:
      "Nuclear X is an autonomous engineering engine that manages the complete lifecycle of automated software features. Operating under a strict 4-state finite state machine (IDLE, SIMULATING, PENDING_APPROVAL, EXECUTING), it uses FeatureIdeationAgent to plan multi-file AST diffs, presents the complete simulation for cryptographic or human approval, and delegates to FeatureImplementationAgent for filesystem writes.",
    sourceFiles: [
      "Documents/Duplicate/nuclear.md",
      "Documents/Duplicate/backend/src/nuclearControl/Orchestrator.js",
      "Documents/Duplicate/backend/src/nuclearControl/stateManager.js",
    ],
    techStack: ["Node.js", "AST Analysis", "UUID Sessioning", "Safe Mode RBAC", "Git/File Operations"],
    verifiedAttributes: [
      { label: "FSM States", value: "IDLE → SIMULATING → PENDING_APPROVAL → EXECUTING" },
      { label: "Approval Protocol", value: "Mandatory human-in-the-loop sign-off before filesystem writes" },
      { label: "Ideation Agent", value: "Decomposes high-level goals into multi-file create/modify plan arrays" },
      { label: "Implementation Agent", value: "Executes file read, AST mutation, and atomic filesystem commits" },
      { label: "Safe Mode Gate", value: "Guarantees read-only simulation unless developer authorization is active" },
    ],
    architectureDiagramType: "flowchart",
    architectureNodes: [
      { from: "High-Level Goal", to: "Orchestrator.initiateSimulation()" },
      { from: "Orchestrator.initiateSimulation()", to: "State: SIMULATING" },
      { from: "State: SIMULATING", to: "FeatureIdeationAgent (Plan Generation)" },
      { from: "FeatureIdeationAgent (Plan Generation)", to: "State: PENDING_APPROVAL" },
      { from: "State: PENDING_APPROVAL", to: "Human / Developer Review" },
      { from: "Human / Developer Review", to: "approveAndExecute(simulationId)", label: "Approved" },
      { from: "Human / Developer Review", to: "State: IDLE (Aborted)", label: "Rejected" },
      { from: "approveAndExecute(simulationId)", to: "State: EXECUTING" },
      { from: "State: EXECUTING", to: "FeatureImplementationAgent (File Diffs)" },
      { from: "FeatureImplementationAgent (File Diffs)", to: "Filesystem Commit & Return IDLE" },
    ],
    lifecycleSteps: [
      {
        step: "01",
        name: "Simulation Initiation",
        description: "Ingests the engineering feature goal, assigns a unique simulation UUID, verifies Safe Mode flags, and locks orchestrator state to SIMULATING.",
        components: ["Orchestrator", "stateManager", "UUID"],
      },
      {
        step: "02",
        name: "Feature Ideation & File Plan",
        description: "FeatureIdeationAgent interacts with cognitive services to generate an ordered JSON plan specifying target files to create or modify.",
        components: ["FeatureIdeationAgent", "SynapseFabric"],
      },
      {
        step: "03",
        name: "Pending Approval Gate",
        description: "Halts automatic progression. Exposes the simulation plan and diff breakdown via API / Control Panel, awaiting authorized human confirmation.",
        components: ["NuclearControlPanel", "controller.js"],
      },
      {
        step: "04",
        name: "Atomic Code Implementation",
        description: "FeatureImplementationAgent reads existing source files, applies generated code mutations, and commits files to disk with error rollback.",
        components: ["FeatureImplementationAgent", "fs-extra", "applyFileOperations"],
      },
    ],
    codeOrTraceExample: {
      language: "javascript",
      caption: "FSM definition from backend/src/nuclearControl/Orchestrator.js",
      code: `const OrchestratorState = {
  IDLE: 'IDLE',
  SIMULATING: 'SIMULATING',
  PENDING_APPROVAL: 'PENDING_APPROVAL',
  EXECUTING: 'EXECUTING',
};

class Orchestrator {
  async initiateSimulation(goal) {
    if (this.state !== OrchestratorState.IDLE) {
      throw new Error(\`Orchestrator is currently in state: \${this.state}\`);
    }
    this.state = OrchestratorState.SIMULATING;
    const simulationId = uuidv4();
    const plan = await this.ideationAgent.createPlan(goal);
    this.pendingSimulation = { simulationId, plan };
    this.state = OrchestratorState.PENDING_APPROVAL;
    return { simulationId, plan };
  }
}`,
    },
  },
  {
    id: "adre",
    name: "ADRE",
    title: "Autonomous Dynamic Reasoning Engine",
    category: "Autonomous Engineering",
    categoryKey: "autonomous",
    badge: "Deep Research · Hypothesis-Driven Workspaces",
    shortDescription:
      "A hypothesis-driven exploration engine designed for open-ended grand challenges, orchestrating parallel workspace managers, multi-tool search integrations, and confidence-driven pruning.",
    fullOverview:
      "ADRE (Autonomous Dynamic Reasoning Engine) was built to solve deeply complex, multi-domain research challenges (such as designing multimodal transit networks or policy systems). Rather than relying on simple linear retrieval, ADRE drives an 8-stage lifecycle: semantic definition via WorldModel, generation of competing strategic hypotheses in isolated workspaces, multi-tool empirical exploration, and continuous GlobalCritic pruning.",
    sourceFiles: [
      "Documents/Duplicate/adre.js",
      "Documents/Duplicate/NeuroSyn_Full_Documentation.md",
    ],
    techStack: ["Node.js", "Tavily Search API", "Arxiv Search", "Code Execution Sandbox", "WorldModel"],
    verifiedAttributes: [
      { label: "8-Stage Pipeline", value: "INGEST → GROK_DEFINE → HYPOTHESIZE → EXPLORE → CRITIQUE → CONVERGENCE → SYNTHESIZE → LEARN" },
      { label: "Parallel Workspaces", value: "Initializes isolated workspaces with dynamic confidence scoring" },
      { label: "Tool Suite", value: "Executes live WebSearch (Tavily), Arxiv academic retrieval, and code execution" },
      { label: "Pruning Mechanism", value: "GlobalCritic eliminates low-confidence branches across exploration cycles" },
      { label: "Reflection Loop", value: "CognitiveMirror reflects execution trace to MemoryService" },
    ],
    architectureDiagramType: "flowchart",
    architectureNodes: [
      { from: "Complex Research Query", to: "Stage 1: INGEST" },
      { from: "Stage 1: INGEST", to: "Stage 2: GROK_DEFINE (WorldModel Search)" },
      { from: "Stage 2: GROK_DEFINE (WorldModel Search)", to: "Stage 3: HYPOTHESIZE (HypothesisGenerator)" },
      { from: "Stage 3: HYPOTHESIZE (HypothesisGenerator)", to: "WorkspaceManager (4 Parallel Workspaces)" },
      { from: "WorkspaceManager (4 Parallel Workspaces)", to: "Stage 4: EXPLORE (TaskDecomposer)" },
      { from: "Stage 4: EXPLORE (TaskDecomposer)", to: "ToolExecutor (Tavily WebSearch, Arxiv)" },
      { from: "ToolExecutor (Tavily WebSearch, Arxiv)", to: "Stage 5: CRITIQUE (GlobalCritic Pruning)" },
      { from: "Stage 5: CRITIQUE (GlobalCritic Pruning)", to: "Stage 6: CONVERGENCE" },
      { from: "Stage 6: CONVERGENCE", to: "Stage 7: SYNTHESIZE (FinalSynthesizer)" },
      { from: "Stage 7: SYNTHESIZE (FinalSynthesizer)", to: "Stage 8: LEARN (CognitiveMirror Reflection)" },
    ],
    lifecycleSteps: [
      {
        step: "01",
        name: "Ingest & WorldModel Definition",
        description: "Normalizes the research prompt and performs semantic search over the internal WorldModel to extract foundational constraints and domains.",
        components: ["WorldModel", "EntityExtractor", "ProblemDefiner"],
      },
      {
        step: "02",
        name: "Hypothesis Workspace Generation",
        description: "HypothesisGenerator synthesizes 4 distinct strategic angles. WorkspaceManager provisions dedicated memory contexts with initial confidence scores.",
        components: ["HypothesisGenerator", "WorkspaceManager"],
      },
      {
        step: "03",
        name: "Multi-Tool Exploration Cycles",
        description: "TaskDecomposer divides hypotheses into research steps, executing live Tavily WebSearch, academic citations, and local code verification.",
        components: ["TaskDecomposer", "ToolExecutor", "WebSearchTool"],
      },
      {
        step: "04",
        name: "Global Critique & Convergence",
        description: "GlobalCritic audits all workspaces, updating confidence scores and pruning underperforming paths until a winning hypothesis converges for synthesis.",
        components: ["GlobalCritic", "FinalSynthesizer", "CognitiveMirror"],
      },
    ],
    codeOrTraceExample: {
      language: "log",
      caption: "Real execution trace excerpt from adre.js",
      code: `[INFO] - [ADRE|INGEST] complete { core_question: "Design an equitable Smart Transit system..." }
[INFO] - [ADRE|GROK_DEFINE] WorldModel: Performing semantic search for transit ridership...
[INFO] - [ADRE|HypothesisGenerator] Successfully generated 4 hypotheses.
[INFO] - [ADRE|WorkspaceManager] Initialized 4 workspaces.
[INFO] - [ADRE|EXPLORE] start_cycle_1 { active_hypotheses: 4 }
[DEBUG] - [ADRE|WorkspaceManager] Updated workspace 3691e182. New status: active, New confidence: 0.75
[INFO] - [ADRE|TaskDecomposer] Decomposed step into 6 tasks.
[INFO] - [ADRE|ToolExecutor] Executing tool: WebSearch (Tavily query: "Mobility-as-a-Service solution")
[INFO] - [WebSearchTool] Retrieved 5 results from Tavily.
[INFO] - [ADRE|CRITIQUE] GlobalCritic reviewing workspaces...`,
    },
  },
  {
    id: "thirdeye",
    name: "ThirdEye",
    title: "Data-Fused Predictive Foresight & Intelligence Pipeline",
    category: "Cognitive Systems",
    categoryKey: "cognitive",
    badge: "Predictive Intelligence · State Machine Driven",
    shortDescription:
      "A state-machine-driven predictive analysis pipeline that aggregates multi-source data fusion, cognitive simulation, and automated certainty scoring into board-level foresight reports.",
    fullOverview:
      "ThirdEye was engineered to transform noisy market, operational, or threat signals into defensible foresight reports. Managed via a MongoDB PredictionReport state machine (queued → gathering_data → analyzing → finalizing), ThirdEye invokes dedicated scenario priming, data fusion, and meta-evaluator services. If analytical certainty falls below 0.60, it automatically mandates prominent low-confidence disclosures.",
    sourceFiles: [
      "Documents/Duplicate/backend/src/thirdEye/thirdeye.orchestrator.js",
      "Documents/Duplicate/backend/src/thirdEye/models/PredictionReport.model.js",
      "Documents/Duplicate/NeuroSyn_Full_Documentation.md",
    ],
    techStack: ["Node.js", "MongoDB", "Data Fusion Engine", "Simulation Service", "MetaEvaluator"],
    verifiedAttributes: [
      { label: "State Progression", value: "queued → initializing → gathering_data → analyzing → finalizing" },
      { label: "Data Fusion", value: "Aggregates disparate unstructured data points via dataFusionService" },
      { label: "Certainty Threshold", value: "Evaluated by metaEvaluatorService (Threshold: 0.60)" },
      { label: "Safety Enforcement", value: "Injects mandatory Low Confidence Warning when certainty < 0.60" },
      { label: "Action Engine", value: "Integrates downstream action recommendations upon synthesis" },
    ],
    architectureDiagramType: "pipeline",
    architectureNodes: [
      { from: "Prediction Mission Ingest", to: "ScenarioPrimer & IntentParser" },
      { from: "ScenarioPrimer & IntentParser", to: "dataFusionService (Data Gathering)" },
      { from: "dataFusionService (Data Gathering)", to: "cognitiveMeshService & simulationEngine" },
      { from: "cognitiveMeshService & simulationEngine", to: "governanceService & ethicsService" },
      { from: "governanceService & ethicsService", to: "metaEvaluatorService (Certainty Check)" },
      { from: "metaEvaluatorService (Certainty Check)", to: "Certainty >= 0.60 Gate" },
      { from: "Certainty >= 0.60 Gate", to: "synthesisService (Board Report)", label: "Passed" },
      { from: "Certainty >= 0.60 Gate", to: "Deepening Analysis (Max 2)", label: "Below 0.60" },
      { from: "synthesisService (Board Report)", to: "ActionEngine Recommendations" },
    ],
    lifecycleSteps: [
      {
        step: "01",
        name: "Scenario Priming & Intent Parsing",
        description: "ScenarioPrimer primes the strategic operational environment while IntentParser extracts core risk drivers and reporting requirements.",
        components: ["0_scenarioPrimer.service.js", "1_intentParser.service.js"],
      },
      {
        step: "02",
        name: "Data Fusion Aggregation",
        description: "dataFusionService queries and fuses disparate signals into a unified operational context.",
        components: ["2_dataFusion.service.js"],
      },
      {
        step: "03",
        name: "Simulation & Governance Audit",
        description: "Executes scenario simulations, running parallel governance and ethical boundary checks across candidate analytical projections.",
        components: ["4_simulationEngine.service.js", "8_governance.service.js", "10_ethics.service.js"],
      },
      {
        step: "04",
        name: "Certainty Scoring & Synthesis",
        description: "metaEvaluatorService computes mathematical certainty. If < 0.60, a prominent warning is injected before synthesisService renders the report.",
        components: ["5_metaEvaluator.service.js", "6_synthesis.service.js", "9_action.service.js"],
      },
    ],
    codeOrTraceExample: {
      language: "javascript",
      caption: "Certainty threshold check from backend/src/thirdEye/thirdeye.orchestrator.js",
      code: `const LOW_CONFIDENCE_THRESHOLD = 0.6;

const prepareSynthesizerInput = (report) => {
    const certainty = report.evaluatedAnalysis?.metrics?.certainty ?? 1.0;

    if (certainty < LOW_CONFIDENCE_THRESHOLD) {
        const warningInstruction = \`
CRITICAL INSTRUCTION: The underlying analysis for this report yielded a low certainty score of \${certainty.toFixed(2)}.
You MUST begin your final report with a prominent "Low Confidence Warning" section. This section must explicitly state that the analysis is preliminary and based on sparse or conflicting data.\`;
        report.parsedIntent.output_format_instructions += warningInstruction;
    }
    return report;
};`,
    },
  },
  {
    id: "quantumverifier",
    name: "QuantumVerifier",
    title: "Docker Sandbox & Formal Code Safety Verifier",
    category: "Verification & Safety",
    categoryKey: "verification",
    badge: "Formal Logic · Container Isolation",
    shortDescription:
      "A multi-tiered code verification and sandbox execution engine that validates generated software inside isolated Docker containers with automated fuzz testing, ESLint AST rules, and DeepSeek failure reasoning.",
    fullOverview:
      "QuantumVerifier (QuantumVerifier-v2) ensures that generated code never executes unsafely on production hosts. Equipped with Docker container isolation via dockerode, it tests executable code in sandboxed runtime containers, runs automated fuzz testing, enforces ESLint rules, and engages DeepSeek for redundant failure analysis when exceptions occur.",
    sourceFiles: [
      "Documents/Duplicate/backend/src/services/quantumVerifier.js",
      "Documents/Duplicate/NeuroSyn_Full_Documentation.md",
    ],
    techStack: ["Docker (dockerode)", "ESLint AST Validator", "DeepSeek Thinker Fallback", "Automated Fuzzing"],
    verifiedAttributes: [
      { label: "Core Capabilities", value: "code_verification, fuzz_testing, static_analysis" },
      { label: "Isolation Layer", value: "Ephemeral Docker container sandboxing via /var/run/docker.sock" },
      { label: "Static Analysis", value: "Configured ESLint AST parser enforcing syntax rules" },
      { label: "Failure Analysis", value: "Engages DeepSeek for root-cause diagnosis if execution fails" },
      { label: "Non-Exec Bypass", value: "Bypasses containers safely for plaintext, markdown, latex, json" },
    ],
    architectureDiagramType: "pipeline",
    architectureNodes: [
      { from: "Generated Code Input", to: "Language Check (Non-executable bypass)" },
      { from: "Language Check (Non-executable bypass)", to: "ESLint AST Validator Plugin" },
      { from: "ESLint AST Validator Plugin", to: "Docker Client Sandboxing" },
      { from: "Docker Client Sandboxing", to: "Automated Fuzz Testing" },
      { from: "Automated Fuzz Testing", to: "Execution Assessment" },
      { from: "Execution Assessment", to: "Verification Success Certification", label: "Zero Errors" },
      { from: "Execution Assessment", to: "DeepSeek Failure Diagnosis", label: "Execution Failed" },
    ],
    lifecycleSteps: [
      {
        step: "01",
        name: "Language Filtering & Bypass",
        description: "Checks input language. Non-executable types (markdown, json, html) bypass sandbox overhead safely.",
        components: ["NON_EXECUTABLE_LANGUAGES", "InputNormalizer"],
      },
      {
        step: "02",
        name: "Static AST Linting",
        description: "Instantiates ESLint to check syntax validity and dangerous constructs before running code.",
        components: ["ESLint", "eslint:recommended"],
      },
      {
        step: "03",
        name: "Docker Container Sandboxing",
        description: "Provisions an ephemeral Docker container using dockerode, executing the program inside an air-gapped environment.",
        components: ["Dockerode", "/var/run/docker.sock"],
      },
      {
        step: "04",
        name: "Fuzzing & Redundant Reasoning",
        description: "Applies edge-case inputs. If a runtime crash occurs, invokes DeepSeekThinker to diagnose the failure pattern.",
        components: ["FuzzTester", "DeepSeekThinker-v1"],
      },
    ],
    codeOrTraceExample: {
      language: "javascript",
      caption: "Constructor and capabilities from backend/src/services/quantumVerifier.js",
      code: `export class QuantumVerifier extends BaseAgent {
    constructor({ clients }) {
        super({
            name: 'QuantumVerifier-v2',
            capabilities: ['code_verification', 'fuzz_testing', 'static_analysis'],
            clients: clients,
            tags: ['verification', 'security'],
            type: 'VerifierAgent'
        });
        this.docker = new Docker({ socketPath: '/var/run/docker.sock' });
        this.eslint = new ESLint({
            overrideConfig: {
                env: { browser: true, es2021: true, node: true },
                extends: ['eslint:recommended']
            }
        });
    }
}`,
    },
  },
  {
    id: "multicritic",
    name: "MultiCriticPanel",
    title: "Batching Consensus & Adversarial Critique Panel",
    category: "Verification & Safety",
    categoryKey: "verification",
    badge: "Adversarial Critique · Batch Consensus",
    shortDescription:
      "An AI-powered evaluation panel that audits thought streams in structured batches, issuing formal ACCEPT or REJECT verdicts against problem constraints to prevent rate limits and context saturation.",
    fullOverview:
      "MultiCriticPanel acts as an adversarial filter inside Quantix and SynapseFabric. Rather than allowing an agent's initial thoughts to pass straight to synthesis, MultiCriticPanel groups intermediate thoughts into batches (batch size 5), evaluates them against structured percepts, and issues formal ACCEPT or REJECT verdicts accompanied by granular feedback.",
    sourceFiles: [
      "Documents/Duplicate/backend/src/quantix/critics/multiCriticPanel.js",
      "Documents/Duplicate/NeuroSyn_Full_Documentation.md",
    ],
    techStack: ["Node.js", "GPT-4o", "JSON Object Enforcement", "Batching Engine"],
    verifiedAttributes: [
      { label: "Batch Sizing", value: "Processes thoughts in batches of 5 to avoid context limits" },
      { label: "Response Format", value: "Enforces strict JSON object format for machine parseability" },
      { label: "Verdict Schema", value: "Generates ACCEPT / REJECT verdicts with flaw identification" },
      { label: "Gating Control", value: "Blocks downstream synthesis until thoughts satisfy criteria" },
      { label: "Feedback Channel", value: "Supplies structured critique feedback directly into NeuroPlanner" },
    ],
    architectureDiagramType: "flowchart",
    architectureNodes: [
      { from: "Agent Thought Stream", to: "MultiCriticPanel.evaluate()" },
      { from: "MultiCriticPanel.evaluate()", to: "Batch Slicer (Size: 5 thoughts)" },
      { from: "Batch Slicer (Size: 5 thoughts)", to: "Batch Prompt Constructor" },
      { from: "Batch Prompt Constructor", to: "LLM Evaluation (JSON Object Mode)" },
      { from: "LLM Evaluation (JSON Object Mode)", to: "Verdict Aggregator" },
      { from: "Verdict Aggregator", to: "ACCEPT → Synthesizer Approval", label: "Passes Criteria" },
      { from: "Verdict Aggregator", to: "REJECT → Planner Feedback Loop", label: "Flaws Found" },
    ],
    lifecycleSteps: [
      {
        step: "01",
        name: "Batch Segmentation",
        description: "Partitions thought arrays into chunks of 5, preventing context window saturation and token throttling.",
        components: ["batchSize = 5", "slice()"],
      },
      {
        step: "02",
        name: "Prompt Assembly",
        description: "Combines original parsed problem constraints with batch thoughts into a structured critique evaluation prompt.",
        components: ["_createBatchPrompt", "ProblemContext"],
      },
      {
        step: "03",
        name: "Structured Evaluation",
        description: "Requests JSON-enforced verdicts from GPT-4o, detailing logical soundness, edge-case handling, and factual validity.",
        components: ["response_format: { type: 'json_object' }"],
      },
      {
        step: "04",
        name: "Verdict Routing",
        description: "Aggregates batch verdicts. If flaws are found, emits structured critique feedback back into the orchestrator loop.",
        components: ["allVerdicts", "isAccepted Flag"],
      },
    ],
    codeOrTraceExample: {
      language: "javascript",
      caption: "Batching loop from backend/src/quantix/critics/multiCriticPanel.js",
      code: `async evaluate(thoughts, problemContext) {
    if (thoughts.length === 0) return this._handleEmptyThoughts();

    let allVerdicts = [];
    for (let i = 0; i < thoughts.length; i += this.batchSize) {
        const batch = thoughts.slice(i, i + this.batchSize);
        const prompt = this._createBatchPrompt(batch, problemContext, i);

        const response = await this.client.chat.completions.create({
            model: this.model,
            messages: [{ role: 'system', content: prompt }],
            response_format: { type: 'json_object' },
        });

        const content = JSON.parse(response.choices[0].message.content);
        allVerdicts.push(...content.verdicts);
    }
    return this._aggregateResults(allVerdicts);
}`,
    },
  },
  {
    id: "emotionengine",
    name: "EmotionEngine++",
    title: "High-Dimensional Intent & Affective Vectorizer",
    category: "Cognitive Systems",
    categoryKey: "cognitive",
    badge: "Intent Vectorizer · Affective Scoring",
    shortDescription:
      "A cognitive intent extraction engine that transforms raw user prompts into 5-axis dimensional vectors, urgency scores, and ethical flags to guide downstream routing.",
    fullOverview:
      "EmotionEngine++ (EmotionEnginePlusPlus) operates as the sensory perception layer for SynapseFabric. It evaluates prompts across analytical, creative, empathetic, formal, and meticulous dimensions, quantifies urgency (0.0 to 1.0), flags ethical considerations (bias, sensitive topics, user distress), and provides zero-overhead technical keyword bypasses for pure code development operations.",
    sourceFiles: [
      "Documents/Duplicate/backend/src/services/emotionEngine++.js",
      "Documents/Duplicate/NeuroSyn_Full_Documentation.md",
    ],
    techStack: ["Node.js", "GPT-5.5 / GPT-4o", "JSON Object Mode", "Keyword Fast Bypass"],
    verifiedAttributes: [
      { label: "5-Axis Vector", value: "Analytical, Creative, Empathetic, Formal, Meticulous (0.0 to 1.0)" },
      { label: "Urgency Metric", value: "Continuous float score from 0.0 to 1.0" },
      { label: "Ethical Flags", value: "Detects sensitive_topic, potential_for_harm, user_distress, bias_risk" },
      { label: "Task Classifications", value: "Computational_Execution, Knowledge_Synthesis, Code_Generation, etc." },
      { label: "Technical Bypass", value: "Instant bypass for 'create file', 'modify file', 'debug code' keywords" },
    ],
    architectureDiagramType: "pipeline",
    architectureNodes: [
      { from: "Raw User Input", to: "Technical Keyword Fast Bypass Check" },
      { from: "Technical Keyword Fast Bypass Check", to: "Immediate Neutral State", label: "Matches Code Editing" },
      { from: "Technical Keyword Fast Bypass Check", to: "Deep Intent Extraction Prompt", label: "Natural Language" },
      { from: "Deep Intent Extraction Prompt", to: "5-Axis Cognitive Vector Model" },
      { from: "Deep Intent Extraction Prompt", to: "5-Axis Cognitive Vector Model" },
      { from: "5-Axis Cognitive Vector Model", to: "Structured Intent Map (JSON)" },
      { from: "Structured Intent Map (JSON)", to: "SynapseFabric Strategy Routing" },
    ],
    lifecycleSteps: [
      {
        step: "01",
        name: "Input Normalization & Bypass",
        description: "Checks incoming input against TECHNICAL_BYPASS_KEYWORDS. Pure software engineering queries bypass LLM extraction with zero latency.",
        components: ["TECHNICAL_BYPASS_KEYWORDS", "getTechnicalBypassState()"],
      },
      {
        step: "02",
        name: "Multi-Modal Context Priming",
        description: "Integrates optional image metadata (alt text) and audio transcription quality if present into the analysis context.",
        components: ["MultimodalContext", "MetadataPrimer"],
      },
      {
        step: "03",
        name: "Intent Mapping in JSON Mode",
        description: "Directs LLM to generate a strictly validated JSON intent map containing vector scores, urgency, ethical flags, and task classification.",
        components: ["response_format: { type: 'json_object' }"],
      },
      {
        step: "04",
        name: "Cognitive Router Ingestion",
        description: "Transmits the numeric intent vector directly to SynapseFabric to steer strategy selection between Fast Path, PRA, DAG, or Forging.",
        components: ["SynapseFabric", "intentVector"],
      },
    ],
    codeOrTraceExample: {
      language: "json",
      caption: "Output schema enforced by backend/src/services/emotionEngine++.js",
      code: `{
  "vector": {
    "analytical": 0.85,
    "creative": 0.20,
    "empathetic": 0.10,
    "formal": 0.90,
    "meticulous": 0.95
  },
  "urgency": 0.70,
  "ethical_considerations": [],
  "strategy_suggestions": ["use_powerful_model"],
  "task_type": "Knowledge_Synthesis"
}`,
    },
  },
];
