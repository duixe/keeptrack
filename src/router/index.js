import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '../views/SignUp.vue'
import Dashboard from '../views/Dashboard.vue'
import Department from '../views/Department.vue'
import Team from '../views/Team.vue'
import EditEmployee from '../views/EditEmployee'
import ViewEmployee from '../views/ViewEmployee'
import EditDept from '../views/EditDept'
import DeleteDept from '../views/DeleteDept'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignUp
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/department',
    name: 'Department',
    component: Department
  },
  {
    path: '/team',
    name: 'Team',
    component: Team
  },
  {
    path: '/edit/:staff_id',
    name: 'EditEmployee',
    component: EditEmployee
  },
  {
    path: '/view/:staff_id',
    name: 'ViewEmployee',
    component: ViewEmployee
  },
  {
    path: '/editdept/:dept_id',
    name: 'EditDept',
    component: EditDept
  },
  {
    path: '/deletedept/:dept_id',
    name: 'DeleteDept',
    component: DeleteDept
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
