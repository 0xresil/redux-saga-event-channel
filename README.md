# Redux saga
In this project, I used eventChannel in redux-saga module.
```js
function subscriber(alphabet_index) {
    return eventChannel(emitter => {
        const iv = setInterval(async () => {
            /**
             * data includes { countries, alphabetIdx }
             */
            let data = await getAlphabetCounteries(alphabet_index ++);
            emitter(data)
        }, 15000);
        // The subscriber must return an unsubscribe function
        return () => {
          clearInterval(iv)
        }
      }
    )
  }
function* saga() {
    const chan = yield call(subscriber, 0)
    try {
        while(true) {
            let data = yield take(chan)
            yield put(PUT_COUNTRIES(data));
        }
    } finally {
        console.log("terminated");
    }
}
```

# Country API
I get country data from https://restcountries.eu/.
```js
return axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
    ...
});
```

# Website Deployment, Visit HERE!
https://test-project-country-finder.web.app/
