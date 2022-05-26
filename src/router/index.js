import Vue from 'vue'
import Router from 'vue-router'
import Submissions from '@/views/Submissions.vue'
import Newest from '@/views/Newest.vue'
import Threads from '@/views/Threads.vue'
import Comments from '@/views/Comments.vue'
import Ask from '@/views/Ask.vue'
import Submit from '@/views/Submit.vue'
import Profile from '@/views/Profile.vue'
import UpvotedSubmissions from '@/views/UpvotedSubmissions.vue'
import UpvotedComments from '@/views/UpvotedComments.vue'
import Submitted from '@/views/Submitted.vue'
import Submission from '@/components/Submission.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  fallback: true,
  routes: [
    {
      path: '/',
      name: 'Submissions',
      component: Submissions
    },
    {
      path: '/newest',
      name: 'Newest',
      component: Newest
    },
    {
      path: '/users/:id/comments',
      name: 'Threads',
      component: Threads
    },
    {
      path: '/comments',
      name: 'Comments',
      component: Comments
    },
    {
      path: '/ask',
      name: 'Ask',
      component: Ask
    },
    {
      path: '/submit',
      name: 'Submit',
      component: Submit
    },
    {
      path: '/submissions/:id',
      name: 'Submission',
      component: Submission
    },
    {
      path: '/users/:id',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/users/:id/upvotedSubmissions',
      name: 'UpvotedSubmissions',
      component: UpvotedSubmissions
    },
    {
      path: '/users/:id/upvotedComments',
      name: 'UpvotedCommentss',
      component: UpvotedComments
    },
    {
      path: '/users/:id/submissions',
      name: 'Submitted',
      component: Submitted
    }
  ]
})
