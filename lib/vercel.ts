import fetch from 'node-fetch'

export async function triggerNewBuild() {
  const response = await fetch(
    `https://api.vercel.com/v1/projects/${process.env.VERCEL_PROJECT_ID}/deployments`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_DEPLOY_HOOK_TOKEN}`,
        'Content-Type': 'application/json',
      }
    }
  )
  
  if (!response.ok) {
    throw new Error('Failed to trigger build')
  }
  
  return await response.json()
}
