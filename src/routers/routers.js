import Login from "../pages/login"
import Home from "../pages/admin/home/Home";
import Admin from "../pages/admin/Admin";
import Question from "../pages/admin/question/question";
import Subject from '../pages/admin/subject/subject'
import Message from '../pages/admin/message/message'
import Interface from "../pages/admin/interface/interface";
import User from "../pages/admin/user/user";
import Feedback from "../pages/admin/feedback/feedback";
import Score from '../pages/admin/score/score'
import Log from '../pages/admin/log/log'

import { Navigate } from "react-router-dom";

const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "question",
        element: <Question />,
      },
      {
        path: "subject",
        element: <Subject />,
      },
      {
        path: "interface",
        element: <Interface />,
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "message",
        element: <Message />,
      },
      {
        path: "feedback",
        element: <Feedback />,
      },
      {
        path: "log",
        element: <Log />,
      },
      {
        path: "score",
        element: <Score />,
      },
    ],
  },
  {
    path: "/*",
    element: <Navigate to="/admin/home" />,
  },
];
export default routes