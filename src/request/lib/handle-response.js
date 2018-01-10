// @flow

type Payload = {
  message?: string
}

export type NormalizedResponse = {
  status: number,
  payload: Payload
}

const toPayload = (t: string): Payload => {
  try {
    return JSON.parse(t);
  } catch (e) {
    return {
      message: t
    }
  }
};

const normalize = (ok: boolean, status: number) => (payload: Payload): Promise<NormalizedResponse> =>
  ok
    ? Promise.resolve({ status, payload })
    : Promise.reject({ status, payload });

export default (r: Response): Promise<NormalizedResponse> =>
  r.text()
    .then(toPayload)
    .then(normalize(r.ok, r.status));