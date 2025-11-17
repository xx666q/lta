import { createBrowserRouter, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';

import P_login from '../pages/p-login';
import P_identity_select from '../pages/p-identity_select';
import P_owner_dashboard from '../pages/p-owner_dashboard';
import P_provider_dashboard from '../pages/p-provider_dashboard';
import P_admin_dashboard from '../pages/p-admin_dashboard';
import P_pet_profile from '../pages/p-pet_profile';
import P_service_discovery from '../pages/p-service_discovery';
import P_service_detail from '../pages/p-service_detail';
import P_booking_confirm from '../pages/p-booking_confirm';
import P_owner_calendar from '../pages/p-owner_calendar';
import P_cloud_view from '../pages/p-cloud_view';
import P_service_rating from '../pages/p-service_rating';
import P_qualification_audit from '../pages/p-qualification_audit';
import P_service_publish from '../pages/p-service_publish';
import P_order_hall from '../pages/p-order_hall';
import P_provider_order_manage from '../pages/p-provider_order_manage';
import P_daily_report from '../pages/p-daily_report';
import P_withdrawal from '../pages/p-withdrawal';
import P_growth_system from '../pages/p-growth_system';
import P_user_profile from '../pages/p-user_profile';
import P_ai_customer_service from '../pages/p-ai_customer_service';
import P_data_dashboard from '../pages/p-data_dashboard';
import P_owner_profile from '../pages/p-owner_profile';
import P_provider_profile from '../pages/p-provider_profile';
import P_admin_profile from '../pages/p-admin_profile';
import P_password_recovery from '../pages/p-password_recovery';
import NotFoundPage from './NotFoundPage';
import ErrorPage from './ErrorPage';

function Listener() {
  const location = useLocation();
  useEffect(() => {
    const pageId = 'P-' + location.pathname.replace('/', '').toUpperCase();
    console.log('当前pageId:', pageId, ', pathname:', location.pathname, ', search:', location.search);
    if (typeof window === 'object' && window.parent && window.parent.postMessage) {
      window.parent.postMessage({
        type: 'chux-path-change',
        pageId: pageId,
        pathname: location.pathname,
        search: location.search,
      }, '*');
    }
  }, [location]);

  return <Outlet />;
}

// 使用 createBrowserRouter 创建路由实例
const router = createBrowserRouter([
  {
    path: '/',
    element: <Listener />,
    children: [
      {
    path: '/',
    element: <Navigate to='/login' replace={true} />,
  },
      {
    path: '/login',
    element: (
      <ErrorBoundary>
        <P_login />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/identity-select',
    element: (
      <ErrorBoundary>
        <P_identity_select />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/owner-dashboard',
    element: (
      <ErrorBoundary>
        <P_owner_dashboard />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/provider-dashboard',
    element: (
      <ErrorBoundary>
        <P_provider_dashboard />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/admin-dashboard',
    element: (
      <ErrorBoundary>
        <P_admin_dashboard />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/pet-profile',
    element: (
      <ErrorBoundary>
        <P_pet_profile />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/service-discovery',
    element: (
      <ErrorBoundary>
        <P_service_discovery />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/service-detail',
    element: (
      <ErrorBoundary>
        <P_service_detail />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/booking-confirm',
    element: (
      <ErrorBoundary>
        <P_booking_confirm />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/owner-calendar',
    element: (
      <ErrorBoundary>
        <P_owner_calendar />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/cloud-view',
    element: (
      <ErrorBoundary>
        <P_cloud_view />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/service-rating',
    element: (
      <ErrorBoundary>
        <P_service_rating />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/qualification-audit',
    element: (
      <ErrorBoundary>
        <P_qualification_audit />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/service-publish',
    element: (
      <ErrorBoundary>
        <P_service_publish />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/order-hall',
    element: (
      <ErrorBoundary>
        <P_order_hall />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/provider-order-manage',
    element: (
      <ErrorBoundary>
        <P_provider_order_manage />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/daily-report',
    element: (
      <ErrorBoundary>
        <P_daily_report />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/withdrawal',
    element: (
      <ErrorBoundary>
        <P_withdrawal />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/growth-system',
    element: (
      <ErrorBoundary>
        <P_growth_system />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/user-profile',
    element: (
      <ErrorBoundary>
        <P_user_profile />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/ai-customer-service',
    element: (
      <ErrorBoundary>
        <P_ai_customer_service />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/data-dashboard',
    element: (
      <ErrorBoundary>
        <P_data_dashboard />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/owner-profile',
    element: (
      <ErrorBoundary>
        <P_owner_profile />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/provider-profile',
    element: (
      <ErrorBoundary>
        <P_provider_profile />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/admin-profile',
    element: (
      <ErrorBoundary>
        <P_admin_profile />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/password-recovery',
    element: (
      <ErrorBoundary>
        <P_password_recovery />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '*',
    element: <NotFoundPage />,
  },
    ]
  }
]);

export default router;