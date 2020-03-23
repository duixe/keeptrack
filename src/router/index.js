import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LogIn from '../views/LogIn.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import Department from '../views/Department.vue'
import Team from '../views/Team.vue'
import EditEmployee from '../views/EditEmployee'
import ViewEmployee from '../views/ViewEmployee'
import EditDept from '../views/EditDept'
import DeleteDept from '../views/DeleteDept'
import NotFound from "../views/NotFound";
import {fb} from '@/firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/department',
    name: 'Department',
    component: Department,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/team',
    name: 'Team',
    component: Team,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/edit/:staff_id',
    name: 'EditEmployee',
    component: EditEmployee,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/view/:staff_id',
    name: 'ViewEmployee',
    component: ViewEmployee,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/editdept/:dept_id',
    name: 'EditDept',
    component: EditDept,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/deletedept/:dept_id',
    name: 'DeleteDept',
    component: DeleteDept,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  //check for require Auth Guard
  if(to.matched.some(record => record.meta.requiresAuth)) {
    //check if user is not logged in
    if (!fb.auth().currentUser) {
      // redirect to login page
      next({
         path: "/login",
        query: {
          redirect: to.fullPath
        }
      })
    }else {
      // if logged in
      next();
    }
  }else if(to.matched.some(record => record.meta.requiresGuest)) {
    // if user logged in
    if (fb.auth().currentUser) {
      // redirect to login page
      next({
         path: "/dashboard",
        query: {
          redirect: to.fullPath
        }
      })
    }else {
      // if logged in
      next();
    }
  }else {
    next();
  }
})

export default router;
