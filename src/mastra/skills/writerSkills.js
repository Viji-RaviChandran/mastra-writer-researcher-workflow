import { createSkill } from '@mastra/core/skills';

export const blogFormatSkill = createSkill({
  id: 'blog-format-skill',
  name: 'long-form-blog-formatting',
  description: 'Formats raw research into an engaging, narrative-driven blog post.',
  instructions: `
    Format rules:
    - Tone: Conversational, approachable, yet authoritative.
    - Structure:
      1. Catchy headline (H1) and a hook paragraph.
      2. 2-3 conceptual sections using H2 headings with smooth transitions.
      3. Key takeaways highlighted in blockquotes.
  `,
  tools: {},
});

export const executiveBriefSkill = createSkill({
  id: 'brief-format-skill',
  name: 'executive-brief-formatting',
  description: 'Formats research into a crisp, skimmable executive summary.',
  instructions: `
    Format rules:
    - Tone: Direct, concise, objective. No fluff or conversational filler.
    - Structure:
      1. One-sentence TL;DR at the very top.
      2. numbered list of Key Findings(max 15 bullets). format like below if the data is available:
        . birth 
        . schooling 
        . career
        . awards
        . personal_life
        . hobbies
        . charity  
  `,
  tools: {},
});
