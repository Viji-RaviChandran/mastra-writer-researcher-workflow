# Autonomous Multi-Agent Research & Synthesis Workflow

[![Framework: Mastra](https://img.shields.io/badge/Framework-Mastra-8A2BE2.svg)](https://mastra.ai/)
[![APIs: Tavily_&_Wikipedia](https://img.shields.io/badge/APIs-Tavily_%26_Wikipedia-4285F4.svg)](https://tavily.com/)
[![Language: JavaScript](https://img.shields.io/badge/Language-JavaScript-F7DF1E.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)


A deterministic, 2-stage automated research and writing system built on the **Mastra framework**. The architecture uses modular agent skills to dynamically route retrieval operations across Wikipedia and Tavily, passing aggregated research notes downstream to a context-aware writer agent that adapts its output format based on whether the entity is human.

---

> [!NOTE]
> ### TL;DR
> * **What it is:** A Node.js backend research pipeline generating structured profiles and articles from natural language prompts.
> * **How it works:** Dynamically routes queries to Wikipedia (for people) or Tavily (for general topics), then formats the aggregated notes into either executive briefs or long-form paragraphs.
> * **Architecture:** A 2-step sequential workflow coordinating 2 agents, 4 skills, and 2 external tools.
> * **Tech Stack:** Mastra, Node.js, TypeScript, Tavily API, Wikipedia API.

---

## Architecture Overview

The system executes a strictly partitioned, 2-phase pipeline that isolates live information retrieval from output synthesis:

```mermaid
flowchart TD
    A([User Research Topic]) --> B[Step 1 <br/>Information Retrieval: <br/><i>researchStep</i>]
    
    B --> C[researcherAgent]
    
    C -->|Subject: Person| D1[peopleBioSkill]
    C -->|Subject: General Topic| D2[generalResearchSkill]
    
    D1 --> T1[searchWikipediaTool <br/><i>Wikipedia API</i>]
    D2 --> T2[searchGeneralSourceTool <br/><i>Tavily API</i>]
    
    T1 --> E[(Aggregated Research Notes)]
    T2 --> E
    
    E -->|Structured Context Payload| F[Step 2 <br/>Content Synthesis: <br/><i>writerStep</i>]
    
    F --> G[writerAgent]
    
    G -->|Target: Human| H1[executiveBriefSkill <br/><i>Structured Bullet Points</i>]
    G -->|Target: Non-Human / Topic| H2[blogFormatSkill <br/><i>Expository Paragraphs</i>]
    
    H1 --> I([Final Formatted Deliverable])
    H2 --> I

    classDef stepNode fill:#1e3a8a,stroke:#42568d,stroke-width:1.5px,color:#eff6ff;
    classDef ioNode   fill:#3c66d8,stroke:#6082df,stroke-width:1.5px,color:#eff6ff;
    classDef toolNode fill:#0f172a,stroke:#202632,stroke-width:1.5px,color:#eff6ff;
    classDef skillNode fill:#03206d,stroke:#20356f,stroke-width:2px,color:#eff6ff;

    class B,F stepNode;
    class A,I ioNode;
    class T1,T2 toolNode;
    class D1,D2,H1,H2 skillNode;
```

---

## Pipeline Workflow Details

### 1. `researchStep` (Retrieval Phase)
* **Agent**: `researcherAgent`
* **Objective**: Analyzes the input prompt, selects the appropriate retrieval strategy based on entity classification, and collects contextual notes.
* **Skills & Tool Integrations**:
  * `peopleBioSkill`: Invoked when the target subject is an individual. Delegates retrieval to `searchWikipediaTool` to extract biographical milestones, career trajectory, and historical facts from Wikipedia.
  * `generalResearchSkill`: Invoked for concepts, technologies, events, or non-human entities. Delegates to `searchGeneralSourceTool` to perform web searches and extract real-time data via the Tavily API.
* **Handoff**: Synthesizes query results into an intermediate, unformatted `Research Notes` buffer passed downstream.

### 2. `writerStep` (Synthesis & Formatting Phase)
* **Agent**: `writerAgent`
* **Objective**: Converts raw research notes into a finalized document matched to the subject's entity type.
* **Skills & Output Rules**:
  * `executiveBriefSkill`: Activated strictly for human subjects. Formats findings into a concise, scannable executive brief composed of structured bullet points.
  * `blogFormatSkill`: Activated strictly for non-human subjects and general topics. Synthesizes findings into continuous, expository long-form paragraphs suitable for an article or blog post.

---

## Agent Skills & Tools Reference

The system modularizes operational capabilities using Mastra agent skills and tool bindings:

### 1. Retrieval Layer
* `searchWikipediaTool`: Handles direct querying against the Wikipedia API, extracting clean text summaries and biographic details.
* `searchGeneralSourceTool`: Interfaces with Tavily Search API to execute web-scale queries and parse relevant external web context.

### 2. Operational Skills
* `peopleBioSkill`: Encapsulates entity recognition logic for human targets and coordinates Wikipedia search workflows.
* `generalResearchSkill`: Encapsulates web retrieval heuristics and relevance scoring for non-person topics.
* `executiveBriefSkill`: Prompt-engineered skill enforcing structured, bullet-driven executive summaries for profiles.
* `blogFormatSkill`: Content generation skill enforcing cohesive narrative structure and paragraph formatting for informational topics.

---

## Quickstart

```bash
# 1. Clone repository
git clone [https://github.com/your-username/mastra-research-writer-workflow.git](https://github.com/your-username/mastra-research-writer-workflow.git)
cd mastra-research-writer-workflow

# 2. Install dependencies
npm install

# 3. Add your environment credentials in .env (TAVILY_API_KEY + LLM API keys)

# 4. Start the Mastra development server
npm run dev