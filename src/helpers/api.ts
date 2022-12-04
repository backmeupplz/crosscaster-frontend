import fetch from 'unfetch'

const base = 'https://backend.crosscaster.xyz'

export function getSubscription(mnemonic: string) {
  return fetch(`${base}/subscription?mnemonic=${mnemonic}`).then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText)
    }
    return res.json() as Promise<{
      twitterUsername: string
    }>
  })
}

export function setSubscription(mnemonic: string, twitterUsername: string) {
  return fetch(`${base}/subscription`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mnemonic, twitterUsername }),
  }).then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText)
    }
  })
}

export function deleteSubscription(mnemonic: string) {
  return fetch(`${base}/subscription?mnemonic=${mnemonic}`, {
    method: 'DELETE',
  }).then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText)
    }
  })
}
