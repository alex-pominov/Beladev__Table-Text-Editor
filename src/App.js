import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actions from "./store/actions/index";
import Table from "./components/Table/Table";
import TextPresentation from "./components/TextPresentation/TextPresentation";
import ErrorBoundary from "./hoc/ErrorBoundary";

function App(props) {
  const style = {
    overflowX: "scroll"
  };

  React.useEffect(() => {
    props.getDataFromCsv();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ErrorBoundary>
      <div className="container">
        <div style={style}>
          {props.isViewTypeTable ? <Table /> : <TextPresentation />}
        </div>
        <button
          style={{ marginTop: "20px" }}
          onClick={() => props.changeViewType()}
        >
          Change view type
        </button>
      </div>
    </ErrorBoundary>
  );
}

App.propTypes = {
  isViewTypeTable: PropTypes.bool
};

/**
 * -----------------------CONNECT REDUX STORE-----------------------
 */
const mapStateToProps = state => {
  return {
    isViewTypeTable: state.isViewTypeTable
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDataFromCsv: () => dispatch(actions.getDataFromCsv()),
    changeViewType: () => dispatch(actions.changeViewType())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
