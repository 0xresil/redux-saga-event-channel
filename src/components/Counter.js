import { connect } from 'react-redux';

const Counter = ({ count, onIncrement, onDecrement, onIncrementAsync }) => {
    console.log("value = ", count);
    return (
        <div style={{marginLeft: '100px'}}>
            <button onClick={onIncrementAsync}>
            Increment after 1 second
            </button>
            {' '}
            <button onClick={onIncrement}>
            Increment
            </button>
            {' '}
            <button onClick={onDecrement}>
            Decrement
            </button>
            <hr />
            <div>
            Clicked: {count} times
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
      count: state.count
    };
}
export default connect(mapStateToProps)(Counter);