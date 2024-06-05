import { lazy, Suspense } from "react";
import { useEffect } from "react";
const loadView = (view) => {
  useEffect(() => {});
  const Component = lazy(() => import(`@/views${view}`));
  return (props) => (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );
};

export default loadView;
