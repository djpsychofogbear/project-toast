import React from 'react';
import ToastProvider from '../ToastProvider/ToastProvider';

import ToastPlayground from '../ToastPlayground';
import Footer from '../Footer';

function App(): React.ReactElement {
  return (
    <>
      <ToastProvider>
        <ToastPlayground />
        <Footer />
      </ToastProvider>
    </>
  );
}

export default App; 