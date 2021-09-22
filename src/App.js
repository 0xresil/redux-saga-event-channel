
import SideBar from 'components/SideBar.js'
import Counter from 'components/Counter.js'
import store from 'state/store.js'
import { INCREMENT, INCREMENT_ASYNC } from 'state/actions.js'
function App() {
  return (
    <div>
      <SideBar/>
      <Counter
        onIncrement={() => store.dispatch(INCREMENT())}
        onIncrementAsync={() => store.dispatch(INCREMENT_ASYNC())} />,
    </div>
    
  );
}

export default App;
