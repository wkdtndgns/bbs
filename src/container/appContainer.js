import {AppRouter} from '../router';
import {connect} from 'react-redux';

function mapStateToProps (state) {
    return {
        type : state.type,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);