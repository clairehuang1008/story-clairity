export function requestToSaveStory(body) {
  return fetch('/story/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'Application/JSON',
    },
    body: JSON.stringify(body),
  })
    .then((resp) => resp.json())
    .catch((err) => console.log('App: save story: ERROR: ', err));
}

export function requestToDeleteStory(id) {
  return fetch(`/story/delete/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .catch((err) => console.log('App: delete story: ERROR: ', err));
}

export function requestToGetStory(id) {
  return fetch(`/story/get/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .catch((err) => console.log('App: get story: ERROR: ', err));
}

export function requestToUpdateStory(id, body) {
  return fetch(`/story/update/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch((err) => console.log('App: update story: ERROR: ', err));
}

export function requestToGetAllSavedStories() {
  return fetch('story/all', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log('App: get all stories: ERROR: ', err));
}

export function requestAiText(body) {
  return fetch('/openAi/text', {
    method: 'POST',
    headers: {
      'Content-Type': 'Application/JSON',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch((err) => console.log('App: fetch AI text: ERROR ', err));
}

export function requestAiImageUrl(body) {
  return fetch('/openAi/image', {
    method: 'POST',
    headers: {
      'Content-Type': 'Application/JSON',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch((err) => console.log('App: fetch AI image: ERROR ', err));
}
