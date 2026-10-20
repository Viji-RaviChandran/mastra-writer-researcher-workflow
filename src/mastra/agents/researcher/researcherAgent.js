// src/mastra/agents/index.ts
import { Agent } from '@mastra/core/agent';
import { generalResearchSkill, peopleBioSkill } from '../../skills/researcherSkills';

export const researcherAgent = new Agent({
  name: 'Researcher Agent',
  instructions: `
    You are an expert research analyst.
    For every research request:
    - If it focuses on a person or historical figure, activate the "peopleBioSkill" skill, then call searchWikipediaTool.
    - If it focuses on an abstract concept, technology, or general event, activate the "generalResearchSkill" skill, then call searchGeneralSourceTool.
    - Do not answer until you have called the appropriate research tool.  
  `,
  model: 'openrouter/meta-llama/llama-3.3-70b-instruct',
  skills: [generalResearchSkill, peopleBioSkill],
});