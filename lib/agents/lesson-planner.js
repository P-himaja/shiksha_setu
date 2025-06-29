import { ragService } from '../rag/rag-service.js';

export class LessonPlannerAgent {
  async create(topic, grade = '10') {
    const query = `
You are an educational AI agent helping teachers create effective lesson plans. 
Respond with a clear, well-structured lesson plan in markdown-style format, designed to be converted into PowerPoint slides.

Format the output as follows:

**Title:** <Lesson Title>  
**Objective:**  
- <Objective 1>  
- <Objective 2>  

**Key Concepts:**  
- <Concept 1>  
- <Concept 2>  

**Activities:**  
- <Activity 1>  
- <Activity 2>  

**Assessment:**  
- <Assessment method or question>  

Keep the language age-appropriate for grade ${grade} and ensure all sections are included. Do not skip sections.
 example: 
 **Title:** Photosynthesis – How Plants Make Food

**Learning Objectives:**
- Understand the process of photosynthesis.
- Identify the role of sunlight, carbon dioxide, and water.
- Explain the function of chlorophyll.
- Describe the importance of photosynthesis for life on Earth.

**Key Concepts:**
- Photosynthesis Equation
- Role of Chloroplasts
- Light-dependent vs. Light-independent Reactions
- By-products of Photosynthesis

**Activities or Experiments:**
- Observe starch test in leaves using iodine.
- Group activity: Create a photosynthesis flowchart.
- Watch an animation/video and discuss key steps.

**Assessment Questions:**
1. What is the chemical equation for photosynthesis?
2. Why is chlorophyll important?
3. Describe two factors affecting the rate of photosynthesis.
4. What are the end products of photosynthesis?
5. How does photosynthesis benefit animals?

**Summary:**
Photosynthesis is the process by which green plants use sunlight to synthesize food from carbon dioxide and water. This lesson introduced the key components and stages of photosynthesis, demonstrated its significance, and equipped students with visual and conceptual understanding useful for real-world application.

`;

    // Search context documents
    const contextDocs = await ragService.searchSimilar(query, 4);

    // Generate structured response
    const answer = await ragService.generateWithContext(query, contextDocs);

    return {
      agent: 'LessonPlanner',
      response: answer,
      sources: contextDocs.map(doc => doc.metadata?.source || 'Unknown'),
    };
  }
}
