// src/mastra/index.ts
import { Mastra } from '@mastra/core';
import { researcherAgent } from './agents/researcher/researcherAgent.js';
import { writerAgent } from './agents/writer/writerAgent.js';
import { researchWriterWorkflow } from './workflows/researchWriterWorkflow.js';

export const mastra = new Mastra({
  agents: {
    researcherAgent,
    writerAgent,
  },
  workflows: {
    researchWriterWorkflow,
  },
});