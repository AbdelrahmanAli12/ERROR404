import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "antd/dist/antd.css";
import GetCoursesByPrice from "./components/getCourses";
import GetAllInstructorCoursesWrapper from "./components/instructorComponents/getAllInstructorCourses";
import ViewAllCoursesPriceWrapper from "./components/viewallCoursesPrice";
import CreateAdminWrapper from "./components/createAdmin";
import CreateInstructorWrapper from "./components/createInst";
import WrapperCreateCourses from "./components/createCourse";
import SelectCountryWrapper from "./components/selectCountry";
import CreateCorporateWrapper from "./components/createCorp";
import ViewAllCoursesWrapper from "./components/viewAllCourses";
import InstViewCoursesWrapper from "./components/instViewCourses";
import HomePageWrapper from "./components/homePage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ChangePasswordPageWrapper from "./components/changePassword";
import ChangingPaswword from "./components/changePasswordAfterEmail";
import { AppContext } from "./AppContext";
import UploadLink from "./components/instructorComponents/uploudYoutubeVid";
import CoursePage from "./components/CoursePage";
import CoreCirWrapper from "./components/coreCirriculum";
import InstructorDashboard from "./pages/InstructorDashboard";
import ReviewNavigation from "./components/reviewComponents";
import InstructorReviewWrapper from "./components/instructorComponents/instructorReviews";
import InstructorBalanceWrapper from "./components/instructorComponents/instructorBalance";
import InstructorSettingsWrapper from "./components/instructorComponents/instructorSettings";
import InstructorMainDashboard from "./components/instructorComponents/instructorMainDashboard";
import InsertCreditCardInfoWrapper from "./components/insertCreditCardinfo";
import SettingsPageWrapper from "./pages/settingsPage";
import InstructorViewAllTitlesWrapper from "./components/instructorComponents/instructorCourses";
import {
  ChangeBio,
  ChangeEmail,
} from "./components/instructorComponents/instructorChangeSetting";
import RateComponent from "./components/studentRateInstructor";
import ReviewComponent from "./components/studentReviewInstructor";
import LoadSearchedCourses from "./components/loadSearchedCoursesComp";
import CreateExamWrapper from "./components/createExam";
import SolveExamWrapper from "./components/solveExam";
import PreviewCourse from "./components/CheckCourse";

export default function MainApp() {
  const [username, setUsername] = useState("abdelrahman");
  const [userEmail, setUserEmail] = useState("alighieth2709@gmail.com");
  const [userType, setUserType] = useState("instructor");
  const [userPassword, setUserPassword] = useState("aman ya raby aman");
  const [userMongoId, setUserMongoId] = useState("6366d3ddd79a066bc2b74106");
  const [userPhoneNum, setUserPhoneNum] = useState("+20 1211399151");
  const [region, setRegion] = useState("EG");

  const values = {
    username: [username, setUsername],
    userEmail: [userEmail, setUserEmail],
    userType: [userType, setUserType],
    userPassword: [userPassword, setUserPassword],
    userMongoId: [userMongoId, setUserMongoId],
    userPhone: [userPhoneNum, setUserPhoneNum],
    userRegion: [region, setRegion],
  };

  return (
    <AppContext.Provider value={values}>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePageWrapper />} />
          <Route path="/courses" element={<GetCoursesByPrice />} />
          <Route path="/adminCreateAdmin" element={<CreateAdminWrapper />} />
          <Route
            path="/adminCreateInstructor"
            element={<CreateInstructorWrapper />}
          />
          <Route path="/createCourse" element={<WrapperCreateCourses />} />
          <Route
            path="/getAllInstructorCourses"
            element={<GetAllInstructorCoursesWrapper />}
          />
          <Route
            path="/viewallCoursesPrice"
            element={<ViewAllCoursesPriceWrapper />}
          />
          <Route path="/createCorp" element={<CreateCorporateWrapper />} />
          <Route path="/SelectCountry1" element={<SelectCountryWrapper />} />
          <Route path="/viewAllCourses" element={<ViewAllCoursesWrapper />} />
          <Route path="/instViewCourses" element={<InstViewCoursesWrapper />} />
          <Route
            path="/changePassword"
            element={<ChangePasswordPageWrapper />}
          />
          <Route path="/changingPasswordEmail" element={<ChangingPaswword />} />
          <Route path="/submitlink" element={<UploadLink />} />
          <Route path="/coursePage" element={<CoreCirWrapper />} />
          <Route path="/settings" element={<SettingsPageWrapper />} />
          <Route path="/insertCard" element={<InsertCreditCardInfoWrapper />} />
          <Route
            path="/instructorDashBoard"
            element={<InstructorMainDashboard />}
          />
          <Route
            path="/instructorDashBoard/reviews"
            element={<InstructorReviewWrapper />}
          />
          <Route
            path="/instructorDashBoard/balance"
            element={<InstructorBalanceWrapper />}
          />
          <Route
            path="/instructorDashBoard/settings"
            element={<InstructorSettingsWrapper />}
          />
          <Route
            path="/instructorDashBoard/allMyCourses"
            element={<InstructorViewAllTitlesWrapper />}
          />
          <Route
            path="/instructorDashBoard/createCourse"
            element={<WrapperCreateCourses />}
          />
          <Route
            path="/instructorDashBoard/createQuiz"
            element={<CreateExamWrapper />}
          />
          <Route
            path="/instructorDashBoard/editEmail"
            element={<ChangeEmail />}
          />
          <Route path="/instructorDashBoard/editBio" element={<ChangeBio />} />
          <Route path="/studentRateInstructor" element={<RateComponent />} />
          <Route
            path="/studentReviewInstructor"
            element={<ReviewComponent />}
          />
          <Route path="/searchedItems" element={<LoadSearchedCourses />} />
          <Route path="/previewCourse" element={<PreviewCourse />} />
          <Route path="/SolveExam" element={<SolveExamWrapper />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
