const corporateTrainee = require("../models/corporateTrainee");
const course = require("../models/Courses");
const admin = require("../models/Admin");
const Instructor = require("../models/instructor");
const individualTrainee = require("../models/IndividualTrainee");
const IndividualTrainee = require("../models/IndividualTrainee");

//Methods
const createIndividualTrainee = (req, res) => {
  // const username = req.body.username;
  // const password = req.body.password;
  const userData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    age: req.body.age,
    gender: req.body.gender,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    country: req.body.country,
  };
  // if (username == null || password == null) {
  //   return res.status(400).json("Enter a valid data ");
  // } else {
  individualTrainee.create(userData, function (err, small) {
    if (err) {
      res.status(500).send("Database not responding  => " + err);
    } else {
      res.status(200).send("Individual Trainee Created Successfully");
    }
  });
  // }
};

const getUser = async (req, res) => {
  const userId = req.params.userId;
  const userType = req.params.userType;

  let query = { _id: userId };

  if (userType == "instructor") {
    await Instructor.find(query, function (err, data) {
      if (err) {
        res.status(400).send("An erorr has occured");
      } else {
        res.status(200).json(data);
      }
    }).clone();
  } else if (userType == "admin") {
    await admin
      .find(query, function (err, data) {
        if (err) {
          res.status(400).send("An erorr has occured");
        } else {
          res.status(200).json(data);
        }
      })
      .clone();
    // } else if (userType == "corporate") {

    // } else if (userType == "indivisual") {
  }

  // we need to implement new schema
};

const createCourse = async (req, res) => {
  const instructorId = req.body.id;
  const instructor = await Instructor.findOne({ _id: instructorId });
  if (instructor == null) {
    res.status(401).send("Username is not found, or unauthorized");
  } else if (
    req.body.title == null ||
    req.body.subject == null ||
    req.body.instructor == null ||
    req.body.subtitle == null ||
    req.body.price == null ||
    req.body.summary == null ||
    req.body.totalHours == null
  ) {
    res.status(400).send("Required fields were not submitted");
  } else if (req.body.summary.length < 5) {
    res.status(400).send("Summary should be atleast 5 words long");
  } else {
    const courseDetails = {
      title: req.body.title,
      subject: req.body.subject,
      instructor: instructorId,
      totalHours: req.body.totalHours,
      rating: req.body.rating,
      price: req.body.price,
      subtitles: req.body.subtitle,
      exercises: req.body.exercises,
      summary: req.body.summary,
      discount: req.body.discount,
      image: req.body.image,
      video: req.body.video,
      prerequisite: req.body.prerequisite,
      preview: req.body.preview,
      category: req.body.category,
    };
    course.create(courseDetails, (err, small) => {
      if (err) {
        console.log("error with course ", err.message);
      } else {
        res.status(200).send();
      }
    });
  }
};
const coursePrice = async (req, res) => {
  console.log(req.params);
  const c = await course.find({}, { title: 1, price: 1, _id: 0 });
  if (c == null) {
    res.status(404).send("no course found");
  } else {
    res.json(c);
  }
};
const createAdmin = (req, res) => {
  const password = req.body.password;
  const username = req.body.username;
  if (password == null || username == null) {
    return res.status(400).send("Required fields are not submitted");
  }
  const adminData = {
    password: password,
    username: username,
  };
  admin.create(adminData, function (err, small) {
    if (err) {
      res.status(500).send("Database not responding  => " + err.message);
      console.log(err.message);
      return;
    }
    // this means record created
    res.status(200).send("admin " + username + " created Successfully");
  });
};
const search = async (req, res) => {
  let query = {};
  if (req.params.key.valueOf().toLowerCase() == "free") {
    query = {
      price: 0,
    };
  } else {
    query = isNaN(req.params.key)
      ? {
          $or: [
            { title: { $regex: req.params.key } },
            { subject: { $regex: req.params.key } },
            { instructor: { $regex: req.params.key } },
          ],
        }
      : {
          $or: [
            {
              $and: [
                { price: { $gte: parseInt(req.params.key) } },
                { price: { $lte: parseInt(req.params.max) } },
              ],
            },
            { rating: req.params.key },
          ],
        };
  }
  await course
    .find(query, function (err, results) {
      if (err) {
        res.status(500).send("Server not responding " + err.message);
      } else if (results.length == 0) {
        res.status(404).send("no result found");
      } else {
        res.status(200).json(results);
      }
    })
    .clone();
};
const instructorSearch = async (req, res) => {
  let query = {};
  if (req.params.key.valueOf().toLowerCase() == "free") {
    query = {
      $and: [{ instructor: req.params.user }, { price: 0 }],
    };
  } else {
    query = isNaN(req.params.key)
      ? {
          $and: [
            { instructor: req.params.user },
            {
              $or: [
                { title: { $regex: req.params.key } },
                { subject: { $regex: req.params.key } },
              ],
            },
          ],
        }
      : {
          $and: [{ instructor: req.params.user }, { price: req.params.key }],
        };
  }

  await course
    .find(query, (err, data) => {
      if (err) {
        res.status(500).send("Server Error");
      } else if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res.status(404).json("no data found");
      }
    })
    .clone();
};
const createInstructor = async (req, res) => {
  const currentUser = req.body.currentUser;
  const instData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    age: req.body.age,
    gender: req.body.gender,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    country: req.body.country,
    biography: req.body.biography,
    phoneNumber: req.body.phoneNumber,
  };
  if (username == "" || password == "") {
    res.status(400).json("Enter a valid data ");
  } else {
    await admin
      .find({ username: currentUser }, {}, (err, result) => {
        if (err) {
          res.status(500).send(err.message);
        } else if (result == "") {
          res.status(400).send("not an admin");
        } else {
          Instructor.create(instData, (error, small) => {
            if (error) {
              res.status(400).send(error.message);
            } else {
              res.status(200).json(result);
            }
          });
        }
      })
      .clone();
  }
};
const createCorporateTrainee = async (req, res) => {
  const corpData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    age: req.body.age,
    gender: req.body.gender,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    country: req.body.country,
  };
  // if (username == null || password == null) {
  //   res.status(400).json("Enter a valid data ");
  // } else {
  corporateTrainee.create(corpData, (error, small) => {
    if (error) {
      res.status(400).send(error.message);
    } else {
      res.status(200).send("user is created");
    }
  });
  // }
};
const viewCourses = async (req, res) => {
  const a = await course.find({}, { _id: 0 });
  if (a == null) {
    res.status(404).send("no courses available");
  } else {
    res.json(a);
  }
};
const chooseCountry = async (req, res) => {
  const { username, country } = req.body;
  if (username == "" || country == "") {
    res.status(400).send("valid data required");
  } else {
    await user
      .updateOne(
        { username: username },
        { country: country },
        (error, docs) => {
          if (error) {
            res.status(400).send(error);
          } else if (docs == null) {
            Instructor.updateOne(
              { username: username },
              { country: country },
              (err, result) => {
                if (err) {
                  res.status(400).send(err.message);
                } else {
                  res.status(200).json(result);
                }
              }
            );
          } else if (docs) {
            res.status(200).json(docs);
          }
        }
      )
      .clone();
  }
};
const view = async (req, res) => {
  const data = await user
    .find({}, {}, (err, result) => {
      if (result) {
        res.status(200).json(data);
      } else if (err) {
        res.json(err);
      }
    })
    .clone();
};
const instViewCourses = async (req, res) => {
  const instructorCourses = await course.find(
    { instructor: req.params.userId }
    // {
    //   title: 1,
    //   description: 1,
    //   image: 1,
    //   summary: 1,
    //   _id: 1,
    // }
  );
  if (instructorCourses == null) {
    res.status(404).send("no courses available");
  } else {
    res.json(instructorCourses);
  }
};
const filterCourses = async (req, res) => {
  const filterType = req.params.filterType;
  const key = req.params.key;
  if (filterType == null || key == null) {
    res.status(404).send("enter a filter type");
  } else {
    await course
      .find()
      .where(filterType, key)
      .exec((err, result) => {
        if (err) {
          res.status(500).send(err.message);
        } else if (result) {
          res.status(200).json(result);
        }
      });
  }
};
const updateViews = async (req, res) => {
  const id = req.body.id;
  await course
    .updateOne({ _id: id }, { $inc: { views: 1 } }, (err, result) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(200).json(result);
      }
    })
    .clone();
};
const rateInstructor = async (req, res) => {
  const username = req.params.username;
  const rate = req.params.rate;
  let oldrate = 0;
  if (isNaN(rate)) {
    res.status(400).send("invalid rate");
  } else if (rate > 5 || rate < 0) {
    res.status(400).send("invalid rate, the rate must be between 0 and 5");
  } else {
    const x = await Instructor.findOne({ username: username }, { rating: 1 });
    oldrate = x.rating;
    let newRating = rate / 2 + oldrate / 2;
    await Instructor.updateOne(
      { username: username },
      { rating: newRating },
      (err, result) => {
        if (err) {
          res.status(500).send(err.message);
        } else {
          res.status(200).json(result);
        }
      }
    ).clone();
  }
};
const rateCourse = async (req, res) => {
  const courseId = req.body.id;
  const newRate = req.params.newRate;
  let oldRate = 0;
  if (isNaN(newRate)) {
    res.status(400).send("invalid rate");
  } else if (newRate > 5 || newRate < 0) {
    res.status(400).send("invalid rate, the rate must be between 0 and 5");
  } else {
    const x = await course.findOne({ _id: courseId }, { rating: 1 });
    oldRate = x.rating;
    let rate = oldRate / 2 + newRate / 2;
    await course
      .updateOne({ _id: courseId }, { rating: rate }, (err, result) => {
        if (err) {
          res.status(500).send(err.message);
        } else {
          res.status(200).json(result);
        }
      })
      .clone();
  }
};
const viewRatingAndReviews = async (req, res) => {
  const username = req.params.username;
  await Instructor.find(
    { username: username },
    { review: 1, rating: 1 },
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    }
  ).clone();
};
const changePassword = async (req, res) => {
  const id = req.body.id;
  const newPassword = req.body.newPassword;
  const usertype = req.body.usertype;
  if (usertype == "corporate trainee") {
    corporateTrainee.updateOne(
      { _id: id },
      { password: newPassword },
      (err, result) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).send();
        }
      }
    );
  } else if (usertype == "individual trainee") {
    individualTrainee.updateOne(
      { _id: id },
      { password: newPassword },
      (err, result) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).send();
        }
      }
    );
  } else if (usertype == "instructor") {
    Instructor.updateOne(
      { _id: id },
      { password: newPassword },
      (err, result) => {
        if (err) {
          res.status(500).json(err);
          console.log(err);
        } else {
          console.log(result);
          res.status(200).send(result);
        }
      }
    );
  }
};
const editEmail = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const usertype = req.body.usertype;
  if (usertype == "corporate trainee") {
    await corporateTrainee
      .updateOne({ username: username }, { email: email }, (err, result) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).send();
        }
      })
      .clone();
  } else if (usertype == "individual trainee") {
    await individualTrainee
      .updateOne({ username: username }, { email: email }, (err, result) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).send();
        }
      })
      .clone();
  } else if (usertype == "instructor") {
    console.log(req.body);
    await Instructor.updateOne(
      { username: username },
      { email: email },
      (err, result) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).send();
        }
      }
    ).clone();
  }
};
const editBio = async (req, res) => {
  const username = req.body.username;
  const bio = req.body.bio;
  const usertype = req.body.usertype;
  if (usertype == "corporate trainee") {
    await user
      .updateOne({ username: username }, { biography: bio }, (err, result) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).send();
        }
      })
      .clone();
  } else if (usertype == "individual trainee") {
    await individualTrainee
      .updateOne({ username: username }, { biography: bio }, (err, result) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).send();
        }
      })
      .clone();
  } else if (usertype == "instructor") {
    await Instructor.updateOne(
      { username: username },
      { biography: bio },
      (err, result) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).send();
        }
      }
    ).clone();
  }
};
const viewReviewAndRatingForInstructor = async (req, res) => {
  const username = req.params.username;
  await course
    .find(
      { instructor: username },
      { _id: 0, title: 1, rating: 1, review: 1 },
      (err, result) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(result);
        }
      }
    )
    .clone();
};
const uploadPreviewVideoForCourse = async (req, res) => {
  const id = req.body.id;
  const url = req.body.url;
  course.updateOne({ _id: id }, { preview: url }, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).send();
    }
  });
};
const insertVideoLinkToCourse = async (req, res) => {
  const courseId = req.body.courseId;
  const instructorId = req.body.instructorId;
  const link = req.body.link;
  const x = await Instructor.findOne({ _id: instructorId });
  if (instructorId == x._id) {
    await course
      .updateOne(
        { _id: courseId },
        { $addToSet: { video: link } },
        (err, result) => {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(200).json(result);
          }
        }
      )
      .clone();
  } else {
    res.status(404).json("instructor not found");
  }
};
const addCreditCardInfo = async (req, res) => {
  const username = req.body.username;
  const creditCard = {
    holderName: req.body.holderName,
    cardNumber: req.body.cardNumber,
    cvv: req.body.cvv,
    expirationDate: req.body.expirationDate,
  };
  console.log(creditCard);
  await IndividualTrainee.findOneAndUpdate(
    { username: username },
    { $addToSet: { creditCardInfo: creditCard } },
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).send();
      }
    }
  ).clone();
};
//route to inc no of subs'
const noOfSubscribers = async (req, res) => {
  const id = req.body.id;
  await course
    .updateOne({ _id: id }, { $inc: { noOfSubscribers: 1 } }, (err, result) => {
      if (err) {
        res.status(500).send();
      } else {
        res.status(200).send(result);
      }
    })
    .clone();
};
module.exports = {
  getUser,
  search,
  createCorporateTrainee,
  createAdmin,
  coursePrice,
  createCourse,
  instructorSearch,
  viewCourses,
  createInstructor,
  createIndividualTrainee,
  chooseCountry,
  instViewCourses,
  view,
  filterCourses,
  updateViews,
  rateInstructor,
  rateCourse,
  viewRatingAndReviews,
  uploadPreviewVideoForCourse,
  editEmail,
  editBio,
  changePassword,
  viewReviewAndRatingForInstructor,
  insertVideoLinkToCourse,
  addCreditCardInfo,
  noOfSubscribers,
};
