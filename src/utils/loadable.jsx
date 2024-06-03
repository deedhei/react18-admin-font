import React, { useState, useEffect } from 'react';
import Loadable from 'react-loadable';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const LoadingComponent = () => {
  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, []);

  return <div />;
};

const loadable = (loader, loading = LoadingComponent) => {
  return Loadable({
    loader,
    loading,
  });
};

export default loadable;