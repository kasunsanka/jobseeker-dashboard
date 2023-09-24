import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from "components/shared-components/Loading";
import { APP_PREFIX_PATH } from "configs/AppConfig";

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        <Route
          path={`${APP_PREFIX_PATH}/home`}
          component={lazy(() => import(`./home`))}
        />

        <Route
          exact
          path={`${APP_PREFIX_PATH}/section`}
          component={lazy(() => import(`./section/pages/SectionList`))}
        />

        <Route
          exact
          path={`${APP_PREFIX_PATH}/hubs`}
          component={lazy(() => import(`./iot-hub/pages/HubList`))}
        />

        <Route
          exact
          path={`${APP_PREFIX_PATH}/section/add`}
          component={lazy(() => import(`./section/pages/SectionAdd`))}
        />

        <Route
          exact
          path={`${APP_PREFIX_PATH}/availability/add`}
          component={lazy(() => import(`./iot-hub/pages/AvailabilityAdd`))}
        />
<Route
          exact
          path={`${APP_PREFIX_PATH}/seecker`}
          component={lazy(() => import(`./seeker/Pages/SeekerList`))}
        />

<Route
          exact
          path={`${APP_PREFIX_PATH}/app/edit/seeker/:id`}
          component={lazy(() =>
            import(`./seeker/Pages/SeekerEdit`)
          )}
        />
        <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/home`} />
      </Switch>
    </Suspense>
  );
};

export default React.memo(AppViews);
