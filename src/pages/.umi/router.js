import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@tmp/history';
import RendererWrapper0 from 'E:/project/itim-dxs-yyjk-itim-dxs-yyjk-qd-01387113/src/pages/.umi/LocaleWrapper.jsx';
import _dvaDynamic from 'dva/dynamic';

const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/user',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__UserLayout" */ '../../layouts/UserLayout'),
          LoadingComponent: require('E:/project/itim-dxs-yyjk-itim-dxs-yyjk-qd-01387113/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/UserLayout').default,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__user__login" */ '../user/login'),
              LoadingComponent: require('E:/project/itim-dxs-yyjk-itim-dxs-yyjk-qd-01387113/src/components/PageLoading/index')
                .default,
            })
          : require('../user/login').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('E:/project/itim-dxs-yyjk-itim-dxs-yyjk-qd-01387113/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__SecurityLayout" */ '../../layouts/SecurityLayout'),
          LoadingComponent: require('E:/project/itim-dxs-yyjk-itim-dxs-yyjk-qd-01387113/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/SecurityLayout').default,
    routes: [
      {
        path: '/',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "layouts__BasicLayout" */ '../../layouts/BasicLayout'),
              LoadingComponent: require('E:/project/itim-dxs-yyjk-itim-dxs-yyjk-qd-01387113/src/components/PageLoading/index')
                .default,
            })
          : require('../../layouts/BasicLayout').default,
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/deliver',
            exact: true,
          },
          {
            path: '/deliver',
            name: 'deliver',
            icon: 'bank',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__DeliverMonitor" */ '../DeliverMonitor'),
                  LoadingComponent: require('E:/project/itim-dxs-yyjk-itim-dxs-yyjk-qd-01387113/src/components/PageLoading/index')
                    .default,
                })
              : require('../DeliverMonitor').default,
            exact: true,
          },
          {
            path: '/stay',
            name: 'stay',
            icon: 'hourglass',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__stay__Stay" */ '../stay/Stay'),
                  LoadingComponent: require('E:/project/itim-dxs-yyjk-itim-dxs-yyjk-qd-01387113/src/components/PageLoading/index')
                    .default,
                })
              : require('../stay/Stay').default,
            exact: true,
          },
          {
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__404" */ '../404'),
                  LoadingComponent: require('E:/project/itim-dxs-yyjk-itim-dxs-yyjk-qd-01387113/src/components/PageLoading/index')
                    .default,
                })
              : require('../404').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('E:/project/itim-dxs-yyjk-itim-dxs-yyjk-qd-01387113/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__404" */ '../404'),
              LoadingComponent: require('E:/project/itim-dxs-yyjk-itim-dxs-yyjk-qd-01387113/src/components/PageLoading/index')
                .default,
            })
          : require('../404').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('E:/project/itim-dxs-yyjk-itim-dxs-yyjk-qd-01387113/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () => import(/* webpackChunkName: "p__404" */ '../404'),
          LoadingComponent: require('E:/project/itim-dxs-yyjk-itim-dxs-yyjk-qd-01387113/src/components/PageLoading/index')
            .default,
        })
      : require('../404').default,
    exact: true,
  },
  {
    component: () =>
      React.createElement(
        require('E:/project/itim-dxs-yyjk-itim-dxs-yyjk-qd-01387113/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen = () => {};

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    routeChangeHandler(history.location);
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
