import React, { Component } from 'react';
import { Provider } from 'react-redux';
import I18n from "redux-i18n";
import { store, history } from '../../redux/store';
import Root from '../Root/Root';
import translations from "../../constants/translations";

// Get navigator language
 const { language } = navigator;
 const languageCode = language.slice(0, 2);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <I18n translations={translations} initialLang={languageCode}>
          <Root history={history} />
        </I18n>
      </Provider>
    );
  }
}

export default App;
