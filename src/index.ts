export interface Env {
	CHATGPT_API_KEY: string;
}

import { getInstruction } from './instruction'
import { OpenAPIRouter, OpenAPIRoute, Query, Str, Bool } from '@cloudflare/itty-router-openapi'

class SwearWorldDetector extends OpenAPIRoute {
	static schema = {
	  tags: ['InsultDetector'],
	  summary: 'Detect insult or not',
	  parameters: {
		  msg: Query(Str, {
		    description: 'Message',
		    required: true,
		  }),
	  },
	  responses: {
		  '200': {
		    schema: {
			    result: new Bool(),
		    },
		  },
	  },
	}
  
	async handle(request: Request, env: Env, context: any, data: Record<string, any>) {
    const { msg } = data
    const res = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.CHATGPT_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: getInstruction(msg),
		temperature: 0,
  		top_p: 1
      })
    });
    const completions: any = await res.json()
    return JSON.parse(completions.choices[0].text)
	}
}

const router = OpenAPIRouter()
router.get('/detect', SwearWorldDetector)
router.all('*', () => new Response('Not Found.', { status: 404 }))

export default {
  fetch: router.handle
}