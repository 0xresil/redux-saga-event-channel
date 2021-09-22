
import SideBar from 'components/SideBar.js'
import Counter from 'components/Counter.js'
import store from 'store/index.js'
import { INCREMENT, INCREMENT_ASYNC } from 'actions'
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
