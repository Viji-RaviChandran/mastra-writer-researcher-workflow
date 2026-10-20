// src/mastra/tools/researchTools.ts
import { createTool } from '@mastra/core/tools';
import { z } from 'zod';


export const searchWikipediaTool = createTool({
  id: 'search-wikipedia',
  description: 'Searches official Wikipedia summary endpoints for notable people, biographies, and historical figures.',
  inputSchema: z.object({
    topic: z.string().describe('The person or subject to research'),
  }),
  outputSchema: z.object({
      researchNotes: z.string(),
    }),
  execute: async ({ topic }) => {
    console.log('====================== entered people tool =======================');
    try {
      // 1. Sanitize the name for Wikipedia URL format (spaces -> underscores)
      const encodedTitle = encodeURIComponent(topic.trim().replace(/\s+/g, '_'));

      // 2. Fetch summary from Wikipedia's public REST API
      const res = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodedTitle}`,
        {
          headers: {
            // Wikipedia requires a descriptive User-Agent
            'User-Agent': 'MastraAgent/1.0 (academic-research-bot)',
          },
        }
      );

      if (!res.ok) {
        if (res.status === 404) {
          return {
            researchNotes: `No Wikipedia article found matching "${topic}".`,
          };
        }
        throw new Error(`Wikipedia API error: HTTP ${res.status}`);
      }

      const data = await res.json();
      console.log('Wikipedia API response as a JSON:', data);

      const bio = data.extract || 'No summary text available.';
      
      console.log('Wikipedia API response as text:', data);

     

      return {
        researchNotes: bio,
      };
    } catch (error) {
      console.error('Wikipedia lookup failed:', error);
      return {
        researchNotes: `Failed to fetch Wikipedia record: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  },
});