/* @jsx h */

import { h, render } from "preact";
import { testSuite, externalPromise } from "/tests/test-utils.js";
import { useWorkerizedReducer } from "/dist/preact/use-workerized-reducer.es.js";

const worker = new Worker(new URL("./worker.js", import.meta.url), {
  type: "module",
});

testSuite("Holds local state", async () => {
  const [promise, resolve] = externalPromise();
  function App() {
    const [state, dispatch] = useWorkerizedReducer(worker, "reducer", {
      counter: 0,
    });

    if (state?.counter === 0) dispatch({});
    if (state?.counter === 1) resolve();

    return <pre>{JSON.stringify(state, null, "  ")}</pre>;
  }

  render(<App />, document.all.main);

  return promise;
});
