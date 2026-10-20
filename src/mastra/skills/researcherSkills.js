import { createSkill } from '@mastra/core/skills';
import { searchWikipediaTool } from '../tools/searchWikipediaTool.js';
import { searchGeneralSourceTool } from '../tools/searchGeneralSourceTool.js';

export const generalResearchSkill = createSkill({
  name: 'general-topic-research',
  description: 'Gathers factual, technical, or objective data on general concepts and events.',
  instructions: `
    Use the 'search-general-source' for the below when researching specifics:
    When researching general topics:
    - Prioritize verifiable facts, statistics, and domain trends.
    - Synthesize conflicting viewpoints if multiple sources disagree.
  `,
  tools : {
    searchGeneralSourceTool
  }
});

export const peopleBioSkill = createSkill({
  name: 'people-and-biography-research',
  description: 'Gathers biographical timelines, personal milestones, and notable career achievements of people.',
  instructions: `
    Use the 'search-wikipedia' for the below when researching specific individuals:
    When researching specific individuals:
    - Focus strictly on verified biographical facts.
    - Get overall details about the person, including their background, education, career, and major contributions.
    - Extract a chronological timeline of accomplishments.
    - Avoid subjective gossip or unverified claims.
  `,
  tools : {
    searchWikipediaTool
  }
});