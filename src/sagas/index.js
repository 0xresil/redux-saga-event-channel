
import { put, takeEvery, call, all, take } from 'redux-saga/effects'
import {eventChannel, END} from 'redux-saga'
import { default as getAlphabetCounteries } from 'api'
import { PUT_COUNTRIES } from 'actions'

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

export default function* rootSaga() {
    yield all([
        saga(),
    ])
}