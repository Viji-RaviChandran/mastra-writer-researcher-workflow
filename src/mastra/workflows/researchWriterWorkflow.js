// src/mastra/workflows/researchWriterWorkflow.js
import { createWorkflow, createStep } from '@mastra/core/workflows';
import { z } from 'zod';
import { researcherAgent } from '../agents/researcher/researcherAgent.js';
import { writerAgent } from '../agents/writer/writerAgent.js';

// Step 1: Researcher Agent executes with its skills (Wikipedia or Web Search)
const researchStep = createStep({
  id: 'research-step',
  inputSchema: z.object({
    topic: z.string().describe('The person or subject to research')
  }),
  outputSchema: z.object({
    researchNotes: z.string()
  }),
  execute: async ({ inputData}) => {
    const topic = inputData.topic;
    console.log(`====================== CONTEXT =======================\n`, topic, '\n' );

    const result = await researcherAgent.generate(`
      Research the following subject thoroughly: "${topic}"
    `,{
        maxSteps: 5
      });

      // console.log('Tool calls made:', JSON.stringify(result.toolCalls, null, 2));
      // console.log('Tool results received:', JSON.stringify(result.toolResults, null, 2));
      // console.log('Total steps taken:', result.steps?.length);
      console.log('================ researcher agent result ================ \n', result.text);
    return {
      researchNotes: result.text
    };
  },
});

// Step 2: Writer Agent takes the research and formats it using its formatting skills
const writerStep = createStep({
  id: 'writer-step',
  inputSchema: z.object({
    researchNotes: z.string()
  }),
  outputSchema: z.object({
    finalArticle: z.string(),
  }),
  execute: async ({ inputData }) => {

    const researchNotes = inputData.researchNotes;
    console.log('================ reached step 2 =======================');
    console.log(`====================== CONTEXT ========================\n`, researchNotes, '\n' );


    
    try{
      const result = await writerAgent.generate(`
        

        Research Material:
        ${researchNotes}
      `,{
        maxSteps: 5
      });
      // console.log('Tool calls made:', JSON.stringify(result.toolCalls, null, 2));
      // console.log('Tool results received:', JSON.stringify(result.toolResults, null, 2));
      // console.log('Total steps taken:', result.steps?.length);
      console.log('================ writer agent result ================ \n', result.text);
      return {
        finalArticle: result.text,
      };
    } catch (error) {
      console.error('Error in writer agent:', error);
    }
  },
});

// Chain them: Research -> Write
export const researchWriterWorkflow = createWorkflow({
  id: 'research-writer-pipeline',
  inputSchema: z.object({
    topic: z.string().describe('The person or subject to research'),
  }),
   outputSchema: z.object({
    finalArticle: z.string(),
  })
})
  
  .then(researchStep)
  .then(writerStep)
  .commit();