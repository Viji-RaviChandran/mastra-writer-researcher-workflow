import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { tavily } from '@tavily/core';

// Initialize Tavily client (uses process.env.TAVILY_API_KEY)
const tvly = tavily(process.env.TAVILY_API_KEY);

export const searchGeneralSourceTool = createTool({
  id: 'search-general-source',
  description: 'Searches reliable web sources for general topics, trends, news, and technical concepts.',
  inputSchema: z.object({
    topic: z.string().describe('The person or subject to research'),
  }),
  outputSchema: z.object({
    researchNotes: z.string(),
  }),
  execute: async ({ topic }) => {
    
    console.log('====================== entered general tool =======================');
    try {
      // Execute a focused search returning 3 relevant context snippets
      const searchResponse = await tvly.search(topic, {
        searchDepth: 'basic',
        maxResults: 3,
      });

      if (!searchResponse.results || searchResponse.results.length === 0) {
        return {
          researchNotes: `No conclusive public web results found for topic: "${topic}".`,
        };
      };
      

      // Aggregate top findings and take the most relevant source URL
      const combinedContent = searchResponse.results
        .map((r) => `[Title: ${r.title}]\n${r.content}`)
        .join('\n\n');

      return {
        researchNotes: combinedContent,
      };
    } catch (error) {
      console.error('General search failed:', error);
      return {
        researchNotes: `Search error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  },
});