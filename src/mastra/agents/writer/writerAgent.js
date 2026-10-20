import { Agent } from '@mastra/core/agent';
import { blogFormatSkill, executiveBriefSkill } from '../../skills/writerSkills';


export const writerAgent = new Agent({
  name: 'Writer Agent',
  instructions: `
    You are a professional content strategist.
    Inspect the output format specified in the prompt:
    - If the user requests general information anything but about a person, apply "long-form-blog-formatting".
    - If the user requests information about a person, apply "executive-brief-formatting".
  `,
  model: 'openrouter/meta-llama/llama-3.3-70b-instruct',
  skills: [blogFormatSkill, executiveBriefSkill],
});