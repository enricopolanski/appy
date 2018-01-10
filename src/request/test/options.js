import test from 'ava';
import options from '../lib/options';

const opts = options();

test('default options', t => {
  t.deepEqual(opts(), {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    }
  });
  t.deepEqual(opts(null), {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    }
  });
});

test('GET - token & extra headers', t => {
  t.deepEqual(opts({
    headers: {
      token: 'myToken',
      extra: {
        'extra-value': '1'
      }
    }
  }), {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': 'Bearer myToken',
        'extra-value': '1'
      }
    })
});

test('POST - cors & id header', t => {
  t.deepEqual(options('POST')({
    method: 'POST',
    mode: 'opaque',
    headers: {
      id: 'pluto'
    }
  }), {
      method: 'POST',
      mode: 'opaque',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Contactlab-ClientId': 'pluto'
      }
    })
});

test('PUT - body & version header', t => {
  t.deepEqual(options('PUT')({
    method: 'PUT',
    headers: {
      version: '1.0.0'
    },
    body: {
      nome: 'pippo',
      cognome: 'pluto'
    }
  }), {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Contactlab-ClientVersion': '1.0.0'
      },
      body: '{"nome":"pippo","cognome":"pluto"}'
    })
});